import React from 'react';
import { Overlay } from 'react-native-elements';
import { styles } from './Modal.styles';

export const Modal = (props) => {
    const { show, close, children } = props

    return (
        <Overlay
            isVisible={show}
            overlayStyle={styles.modal}
            onBackdropPress={close}
        >
            {children}
        </Overlay>
    )
};