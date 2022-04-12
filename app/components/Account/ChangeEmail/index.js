import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles } from './ChangeEmail.styles';
import { updateEmail } from 'firebase/auth';
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeEmailData";
import Toast from "react-native-toast-message";
import { reAuth } from '../../../utils';


export const ChangeEmail = (props) => {

  const { userInfo, onClose, setReloadUserInfo } = props

  const [showPassword, setShowPassword] = useState(true);
  const [_, setIsLoading] = useState(false)

  const onShowPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formData) => {
      setIsLoading(true)
      try {
        const credentials = reAuth(formData.password)
        if (!credentials) {
          return (
            Toast.show({
              type: "error",
              position: "bottom",
              text1: "Error to change Email",
            })
          )
        }
        await updateEmail(userInfo, formData.email);
        setReloadUserInfo(true)
        setIsLoading(false)
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error to change Email",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder='Change Email'
        containerStyle={styles.input}
        leftIcon={{
          type: 'material-community',
          name: 'at',
          color: '#c2c2c2',
        }}
        defaultValue={userInfo.email || ''}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder='Change Password'
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false : true}
        leftIcon={{
          type: 'material-community',
          name: showPassword ? 'eye-off-outline' : 'eye-outline',
          color: '#c2c2c2',
          onPress: onShowPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title='Change Email'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
};