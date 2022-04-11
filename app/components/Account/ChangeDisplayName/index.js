import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles } from './ChangeDisplayName.styles';
import { useFormik } from "formik";
import { updateProfile } from "firebase/auth";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from './ChangeDisplayNameData'


export const ChangeDisplayName = (props) => {

  const { userInfo, onClose, setReloadUserInfo } = props

  const [_, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formData) => {
      setIsLoading(true)
      try {
        const { displayName } = formData;
        await updateProfile(userInfo, { displayName });
        setReloadUserInfo(true)
        setIsLoading(false)
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar el nombre y apellidos",
        });
      }
    },
  });
  // const onSubmit = () => {
  //     setError(null)
  //     if (!newDisplayName) { setError('Name should not be empty') }
  //     else if (userInfo.displayName === newDisplayName) { setError('New name should be different to the actual') }
  //     else {
  //         setIsLoading(true)
  //         const update = {
  //             displayName: newDisplayName
  //         }
  //         updateProfile(userInfo, update)
  //             .then(() => {
  //                 toastRef.current.show('DisplayName update successfully !')
  //                 setIsLoading(false)
  //                 setShowModal(false)
  //                 setReloadUserInfo(true)
  //             }
  //             )
  //             .catch(() => {
  //                 setIsLoading(true)
  //                 setError('Error to update DisplayName')
  //             })
  //     }
  // }

  return (
    <View style={styles.content}>
      <Input
        placeholder='Change Name and Lastname'
        containerStyle={styles.input}
        leftIcon={{
          type: 'material-community',
          name: 'account-circle-outline',
          size: 32,
          color: '#c2c2c2',
        }}
        defaultValue={userInfo.displayName || ''}
        onChangeText={(text) => formik.setFieldValue("displayName", text)}
        errorMessage={formik.errors.displayName}
      />

      <Button
        title='Change Name and Lastname'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
};