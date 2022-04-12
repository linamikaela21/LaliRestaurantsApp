import React, { useState } from 'react';
import { map } from "lodash";
import { View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { Modal } from '../../Shared/Modal';
import { ChangeDisplayName } from '../ChangeDisplayName';
import { ChangeEmail } from '../ChangeEmail';
import { ChangePassword } from '../ChangePassword';
import { styles } from './AccountOptions.styles';

export const AccountOptions = (props) => {

    const { userInfo, setReloadUserInfo } = props
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);

    const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

    const selectedComponent = (key) => {
        switch (key) {
            case 'displayName':
                setRenderComponent(
                    <ChangeDisplayName
                        close={onCloseOpenModal}
                        userInfo={userInfo}
                        setReloadUserInfo={setReloadUserInfo} />)
                        onCloseOpenModal()
                break;

            case 'email':
                setRenderComponent(
                    <ChangeEmail
                        userInfo={userInfo}
                        onClose={onCloseOpenModal}
                        setReloadUserInfo={setReloadUserInfo} />)
                        onCloseOpenModal()
                break;

            case 'password':
                setRenderComponent(
                    <ChangePassword
                        userInfo={userInfo}
                        onClose={onCloseOpenModal}
                        setReloadUserInfo={setReloadUserInfo} />)
                        onCloseOpenModal()
                break;

            default:
                setRenderComponent(null)
                onCloseOpenModal()
                break;
        }
    }

    const generateOpts = (selectedComponent) => {
        return [
            { title: 'Change Name and LastName', iconName: 'account-circle', onPress: () => selectedComponent('displayName') },
            { title: 'Change Email', iconName: 'at', onPress: () => selectedComponent('email') },
            { title: 'Change Password', iconName: 'lock-reset', onPress: () => selectedComponent('password') }
        ]
    }

    const menuOptions = generateOpts(selectedComponent)

    return (
        <View>
            {
                map(menuOptions, (item, index) =>
                (
                    <ListItem key={index}
                        containerStyle={styles.menuItem}
                        onPress={item.onPress}
                    >
                        <Icon type='material-community' name={item.iconName} size={32} color={'#ccc'} />
                        <ListItem.Content>
                            <ListItem.Title>{item.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon type='material-community' name='chevron-right' size={32} color={'#ccc'} />
                    </ListItem>
                ))
            }
            <Modal show={showModal} close={onCloseOpenModal}>
                {renderComponent}
            </Modal>
        </View >
    )
};