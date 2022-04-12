import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements'
import { db } from '../../../utils/firebase'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { Loading } from '../../../components/Shared/Loading';
import { ListOfRestaurants } from '../../../components/Restaurant';
import { styles } from './RestaurantsScreen.styles';
import { screen } from '../../../utils/screenName';

export const RestaurantsScreen = (props) => {
    const { navigation } = props
    const [user, setUser] = useState(null);
    const [restaurants, setrestaurants] = useState(null)

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        });
    }, [])

    useEffect(() => {
        const q = query(collection(db, 'restaurants'))
        orderBy('createdAt', 'desc')
        onSnapshot(q, (snap) => setrestaurants(snap.docs))
    }, [])

    return (
        <View style={styles.content}>
            {!restaurants ? (<Loading show text='Loading..' />)
                : (<ListOfRestaurants restaurants={restaurants} />)}
            {user && (<Icon
                reverse
                type='material-community'
                name='plus'
                color='#00a680'
                containerStyle={styles.btnContainer}
                onPress={() => navigation.navigate('AddRestaurant')}
            />)}
        </View>
    )
};