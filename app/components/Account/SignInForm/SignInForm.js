import React, { useState } from 'react';
import { styles } from './SignInForm.style';
import { Loading } from '../../Shared/Loading/Loading';
import { validateEmail } from '../../../utils/validations';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { isEmpty, size } from 'lodash'

export const SignInForm = (props) => {
    const { toastRef } = props
    const navigation = useNavigation();

    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState(defaultFormDataValue())

    const onSubmit = (e) => {
        e.preventDefault()
        if (isEmpty(formData.email) || isEmpty(formData.password)) { toastRef.current.show('E-mail and Password is required') }
        else if (!validateEmail(formData.email)) { toastRef.current.show('Please insert a valid Email') }
        else if (size(formData.password) < 6) { toastRef.current.show('Password should be at least 6 characters long') }
        else {
            setLoading(true)
            const auth = getAuth();
            signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            ).then(() => {
                setLoading(true)
                navigation.navigate('account')
            })
                .catch(() => {
                    setLoading(true)
                    toastRef.current.show('This E-mail have already exist. Please try again with other one different')
                })
        }
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder='E-mail' co
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

            <Button
                title='Sign In'
                onPress={(e) => onSubmit(e)}
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
            />

            <Loading show={loading} text='Login...' />
        </View>
    )
};

const defaultFormDataValue = () => {
    return ({ email: '', password: '' })
}