import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { size } from 'lodash';
import React, { useEffect, useState } from 'react';
import { View, } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { db, screen } from '../../../utils';
import { styles } from './ReviewForm.styles';

export const ReviewForm = ({ restoId }) => {
    const navigation = useNavigation()
    const auth = getAuth()

    const [isLogged, setIsLogged] = useState(false);
    const [hasReview, setHasReview] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsLogged(user ? true : false)
        })
    }, []);

    useEffect(() => {
        if (isLogged) {
            const q = query(
                collection(db, 'reviews'),
                where('idRestaurant', '==', restoId),
                where('idUser', '==', auth.currentUser.uid)
            )
            onSnapshot(q, snap => {
                if (size(snap.docs) > 0) setHasReview(true)
            })
        }
    }, [isLogged]);

    const goToLogin = () => navigation.navigate(screen.account.tab, { screen: screen.account.signIn })

    const goToAddReview = () => navigation.navigate(screen.restaurant.addReviewRestaurant, { restoId })

    if (isLogged && hasReview) {
        return (
            <View style={styles.content}><Text style={styles.textSendReview}>You already review this restaurant</Text></View>
        )
    }
    return (
        <View style={styles.content}>
            {
                isLogged ?
                    <Button
                        icon={{ type: 'material-community', name: 'square-edit-outline', color: '#00a680' }}
                        title='Write an opinion'
                        buttonStyle={styles.button}
                        titleStyle={styles.btnText}
                        onPress={goToAddReview}
                    />
                    : <Text style={styles.text} onPress={goToLogin} >Yo white an opinion you need to be logged
                        : <Text style={styles.textClick}>Click here to login</Text>
                    </Text>

            }
        </View>
    )
};