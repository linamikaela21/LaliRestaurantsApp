import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { styles } from './ChangeDisplayName.styles';
import { updateProfile } from 'firebase/auth';


export const ChangeDisplayName = (props) => {

    const { userInfo, setShowModal, toastRef, setReloadUserInfo } = props

    const [newDisplayName, setNewDisplayName] = useState(null);
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = () => {
        setError(null)
        if (!newDisplayName) { setError('Name should not be empty') }
        else if (userInfo.displayName === newDisplayName) { setError('New name should be different to the actual') }
        else {
            setIsLoading(true)
            const update = {
                displayName: newDisplayName
            }
            updateProfile(userInfo, update)
                .then(() => {
                    toastRef.current.show('DisplayName update successfully !')
                    setIsLoading(false)
                    setShowModal(false)
                    setReloadUserInfo(true)
                }
                )
                .catch(() => {
                    setIsLoading(true)
                    setError('Error to update DisplayName')
                })
        }
    }

    return (
        <View>
            <Input
                placeholder='Change Name and Lastname'
                containerStyle={styles.input}
                leftIcon={<Icon
                    type='material-community'
                    name='account-circle-outline'
                    size={32} color={'#ccc'} />}
                defaultValue={userInfo.displayName || ''}
                onChange={e => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
            />

            <Button
                title='Change Name and Lastname'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    )
};