import React, { useEffect, useRef, useState } from 'react';
import { Loading } from '../../../components/Shared/Loading/Loading';
import { UserInfo } from '../../../components/Account/UserInfo/UserInfo';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { getAuth } from "firebase/auth";
import { styles } from "./UserLoggedScreen.style";
import Toast from 'react-native-easy-toast'
import { AccountOptions } from '../../../components/Account/AccountOptions/AccountOptions';

export const UserLogged = () => {

    const toastRef = useRef()
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const [reloadUserInfo, setReloadUserInfo] = useState(false)

    useEffect(() => {
        (async () => {
            const auth = getAuth();
            const user = auth.currentUser
            setUserInfo(user)
        })()
        setReloadUserInfo(false)
    }, [reloadUserInfo]);

    const logout = async () => {
        const auth = getAuth();
        await auth.signOut();
    };

    return (
        <View style={styles.viewUserInfo}>
            {userInfo &&
                < UserInfo
                    userInfo={userInfo}
                    toastRef={toastRef}
                    setReloadUserInfo={setReloadUserInfo}
                />}
            <AccountOptions
                userInfo={userInfo}
                toastRef={toastRef}
                setReloadUserInfo={setReloadUserInfo}
            />
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
