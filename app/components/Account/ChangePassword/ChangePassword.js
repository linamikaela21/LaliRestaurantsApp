import React, { useState } from 'react'
import { View } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { getAuth, updatePassword } from 'firebase/auth';
import { size } from 'lodash'
import { reAuth } from '../../../utils/api';
import { styles } from './ChangePassword.styles';

export const ChangePassword = (props) => {

    const { userInfo, setShowModal, toastRef, setReloadUserInfo } = props

    const [formData, setFormData] = useState(defaultFormDataValue())
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setNewShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)


    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const onSubmit = async () => {
        let errorsTemp = {}
        setErrors({})
        if (!formData.password ||
            !formData.newPassword ||
            !formData.confirmPassword) {
            errorsTemp = {
                password: !formData.password ? 'Password should no be empty' : '',
                newPassword: !formData.newPassword ? 'Password should no be empty' : '',
                confirmPassword: !formData.confirmPassword ? 'Password should no be empty' : '',
            }
        } else if (formData.newPassword !== formData.confirmPassword) {
            errorsTemp = { email: 'Email incorrect' }
        } else if (!formData.password) {
            errorsTemp = {
                newPassword: 'Passwords are differents',
                confirmPassword: 'Passwords are differents',
            }
        }
        else if (size(formData.newPassword) < 6) {
            errorsTemp = {
                newPassword: 'Password should be at least 6 characters long',
                confirmPassword: 'Password should be at least 6 characters long'
            }
        } else {
            setIsLoading(true)
            await reAuth(formData.password)
                .then(() => {
                    updatePassword(userInfo, formData.newPassword)
                        .then(async () => {
                            toastRef.current.show('Password update successfully !')
                            setIsLoading(false)
                            setShowModal(false)
                            setReloadUserInfo(true)
                            const auth = getAuth();
                            await auth.signOut();
                        })
                        .catch((error) => {
                            setIsLoading(false)
                            setErrors({ password: 'Error to update Password', error })
                        })
                }).catch((error) => {
                    setIsLoading(false)
                    errorsTemp = { password: 'Password incorrect', error }
                })
        }
        setErrors(errorsTemp)
    }

    return (
        <View>
            <Input
                placeholder='Actual Password'
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
            <Input
                placeholder='New Password'
                onChange={e => onChange(e, 'newPassword')}
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showNewPassword ? false : true}
                leftIcon={<Icon
                    type='material-community'
                    name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconLeft}
                    onPress={() => setNewShowPassword(!showNewPassword)}
                />}
                errorMessage={errors.newPassword}
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
                errorMessage={errors.confirmPassword}

            />
            <Button
                title='Change Password'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    )
};

const defaultFormDataValue = () => {
    return ({ password: '', newPassword: '', confirmPassword: '' })
}