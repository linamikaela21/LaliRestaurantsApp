import React, { useRef } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import Toast from 'react-native-easy-toast'
import { useNavigation } from '@react-navigation/native';
import { styles } from "./SignUpScreen.styles";
import { SignUpForm } from '../../../components/Account/SignUpForm';
import { screen } from '../../../utils'

export const SignUpScreen = () => {

    const toastRef = useRef()
    const navigation = useNavigation()
    const goToSignIn = () => navigation.navigate(screen.account.tab, { screen: screen.account.signIn } )

    return (
        <ScrollView>
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
                    onPress={goToSignIn}
                > Sign In
                </Text>
            </Text >
            <Toast ref={toastRef} position='center' opacity={0.8} />
        </ScrollView>
    );
}