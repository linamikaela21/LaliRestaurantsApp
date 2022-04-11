import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { db } from '../../../utils/firebase';
import { styles } from './RestaurantScreen.styles'

export const RestaurantScreen = (props) => {
    const { route } = props

    const [resto, setResto] = useState(null)

    useEffect(() => {
        setResto(null)
        onSnapshot(doc(db, 'restaurants', route.params.id), doc => {
            setResto(doc.data())
        })
    }, [route.params.id])

    return (
        <View style={styles.content}>
            <Text>RestaurantScreen</Text>
        </View>
    )
};