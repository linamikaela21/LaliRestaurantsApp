import React, { useEffect, useState } from 'react';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { View } from 'react-native';
import { db } from '../../utils';
import { map } from "lodash";
import { RestaurantRanking } from '../../components/Restaurants';

export const TopRestaurantsScreen = () => {
    const [restaurants, setRestaurants] = useState(null)

    useEffect(() => {
        const q = query(
            collection(db, "restaurants"),
            orderBy("rankingMedia", "desc"),
            limit(10)
        );

        onSnapshot(q, (snap) => {
            setRestaurants(snap.docs);
        });
    }, []);

    return (
        <View>
            {map(restaurants, (resto, i) => (
                <RestaurantRanking
                    key={i}
                    index={i}
                    restaurant={resto.data()}
                />
            ))}
        </View>
    )
};
