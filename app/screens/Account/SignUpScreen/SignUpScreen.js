import React, { useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, Image } from 'react-native';
import Toast from 'react-native-easy-toast'
import { SignUpForm } from '../../../components/Account/SignUpForm/SignUpForm';
import { styles } from "./SignUpScreen.style";

export const SignUp = () => {

    const toastRef = useRef()

    return (
        <KeyboardAwareScrollView extraScrollHeight={60} enableOnAndroid={true} >
            <Image
                source={require('../../../images/loginfood.jpg')}
                resizeMode='contain'
                style={styles.logo}
            />
            <View style={styles.viewForm}>
                <SignUpForm toastRef={toastRef} />
            </View>
            <Toast ref={toastRef} position='center' opacity={0.8} />
        </KeyboardAwareScrollView>
    );
}