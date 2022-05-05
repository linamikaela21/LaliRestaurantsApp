import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { ScrollView } from 'react-native';
import { FavoriteResto, UserNotLogged } from '../../components/Favorites';
import { db } from '../../utils';
import { Loading } from '../../components/Shared/Loading';
import { map, size } from 'lodash';
import { NotFoundResto } from '../../components/Favorites';

export const FavoritesScreen = () => {
    const auth = getAuth()
    const [isLogged, setIsLogged] = useState(null);
    const [restaurants, setRestaurants] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsLogged(user ? true : false)
        })
    }, [isLogged]);

    useEffect(() => {
        const q = query(
            collection(db, 'favorites'),
            where('idUser', '==', auth.currentUser.uid)
        )
        onSnapshot(q, async snap => {
            let restoArray = []
            for await (const item of snap.docs) {
                const data = item.data()
                const docRef = doc(db, "restaurants", data.idRestaurant)
                const docSnap = await getDoc(docRef)
                const newData = docSnap.data()
                newData.idFavorite = data.id
                restoArray.push(newData)
            }
            setRestaurants(restoArray)
        })
    }, []);

    if (!isLogged) return <UserNotLogged />

    if (!restaurants) return <Loading show text='Loading..' />

    if (size(restaurants) === 0) return <NotFoundResto />

    return (
        <ScrollView>
            {map(restaurants, resto => (
                <FavoriteResto key={resto.id} restaurant={resto} />
            ))}
        </ScrollView>
    )
};
