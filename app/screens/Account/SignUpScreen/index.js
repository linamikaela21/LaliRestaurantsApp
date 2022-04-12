import React, { useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, Image, Text } from 'react-native';
import Toast from 'react-native-easy-toast'
import { useNavigation } from '@react-navigation/native';
import { styles } from "./SignUpScreen.styles";
import { SignUpForm } from '../../../components/Account/SignUpForm';
import { screen } from '../../../utils/screenName';

export const SignUpScreen = () => {

    const toastRef = useRef()
    const navigation = useNavigation()
    const goToSignIn = () => navigation.navigate({ route: { name: screen.account.signIn } })

    return (
        <KeyboardAwareScrollView extraScrollHeight={60} enableOnAndroid={true} >
            <Image
                source={require('../../../images/loginfood.jpg')}
                resizeMode='contain'
                style={styles.logo}
            />
            <View style={styles.viewForm}>
                <SignUpForm toastRef={toastRef} navigation={navigation} />
            </View>
            <Text style={styles.textRegister}>
                Have you got an account ? {` `}
                <Text
                    style={styles.btnRegister}
                    onPress={() =>navigation.navigate({ name: screen.account.signIn })}
                > Sign In
                </Text>
            </Text >
            <Toast ref={toastRef} position='center' opacity={0.8} />
        </KeyboardAwareScrollView>
    );
}