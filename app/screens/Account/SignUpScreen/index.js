import React, { useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, Image } from 'react-native';
import Toast from 'react-native-easy-toast'
import { SignUpForm } from '../../../components/Account/SignUpForm';
import { styles } from "./SignUpScreen.styles";
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils/screenName';
import { Text } from 'react-native-elements';

export const SignUpScreen = () => {

    const toastRef = useRef()
    const navigation = useNavigation()

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
            <Text style={styles.textRegister}>
                Have you got an account ? {` `}
                <Text
                    style={styles.btnRegister}
                    onPress={() => navigation.navigate(screen.account.signIn)}>Sign In</Text>
            </Text >
            <Toast ref={toastRef} position='center' opacity={0.8} />
        </KeyboardAwareScrollView>
    );
}