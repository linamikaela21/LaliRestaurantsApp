import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar, Button, Icon, Input } from 'react-native-elements'
import { styles } from './AddRestaurantForm.styles';
import { Camera } from 'expo-camera';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker'
import { updateProfile } from 'firebase/auth';

export const AddRestaurantForm = (props) => {

    const { toastRef, isLoading, navigation } = props

    const [restoName, setRestoName] = useState('')
    const [restoAddress, setRestoAddress] = useState('')
    const [restoDescription, setRestoDescription] = useState('')
    const [imagesSelected, setImagesSelected] = useState([])

    const addResto = () => {
        console.log('Form:', restoName, restoAddress, restoDescription)
    }

    return (
        <ScrollView style={styles.scrollView}>
            <Form
                setRestoName={setRestoName}
                setRestoAddress={setRestoAddress}
                setRestoDescription={setRestoDescription}
            />
            <Button
                title='Add Restaurant'
                onPress={addResto}
                style={styles.btnAddResto}
            />
            <ImagesResto
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected} />
        </ScrollView>
    )
};

const Form = (props) => {
    const { setRestoName, setRestoAddress, setRestoDescription } = props
    return (
        <View style={styles.viewForm}>
            <Input
                placeholder='Restaurant Name'
                containerStyle={styles.input}
                onChange={e => setRestoName(e.nativeEvent.text)}
            />
            <Input
                placeholder='Restaurant Address'
                containerStyle={styles.input}
                onChange={e => setRestoAddress(e.nativeEvent.text)}
            />
            <Input
                placeholder='Restaurant Description'
                multiline={true}
                containerStyle={styles.textarea}
                onChange={e => setRestoDescription(e.nativeEvent.text)}
            />
        </View>
    )
}

const ImagesResto = (props) => {
    const { toastRef, imagesSelected, setImagesSelected } = props

    const selectImages = async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const cameraResults = cameraPermission.status
        if (cameraResults === 'denied') {
            toastRef.current.show('Its necessary accept camera permissions', 3000)
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            })
            console.log(result);
            if (result.cancelled) {
                toastRef.current.show('You closed image selection', 2000)
            } else {
                setImagesSelected([result.uri, ...imagesSelected])
                //setImagesSelected([...imagesSelected], result.uri)
                // uploadImage(result.uri).then(() => alert('Images Update Successfully'))
                //     .catch(() => toastRef.current.show('Error to upload Images'))
            }
        }
    }

    const uploadImage = async (uri) => {
        const response = await fetch(uri)
        const blob = await response.blob()
        const storage = getStorage();
        const imageRef = ref(storage, `avatar/${uid}`);
        uploadBytesResumable(imageRef, blob)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (res) => {
                    const update = {
                        photoURL: res
                    }
                    await updateProfile(props.userInfo, update)
                    setReloadUserInfo(true)
                });
            }).catch(() => {
                console.log('Error to update avatar succesfully')
            }
            )
    }

    return (
        <View style={styles.viewImages}>
            {imagesSelected.length < 4 && (
                <Icon
                    type='material-community'
                    name='camera'
                    color='#7a7a7a'
                    size={50}
                    style={styles.containerIcon}
                    onPress={selectImages} />
            )}
            {imagesSelected.map((image, index) => <Avatar key={index} source={{ uri: image }} style={styles.avatar} />)}
        </View>
    )
}