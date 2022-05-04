import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { screen } from '../../../utils';
import { styles } from './UserNotLogged.styles'

export const UserNotLogged = () => {
    const navigation = useNavigation()

    const goToLogin = () => navigation.navigate(screen.account.tab, { screen: screen.account.signIn })

    return (
        <View style={styles.content}>
            <Icon
                type='material-community'
                name='alert-outline'
                color={isFavorite ? '#f00' : '#000'}
                size={80}
                onPress={isFavorite ? removeToFavorites : addToFavorites}
            />
            <Text style={styles.info}>You need to be logged to access to this section</Text>
            <Button
                title='Go to login'
                onPress={goToLogin}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn} />
        </View>
    )
};