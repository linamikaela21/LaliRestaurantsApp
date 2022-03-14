import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { styles } from "./Loading.styles";

export const Loading = (props) => {
    const { show, text } = props
    if (!show) return null;
    return (
        <View style={styles.view}>
            <ActivityIndicator size='large' color='#00a680' />
            {text && <Text style={styles.text}>{text}</Text>}
        </View>
    );
}