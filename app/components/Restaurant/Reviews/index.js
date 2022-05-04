import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { View, } from 'react-native';
import { AirbnbRating, Avatar, ListItem, Text } from 'react-native-elements';
import { db } from '../../../utils';
import { styles } from './Reviews.styles';
import { Loading } from '../../Shared/Loading';
import { map } from 'lodash';

export const Reviews = ({ restoId }) => {

    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        const q = query(
            collection(db, 'reviews'),
            where('idRestaurant', '==', restoId),
            orderBy('createAt', 'desc')
        )
        onSnapshot(q, snap => setReviews(snap.docs))
    }, [reviews]);

    if (!reviews) return <Loading show text='Loading..' />

    return (
        <View style={styles.content}>
            {map(reviews, rev => {
                const review = rev.data()
                const reviewDate = new Date(review.createAt.seconds * 1000).toLocaleDateString()
                return (
                    <ListItem key={review.id} bottomDivider containerStyle={styles.review}>
                        <Avatar source={{ uri: review.avatar }} size={50} rounded />
                        <ListItem.Content>
                            <ListItem.Title containerStyle={styles.title}>{review.title}</ListItem.Title>
                            <View style={styles.subtitle}>
                                <Text containerStyle={styles.comment}>{review.comment}</Text>
                                <View  style={styles.contentRatingDate}>
                                    <AirbnbRating
                                        isDisabled
                                        starContainerStyle={styles.starContainer}
                                        defaultRating={review.ranking}
                                        showRating={false}
                                        size={15} />
                                    <Text style={styles.date}>{reviewDate}</Text>
                                </View>
                            </View>
                        </ListItem.Content>
                    </ListItem>
                )
            })}
        </View>
    )
};