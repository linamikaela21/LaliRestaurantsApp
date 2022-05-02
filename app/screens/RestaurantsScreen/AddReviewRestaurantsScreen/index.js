import { useNavigation } from '@react-navigation/native';
import { styles } from './AddReviewRestaurantsScreen.styles';
import React from 'react';
import { View } from 'react-native';
import { AirbnbRating, Button, Input, Text } from 'react-native-elements';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from '../AddRestaurantsScreen/AddRestaurantsScreenData';

export const AddReviewRestaurantsScreen = (props) => {
    const { route } = props;
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validationOnChange: false,
        onSubmit: async (formValue) => {
            try {
                setIsLoading(true)
                const newData = formValue
                console.log(newData);
                // newData.id = uuid.v4()
                // newData.createAt = new Date()
                // const myDB = doc(db, 'restaurants', newData.id)
                // await setDoc(myDB, newData)
                // setIsLoading(false)
                // navigation.goBack()
            } catch (error) {
                console.error(error);
            }
        }
    })

    return (
        <View style={styles.content}>
            <View style={styles.ratingContent}>
                <AirbnbRating
                    count={5}
                    defaultRating={formik.values.ranking}
                    size={35}
                    onFinishRating={(ranking) => formik.setFieldValue('ranking', ranking)}
                    reviews={['Terrible', 'Bad', 'Regular', 'VeryGood', 'Excelent']} />
            </View>
            <View style={styles.content}>
                <Input
                    placeholder='Title'
                    onChange={(text) => formik.setFieldValue('title', text)}
                    errorMessage={formik.errors.title}
                />
                <Input
                    placeholder='Comment'
                    multiline
                    inputContainerStyle={styles.comment}
                    onChange={(text) => formik.setFieldValue('comment', text)}
                    errorMessage={formik.errors.comment}
                />
            </View>
            <Button title='Send Review'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
};
