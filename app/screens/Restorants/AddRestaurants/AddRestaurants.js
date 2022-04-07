import React, { useRef, useState } from 'react';
import Toast from 'react-native-easy-toast'
import { View } from 'react-native';
import { Loading } from '../../../components/Shared/Loading/Loading'
import { AddRestaurantForm } from '../../../components/Restaurant/AddRestaurantForm';

export const AddRestaurants = (props) => {
    const { navigation } = props
    const toastRef = useRef()
    const [isLoading, setIsLoading] = useState(false)
    return (
        <View>
            <AddRestaurantForm toastRef={toastRef} setIsLoading={setIsLoading} navigation={navigation} />
            <Toast ref={toastRef} position='center' opacity={0.9} />
            <Loading isVisible={isLoading} text='Adding restaurant' />
        </View>
    )
};
