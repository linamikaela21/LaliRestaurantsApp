import React, { useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { getAuth } from "firebase/auth";
import { styles } from "./UserLoggedScreen.style";
import Toast from 'react-native-easy-toast'
import { Loading } from '../../../components/Shared/Loading/Loading';

export const UserLogged = () => {

    const toastRef = useRef()
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');

    const logout = async () => {
        const auth = getAuth();
        await signOut(auth);
    };
    return (
        <View style={styles.viewUserInfo}>
            <Text>Info User</Text>
            <Text>account options</Text>
            <Button
                title='Log Out'
                onPress={() => logout()} buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionText}
            />
            <Toast ref={toastRef} position='center' opacity={0.8} />
            <Loading show={loading} text={loadingText} />
        </View>
    );
}
