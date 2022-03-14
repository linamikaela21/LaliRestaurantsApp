import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Input, Icon, Button } from 'react-native-elements';
import { styles } from './SignUpForm.style';

export const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormDataValue())

    const onSubmit = () => {
        console.log(formData);
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    return (
        <KeyboardAwareScrollView extraScrollHeight={80} enableOnAndroid={true} >
            <Input
                placeholder='E-mail'
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, 'email')}
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
                secureTextEntry={setShowConfirmPassword ? false : true}
                leftIcon={<Icon
                    type='material-community'
                    name={confirmShowPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.iconLeft}
                    onPress={() => setShowConfirmPassword(!confirmShowPassword)}
                />}
            />
            <Button title='Sign Up'
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={onSubmit}
            />
        </KeyboardAwareScrollView>
    )
};

const defaultFormDataValue = () => {
    return ({ email: '', password: '', confirmPassword: '' })
}