import React, { useRef } from 'react';
import { Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import { styles } from "./SingInScreen.styles";
import Toast from 'react-native-easy-toast'
import { SignInForm } from '../../../components/Account/SignInForm';
import { screen } from '../../../utils/screenName';

export const SingInScreen = () => {

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
                onPress={() => navigation.navigate(screen.account.signUp)}>Sign Up</Text>
        </Text >
    )
}