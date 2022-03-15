import React, { useRef } from 'react';
import { SignInForm } from '../../../components/Account/SignInForm/SignInForm';
import { Text, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import { styles } from "./SingInScreen.styles";
import Toast from 'react-native-easy-toast'

export const SignIn = () => {

    const toastRef = useRef()

    return (
        <ScrollView>
            <Image
                source={require('../../../images/loginfood.jpg')}
                resizeMode='contain'
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <SignInForm toastRef={toastRef} />
                <CreateAccount />
            </View>
            <Divider style={styles.divider} />
            <Text>Social Login</Text>
            <Toast ref={toastRef} position='center' opacity={0.8} />
        </ScrollView >
    );
}

const CreateAccount = () => {
    const navigation = useNavigation();
    return (
        <Text style={styles.textRegister}>
            Don't have an account ? {` `}
            <Text
                style={styles.btnRegister}
                onPress={() => navigation.navigate('signUp')}>Sign Up</Text>
        </Text >
    )
}