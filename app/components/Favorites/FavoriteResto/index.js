import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { Image, Icon } from 'react-native-elements';
import { styles } from './FavoriteResto.styles'
import { db, screen } from '../../../utils';
import { deleteDoc, doc } from 'firebase/firestore';

export const FavoriteResto = ({ restaurant }) => {
    const navigation = useNavigation()

    const goToResto = () => navigation.navigate(screen.restaurant.tab,
        {
            screen: screen.restaurant.restaurant,
            params: { id: restaurant.id }
        })

    const removeFromFavorites = async () => {
        try {
            await deleteDoc(doc(db, "favorites", restaurant.idFavorite));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TouchableOpacity onPress={goToResto}>
            <View style={styles.content}>
                <Image style={styles.img} source={{ uri: restaurant.images[0] }} />
            </View>
            <View style={styles.infoContent}>
                <Text style={styles.name}>{restaurant.name}</Text>
                <Icon
                    type='material-community'
                    name='heart'
                    size={35}
                    color='#f00'
                    containerStyle={styles.iconContainer}
                    onPress={removeFromFavorites}
                />
            </View>
        </TouchableOpacity>
    )
};