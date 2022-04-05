import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { styles } from './ChangeEmail.styles';
import { updateEmail } from 'firebase/auth';
import { validateEmail } from '../../../utils/validations';
import { reAuth } from '../../../utils/api';

export const ChangeEmail = (props) => {

    const { userInfo, setShowModal, toastRef, setReloadUserInfo } = props

    const [formData, setFormData] = useState(defaultFormDataValue())
    const [showPassword, setShowPassword] = useState(true);
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)


    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const onSubmit = () => {
        setErrors({})
        if (!formData.email || userInfo.email === formData.email) { setErrors({ email: 'Email doesnt change' }) }
        else if (!validateEmail(formData.email)) { setErrors({ email: 'Email incorrect' }) }
        else if (!formData.password) { setErrors({ password: 'Password should no be empty' }) }
        else {
            setIsLoading(true)
            reAuth(formData.password)
                .then(() => {
                    updateEmail(userInfo, formData.email)
                        .then(() => {
                            toastRef.current.show('Email update successfully !')
                            setIsLoading(false)
                            setShowModal(false)
                            setReloadUserInfo(true)
                        })
                        .catch(() => {
                            setIsLoading(false)
                            setErrors({ password: 'Error to update Email' })
                        })
                }).catch(() => {
                    setIsLoading(false)
                    setErrors({ password: 'Password incorrect' })
                })
        }
    }

    return (
        <View>
            <Input
                placeholder='Change Email'
                containerStyle={styles.input}
                leftIcon={<Icon
                    type='material-community'
                    name='at'
                    size={32} color={'#ccc'} />}
                defaultValue={userInfo.email || ''}
                onChange={e => onChange(e, 'email')}
                errorMessage={errors.email}
            />
            <Input
                placeholder='Change Password'
                onChange={e => onChange(e, 'password')}
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                leftIcon={<Icon
                    type='material-community'
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconLeft}
                    onPress={() => setShowPassword(!showPassword)}
                />}
                errorMessage={errors.password}
            />
            <Button
                title='Change Email'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    )
};

const defaultFormDataValue = () => {
    return ({ email: '', password: '' })
}