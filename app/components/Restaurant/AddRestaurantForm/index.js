import React, { useState } from 'react';
import {  View, } from 'react-native';
import { Input } from 'react-native-elements'
import { styles } from './AddRestaurantForm.styles';
import { MapForm } from '../MapForm';

export const AddRestaurantForm = (props) => {

    const { toastRef, formik, isLoading, navigation, } = props

    const [imagesSelected, setImagesSelected] = useState([])
    const [showMap, setShowMap] = useState(false)

    const openCloseMap = () => setShowMap(!showMap)

    return (<>
        <View style={styles.scrollView}>
            <Input
                placeholder='Restaurant Name'
                onChangeText={text => formik.setFieldValue('name', text)}
                errorMessage={formik.errors.name}
                containerStyle={styles.input}
            />
            <Input
                placeholder='Restaurant Address'
                onChangeText={(text) => formik.setFieldValue('address', text)}
                errorMessage={formik.errors.address}
                containerStyle={styles.input}
                rightIcon={{
                    type: 'material-community',
                    name: 'map-marker-radius',
                    color: getColorIconMap(formik),
                    size: 50,
                    onPress: openCloseMap
                }} />
            <Input
                placeholder='Restaurant Description'
                multiline={true}
                onChangeText={(text) => formik.setFieldValue('description', text)}
                errorMessage={formik.errors.description}
                containerStyle={styles.textarea}
            />
            <Input
                placeholder='Restaurant Phone'
                onChangeText={(text) => formik.setFieldValue('phone', text)}
                errorMessage={formik.errors.phone}
                containerStyle={styles.textarea}
            />
            <Input
                placeholder='Restaurant Email'
                containerStyle={styles.textarea}
                onChangeText={(text) => formik.setFieldValue('email', text)}
                errorMessage={formik.errors.email}
            />
        </View>
        <MapForm show={showMap} close={openCloseMap} formik={formik} />
    </>
    )
};

const getColorIconMap = formik => {
    if (formik.errors.location) return '#ff0000'
    if (formik.errors.location) return '#00a680'
    return '#c2c2c2'
}