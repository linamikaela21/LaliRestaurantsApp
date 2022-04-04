import React from 'react';
import { Overlay } from 'react-native-elements';
import { styles } from './Modal.styles';

export const Modal = (props) => {
    const { isVisible, setIsVisible, children } = props

    const closeModal = () => setIsVisible(false)

    return (
        <Overlay
            isVisible={isVisible}
            overlayStyle={styles.modal}
            onBackdropPress={closeModal}
        >
            {children}
        </Overlay>
    )
};