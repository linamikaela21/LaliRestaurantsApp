import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { getAuth } from "firebase/auth";

export const UserLogged = () => {
    const auth = getAuth()

    return (
        <View>
            <Button title='Log Out' onPress={() => auth.signOut()} />
        </View>
    );
}
