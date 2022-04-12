import React, { useState } from 'react';
import { Text, ScrollView, Alert } from 'react-native';
import { Avatar, Icon } from 'react-native-elements'
import { map, filter } from "lodash";
import uuid from 'react-native-uuid';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker'
import { styles } from './ImageForm.styles';
import { Loading } from '../../Shared/Loading';

export const ImageForm = (props) => {
    const { formik } = props
    const [isLoading, setIsLoading] = useState(false)

    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        if (!result.cancelled) {
            setIsLoading(true)
            uploadImage(result.uri)
        }
    }

    const uploadImage = async (uri) => {
        const response = await fetch(uri)
        const blob = await response.blob()
        const storage = getStorage();
        const imageRef = ref(storage, `restaurants/${uuid.v4()}`);
        uploadBytes(imageRef, blob)
            .then((snapshot) => {
                updateImageResto(snapshot.metadata.fullPath)
            })
    }

    const updateImageResto = async (imagePath) => {
        const storage = getStorage();
        const imageRef = ref(storage, imagePath);
        const imageURL = await getDownloadURL(imageRef)
        formik.setFieldValue('images', [...formik.values.images, imageURL])
        setIsLoading(false)
    }

    const removeImage = async (img) => {
        Alert.alert('Delete Image',
            'Are you sure do you want to delete this image ?',
            [{ text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete', style: 'cancel',
                onPress: () => {
                    const result = filter(formik.values.images, image => image !== img)
                    formik.setFieldValue('images', result)
                }
            }],
            { cancelable: false })
    }

    return (<>
        <ScrollView style={styles.viewImage}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <Icon
                type='material-community'
                name='camera'
                color='#7a7a7a'
                size={50}
                style={styles.containerIcon}
                onPress={openGallery} />
            {map(formik.values.images, (image) => (
                <Avatar
                    key={image}
                    source={{ uri: image }}
                    onPress={() => removeImage(image)}
                    containerStyle={styles.imageStyle} />
            ))}
        </ScrollView>
        <Text style={styles.error}>{formik.errors.images}</Text>
        <Loading show={isLoading} text='Uploading image' />
    </>
    )
}