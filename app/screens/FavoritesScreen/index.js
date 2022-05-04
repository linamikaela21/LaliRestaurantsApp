import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { UserNotLogged } from '../../components/Favorites/UserNotLogged';

export const FavoritesScreen = () => {
    const auth = getAuth()
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsLogged(user ? true : false)
        })
    }, []);

    if (!isLogged) return <UserNotLogged />

    return (
        <View>
            <Text>Favorites</Text>
        </View>
    )
};
