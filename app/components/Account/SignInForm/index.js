import React, { useState } from 'react';
import { useFormik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, Button } from 'react-native-elements';
import { styles } from './SignInForm.styles';
import { initialValues, validationSchema } from './SignInFormData';
import { screen } from '../../../utils';

export const SignInForm = () => {
    const navigation = useNavigation()
    const [showPassword, setShowPassword] = useState(true);
    const onShowHidePassword = () => setShowPassword((prevState) => !prevState);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                const auth = getAuth();
                await signInWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                );
                navigation.navigate(screen.account.tab, { screen: screen.account.account })
            }
            catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "User or Password are incorrect",
                });
            }
        },
    });


    return (
        <View style={styles.formContainer}>
            <Input
                placeholder='E-mail' co
                containerStyle={styles.inputForm}
                leftIcon={{
                    type: 'material-community',
                    name: 'at',
                    iconStyle: styles.iconLeft
                }}
                onChangeText={(text) => formik.setFieldValue("email", text)}
                errorMessage={formik.errors.email}
            />
            <Input
                placeholder='Password'
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showPassword ? false : true}
                leftIcon={{
                    type: 'material-community',
                    name: showPassword ? 'eye-off-outline' : 'eye-outline',
                    iconStyle: styles.iconLeft,
                    onPress: onShowHidePassword
                }}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                errorMessage={formik.errors.password}
            />
            <Button
                title='Sign In'
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
};
