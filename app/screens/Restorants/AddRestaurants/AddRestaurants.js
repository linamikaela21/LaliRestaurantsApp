import React, { useRef, useState } from 'react';
import Toast from 'react-native-easy-toast'
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'
import { useFormik } from 'formik'
import { ScrollView, View } from 'react-native';
import { Button } from 'react-native-elements'
import { doc, setDoc } from 'firebase/firestore'
import { Loading } from '../../../components/Shared/Loading/Loading'
import { AddRestaurantForm, ImageForm } from '../../../components/Restaurant';
import { initialValues, validationSchema } from './AddRestaurantData'
import { styles } from '../../../components/Restaurant/AddRestaurantForm/AddRestaurantForm.styles';
import { db } from '../../../utils/firebase';

export const AddRestaurants = (props) => {
    const { navigation } = props
    const toastRef = useRef()
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validationOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const newData = formValue
                newData.id = uuid()
                newData.createAt = new Date()
                const myDB = doc(db, 'restaurants', newData.id)
                await setDoc(myDB, newData)
                navigation.goBack()
            } catch (error) {
                console.error(error);
            }
        }
    })

    return (
        <ScrollView>
            <AddRestaurantForm
                formik={formik}
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation} />
            <ImageForm
                formik={formik}
                toastRef={toastRef} />
            <Button
                title='Add Restaurant'
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
                style={styles.btnAddResto}
            />
            <Toast ref={toastRef} position='center' opacity={0.9} />
            <Loading show={isLoading} text='Adding restaurant' />
        </ScrollView>
    )
};
