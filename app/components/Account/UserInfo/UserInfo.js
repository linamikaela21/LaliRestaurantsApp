import React from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { styles } from './UserInfo.style'
import { Camera } from 'expo-camera';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker'
import { updateProfile } from 'firebase/auth';


export const UserInfo = (props) => {
    const { userInfo: { uid, photoURL, displayName, email }, toastRef } = props

    const changeAvatar = async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const cameraResults = cameraPermission.status

        if (cameraResults === 'denied') {
            toastRef.current.show('Its necessary accept camera permissions')
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            })
            if (result.cancelled) {
                toastRef.current.show('You closed image selection')
            } else {
                uploadImage(result.uri).then(() => alert('Image Update Successfully'))
                    .catch(() => toastRef.current.show('Error to update avatar'))
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
                });
            }).catch(() => {
                console.log('Error to update avatar succesfully')
            }
            )
    }


    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size='large'
                showEditButton={true}
                onPress={() => changeAvatar()}
                containerStyle={styles.userInfoAvatar}
                source={photoURL ? { uri: photoURL } : require('../../../images/profileIcon.png')}
            />
            <View>
                <Text style={styles.displayName}>{displayName ? displayName : 'Anonimo'}</Text>
                <Text>{email ? email : 'Social Login'}</Text>
            </View>
        </View>
    );
}