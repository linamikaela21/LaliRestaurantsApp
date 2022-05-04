import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { View, } from 'react-native';
import { Icon } from 'react-native-elements';
import { db } from '../../../utils';
import { styles } from './BtnFavorites.styles';
import uuid from 'react-native-uuid';
import { size, forEach } from "lodash";

export const BtnFavorites = ({ restoId }) => {
    const auth = getAuth()
    const [isFavorite, setIsFavorite] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)

    const reload = () => setIsLoading(prev => !prev)

    useEffect(() => {
        (async () => {
            const response = await getFavorites()
            if (size(response) > 0) setIsFavorite(true)
            else setIsFavorite(false)
        })()
    }, [restoId, isLoading]);

    const getFavorites = async () => {
        const q = query(
            collection(db, 'favorites'),
            where('idRestaurant', '==', restoId),
            where('idUser', '==', auth.currentUser.uid)
        )
        const results = await getDocs(q)
        return results.docs
    }

    const addToFavorites = async () => {
        try {
            const idFav = uuid.v4()
            const data = {
                id: idFav,
                idRestaurant: restoId,
                idUser: auth.currentUser.uid
            }
            await setDoc(doc(db, 'favorites', idFav), data)
            reload()
        } catch (error) {
            console.log(error);
        }
    }

    const removeToFavorites = async () => {
        try {
            const response = await getFavorites()
            forEach(response, async (item) => {
                await deleteDoc(doc(db, "favorites", item.id));
            });
            reload()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.content}>
            {isFavorite !== undefined && (
                <Icon
                    type='material-community'
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    color={isFavorite ? '#f00' : '#000'}
                    size={35}
                    onPress={isFavorite ? removeToFavorites : addToFavorites}
                />
            )}
        </View>
    )
};