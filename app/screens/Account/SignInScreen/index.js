import React, { useRef } from 'react';
import { Text, Image } from 'react-native';
import { Divider, View } from 'react-native-elements';
import Toast from 'react-native-easy-toast'
import { styles } from "./SignInScreen.styles";
import { SignInForm } from '../../../components/Account';
import { screen } from '../../../utils/screenName';

export const SignInScreen = ({navigation}) => {

    const toastRef = useRef()

    return (
        <View extraScrollHeight={60} enableOnAndroid={true} >
            <Image
                source={require('../../../images/loginfood.jpg')}
                resizeMode='contain'
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <SignInForm toastRef={toastRef} navigation={navigation} />
            </View>
            <Text style={styles.textRegister}>
                Dont you got an account ? {` `}
                <Text style={styles.btnRegister}
                    onPress={() => navigation.navigate({ name: screen.account.signUp })}
                > Sign Up
                </Text>
            </Text >
            <Divider />
            <Text>Social Login</Text>
            <Toast ref={toastRef} position='center' opacity={0.8} />
        </View>
    );
}