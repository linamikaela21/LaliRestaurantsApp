import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
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
                size={80}
                color='#00a680'
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