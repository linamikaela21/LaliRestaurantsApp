import React, { useState } from 'react'
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useFormik } from "formik";
import {
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";
import Toast from "react-native-toast-message";
import { styles } from './ChangePassword.styles';
import { initialValues, validationSchema } from './ChangePasswordData';

export const ChangePassword = (props) => {

    const { userInfo, onClose, setReloadUserInfo } = props

    const [showPassword, setShowPassword] = useState(false);
    const onShowPassword = () => setShowPassword((prevState) => !prevState);

    const [_, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formData) => {
            setIsLoading(true)

            try {
                const credentials = EmailAuthProvider.credential(
                    userInfo.email,
                    formData.password
                );
                reauthenticateWithCredential(userInfo, credentials);

                await updatePassword(userInfo, formData.newPassword);
                setReloadUserInfo(true)
                setIsLoading(false)
                onClose();
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: 'Error to update Password',
                });
            }
        },
    });

    return (
        <View style={styles.content}>
            <Input
                placeholder='Actual Password'
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                leftIcon={{
                    type: 'material-community',
                    name: showPassword ? 'eye-off-outline' : 'eye-outline',
                    color: '#c2c2c2',
                    onPress: showPassword,
                }}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                errorMessage={formik.errors.password} />
            <Input
                placeholder='New Password'
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                leftIcon={{
                    type: 'material-community',
                    name: showPassword ? 'eye-off-outline' : 'eye-outline',
                    color: '#c2c2c2',
                    onPress: onShowPassword,
                }}
                onChangeText={(text) => formik.setFieldValue("newPassword", text)}
                errorMessage={formik.errors.newPassword}
            />
            <Input
                placeholder='Confirm Password'
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showPassword ? false : true}
                leftIcon={{
                    type: 'material-community',
                    name: showPassword ? 'eye-off-outline' : 'eye-outline',
                    color: '#c2c2c2',
                    onPress: onShowPassword,
                }}
                errorMessage={formik.errors.confirmNewPassword}
                onChangeText={(text) => formik.setFieldValue("confirmNewPassword", text)}
            />
            <Button
                title='Change Password'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
};