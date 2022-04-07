import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import { styles } from './Restaurants.styles';

export const Restaurants = (props) => {
    const { navigation } = props
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        });
    }, [])

    return (
        <View style={styles.view}>
            <Text>Soy un restaurant</Text>
            {user && (<Icon
                reverse
                type='material-community'
                name='plus'
                color='#00a680'
                containerStyle={styles.btnContainer}
                onPress={() => navigation.navigate('add-restaurants')}
            />)}
        </View>
    )
};