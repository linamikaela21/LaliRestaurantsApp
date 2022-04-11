import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as Location from 'expo-location'
import MapView from 'react-native-maps'
import { Modal } from '../../Shared/Modal/Modal';
import { styles } from './MapForm.styles';
import Toast from 'react-native-toast-message';
import { Button } from 'react-native-elements';

export const MapForm = (props) => {
    const { show, close, formik } = props
    const [location, setLocation] = useState({
        latitude: 0.001,
        longitude: 0.001,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    })

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                Toast.show({
                    type: 'info', position: 'bottom',
                    text1: 'You shold active location manually'
                })
                return
            }
            const locationTemp = await Location.getCurrentPositionAsync()

            setLocation({
                latitude: locationTemp.coords.latitude,
                longitude: locationTemp.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            });

        })()
    }, [])

    const saveLocation = () => {
        formik.setFieldValue('location', location)
        close()
    }
    return (
        <Modal show={show} close={close} >
            <MapView
                initialRegion={location}
                showsUserLocation={true}
                style={styles.mapStyle}
                onRegionChange={locationTemp => setLocation(locationTemp)}
            >
                <MapView.Marker draggable coordinate={location} />

            </MapView>
            <View style={styles.mapActions}>
                <Button title='Save'
                    onPress={saveLocation}
                    containerStyle={styles.btnMapContainerSave} />
                <Button title='Close'
                    onPress={close}
                    containerStyle={styles.btnMapContainerCancel} />
            </View>
        </Modal>
    )
};