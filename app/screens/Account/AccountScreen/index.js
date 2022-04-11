import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from '../../../utils/firebase';
import {  UserLoggedScreen } from '../UserLoggedScreen';
import { UserGuestScreen } from '../UserGuestScreen';
import { Loading } from '../../../components/Shared/Loading/Loading';

export const AccountScreen = () => {

    const [login, setLogin] = useState(null);

    useEffect(() => {
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, user => {
            setLogin(user ? true : false)
        });
    }, []);

    if (login === null) return (<Loading show text='Loading...' />)

    return login ? (<UserLoggedScreen />) : (<UserGuestScreen />)
} 
