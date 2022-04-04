import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { Modal } from '../../Shared/Modal/Modal';
import { styles } from './AccountOptions.styles';

export const AccountOptions = (props) => {

    const { userInfo, toastRef } = props
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);

    const selectedComponent = (key) => {
        console.log(key);
        switch (key) {
            case 'displayName':
                setRenderComponent(<Text>Change Name and LastName</Text>)
                setShowModal(true)
                break;

            case 'email':
                setRenderComponent(<Text>Change email</Text>)
                setShowModal(true)
                break;

            case 'password':
                setRenderComponent(<Text>Change password</Text>)
                setShowModal(true)
                break;

            default:
                setRenderComponent(null)
                setShowModal(false)
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
                menuOptions.map((item, index) =>
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
            {renderComponent && (
                <Modal
                    isVisible={showModal}
                    setIsVisible={setShowModal}>
                    {renderComponent}
                </Modal>
            )}
        </View >
    )
};