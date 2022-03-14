import React from 'react';
import { Text, View, Image } from 'react-native';
import { SignUpForm } from '../../../components/Account/SignUpForm/SignUpForm';
import { styles } from "./SignUpScreen.style";

export const SignUp = () => {
    return (
        <View>
            <Image
                source={require('../../../images/loginfood.jpg')}
                resizeMode='contain'
                style={styles.logo}
            />
            <View style={styles.viewForm}>
                <SignUpForm />
            </View>
        </View>
    );
}