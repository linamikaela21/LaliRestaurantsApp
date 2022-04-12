import React, { useRef } from 'react';
import { Text, Image, View, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import Toast from 'react-native-easy-toast'
import { styles } from "./SignInScreen.styles";
import { SignInForm } from '../../../components/Account';
import { screen } from '../../../utils';

export const SignInScreen = ({ navigation }) => {

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
            </View>
            <View>
                <Text style={styles.textRegister}>
                    Dont you got an account ? {` `}
                    <Text style={styles.btnRegister}
                        onPress={() => navigation.navigate(screen.account.tab, { screen: screen.account.signUp })}
                    > Sign Up
                    </Text>
                </Text >
            </View>
            <Divider />
            <View>
                <Text>Social Login</Text>
            </View>
            <Toast ref={toastRef} position='center' opacity={0.8} />
        </ScrollView>
    );
}