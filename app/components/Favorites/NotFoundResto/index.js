import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from './NotFoundResto.styles'

export const NotFoundResto = () => {

    return (
        <View style={styles.content}>
            <Icon
                type='material-community'
                name='alert-outline'
                size={80}
                color='#00a680'
            />
            <Text style={styles.text}>Any favorites restaurants here..</Text>
        </View>
    )
};