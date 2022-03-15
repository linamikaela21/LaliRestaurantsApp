import React, { useState } from 'react';
import { Input, Icon, Button } from 'react-native-elements';
import { validateEmail } from '../../../utils/validations';
import { Loading } from '../../Shared/Loading/Loading'
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { isEmpty, size } from 'lodash'
import { styles } from './SignUpForm.style';

export const SignUpForm = (props) => {
    const { toastRef } = props
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormDataValue())
    const [loading, setLoading] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if (isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.confirmPassword)) { toastRef.current.show('All fields are required') }
        else if (!validateEmail(formData.email)) { toastRef.current.show('Please insert a valid Email') }
        else if (size(formData.password) < 6) { toastRef.current.show('Password should be at least 6 characters long') }
        else if (formData.password !== formData.confirmPassword) { toastRef.current.show('Passwords should be equals') }
        else {
            setLoading(true)
            const auth = getAuth();
            createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            ).then(() => {
                setLoading(true)
                navigation.navigate('account')
            })
                .catch(() => {
                    setLoading(true)
                    toastRef.current.show('This E-mail does not exist. Please try again with other one different')
                })
        }
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    return (
        <View >
            <Input
                placeholder='E-mail'
                onChange={e => onChange(e, 'email')}
                containerStyle={styles.inputForm}
                leftIcon={<Icon
                    type='material-community'
                    name='at'
                    iconStyle={styles.iconLeft}
                />}
            />
            <Input
                placeholder='Password'
                onChange={e => onChange(e, 'password')}
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showPassword ? false : true}
                leftIcon={<Icon
                    type='material-community'
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconLeft}
                    onPress={() => setShowPassword(!showPassword)}
                />}
            />
            <Input
                placeholder='Confirm Password'
                onChange={e => onChange(e, 'confirmPassword')}
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showConfirmPassword ? false : true}
                leftIcon={<Icon
                    type='material-community'
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconLeft}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />}
            />
            <Button
                title='Sign Up'
                onPress={(e) => onSubmit(e)}
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
            />
            <Loading show={loading} text='Creating account...' />
        </View>
    )
};

const defaultFormDataValue = () => {
    return ({ email: '', password: '', confirmPassword: '' })
}