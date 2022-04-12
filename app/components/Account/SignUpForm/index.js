import React, { useState } from 'react';
import { Input, Icon, Button } from 'react-native-elements';
import { View } from 'react-native';
import { useFormik } from "formik";
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { Loading } from '../../Shared/Loading'
import { styles } from './SignUpForm.styles';
import { initialValues, validationSchema } from './SignUpFormData';
import { screen } from '../../../utils';

export const SignUpForm = () => {
    const navigation = useNavigation()

    const [showPassword, setShowPassword] = useState(true);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                const auth = getAuth();
                await createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                );
                navigation.navigate(screen.account.tab, { screen: screen.account.account })
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: 'Error to Sign Up. Please try again later',
                });
            }
        },
    });

    const showHidenPassword = () => setShowPassword((prevState) => !prevState);

    return (
        <View >
            <Input
                placeholder='E-mail'
                containerStyle={styles.inputForm}
                leftIcon={<Icon
                    type='material-community'
                    name='at'
                    iconStyle={styles.iconLeft}
                />}
                onChangeText={(text) => formik.setFieldValue("email", text)}
                errorMessage={formik.errors.email}
            />
            <Input
                placeholder='Password'
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showPassword ? false : true}
                leftIcon={<Icon
                    type='material-community'
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconLeft}
                    onPress={showHidenPassword}
                />}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                errorMessage={formik.errors.password}
            />
            <Input
                placeholder='Confirm Password'
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showPassword ? false : true}
                leftIcon={<Icon
                    type='material-community'
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconLeft}
                    onPress={showHidenPassword}
                />}
                onChangeText={(text) => formik.setFieldValue("confirmPassword", text)}
                errorMessage={formik.errors.confirmPassword}
            />
            <Button
                title='Sign Up'
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
            <Loading text='Creating account...' />
        </View>
    )
};