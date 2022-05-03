import { useNavigation } from '@react-navigation/native';
import { styles } from './AddReviewRestaurantsScreen.styles';
import React from 'react';
import { View } from 'react-native';
import { AirbnbRating, Button, Input } from 'react-native-elements';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './AddReviewRestaurantsScreenData';
import { Toast } from 'react-native-toast-message'
import { getAuth } from 'firebase/auth';
import { collection, doc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../utils';
import uuid from 'react-native-uuid';
import { map, mean } from 'lodash';

export const AddReviewRestaurantsScreen = (props) => {
    const { route } = props;
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validationOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const auth = getAuth()
                const newData = formValue
                newData.id = uuid.v4()
                newData.createAt = new Date()
                newData.idRestaurant = route.params.restoId
                newData.idUser = auth.currentUser.uid
                newData.avatar = auth.currentUser.photoURL
                const myDB = doc(db, 'reviews', newData.id)
                await setDoc(myDB, newData)
                await updateRestaurant();      
            } catch (error) {
                console.log(error);
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Error to send review'
                })
            }
        }
    })

    const updateRestaurant = async () => {
        const q = query(
          collection(db, "reviews"),
          where("idRestaurant", "==", route.params.restoId)
        );
    
        onSnapshot(q, async (snap) => {
          const reviews = snap.docs;
          const arrayStars = map(reviews, (review) => review.data().ranking);
          const avarage = mean(arrayStars);
          const restoRef = doc(db, "restaurants", route.params.restoId);
          await updateDoc(restoRef, {
            rankingMedia: avarage,
          });
          navigation.goBack();
        });
      };

    return (
        <View style={styles.content}>
            <View style={styles.rankingContent}>
                <AirbnbRating
                    count={5}
                    defaultRating={formik.values.ranking}
                    size={35}
                    onFinishRating={(ranking) => formik.setFieldValue("ranking", ranking)}
                    reviews={['Terrible', 'Bad', 'Regular', 'VeryGood', 'Excelent']} />
            </View>
            <View style={styles.content}>
                <Input
                    placeholder='Title'
                    onChangeText={(text) => formik.setFieldValue("title", text)}
                    errorMessage={formik.errors.title}
                />
                <Input
                    placeholder='Comment'
                    multiline
                    inputContainerStyle={styles.comment}
                    onChangeText={(text) => formik.setFieldValue("comment", text)}
                    errorMessage={formik.errors.comment}
                />
            </View>
            <Button
                title='Send Review'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
};
