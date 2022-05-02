import React, { useRef, useState } from 'react';
import Toast from 'react-native-easy-toast'
import uuid from 'react-native-uuid';
import { useFormik } from 'formik'
import { ScrollView} from 'react-native';
import { Button } from 'react-native-elements'
import { doc, setDoc } from 'firebase/firestore'
import { Loading } from '../../../components/Shared/Loading'
import { initialValues, validationSchema } from './AddRestaurantsScreenData';
import { AddRestaurantForm, ImageForm } from '../../../components/Restaurants';
import { styles } from '../../../components/Restaurants/AddRestaurantForm/AddRestaurantForm.styles';
import { db } from '../../../utils';

export const AddRestaurantScreen = (props) => {
    const { navigation } = props
    const toastRef = useRef()
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validationOnChange: false,
        onSubmit: async (formValue) => {
            try {
                setIsLoading(true)
                const newData = formValue
                newData.id = uuid.v4()
                newData.createAt = new Date()
                const myDB = doc(db, 'restaurants', newData.id)
                await setDoc(myDB, newData)
                setIsLoading(false)
                navigation.goBack()
            } catch (error) {
                console.error(error);
            }
        }
    })

    return (
        <ScrollView>
            <AddRestaurantForm
                formik={formik}/>
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
