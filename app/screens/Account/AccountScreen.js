import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from '../../utils/firebase';
import { UserLogged } from './UserLoggedScreen/UserLogged';
import { UserGuest } from './UserGuestScreen/UserGuest';
import { Loading } from '../../components/Shared/Loading/Loading';

export const Account = () => {

    const [login, setLogin] = useState(null);
    
    useEffect(() => {
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, user => {
            setLogin(user ? true : false) 
        });
    }, []);

    if (login === null) return <Loading show={true} text='Loading...'/>

    return login ? <UserLogged /> : <UserGuest />
} 
