import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import { styles } from "./SingInScreen.styles";

export const SignIn = () => {
    return (
        <ScrollView>
            <Image
                source={require('../../../images/loginfood.jpg')}
                resizeMode='contain'
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <Text>Sign In</Text>
                <CreateAccount />
            </View>
            <Divider style={styles.divider} />
            <Text>Social Login</Text>
        </ScrollView >
    );
}

const CreateAccount = () => {
    const navigation = useNavigation();
    return (
        <Text style={styles.textRegister}>
            Don't have an account ?
            <Text
                style={styles.btnRegister}
                onPress={() => navigation.navigate('signUp')}>Sign Up</Text>
        </Text >
    )
}