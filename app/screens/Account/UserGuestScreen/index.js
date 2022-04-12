import React from 'react';
import { ScrollView } from "react-native";
import { Text, Button, Image } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils/screenName';
import { styles } from './UserGuestScreen.styles'

export const UserGuestScreen = () => {
  const navigation = useNavigation()
  const goToSignUp = () => navigation.navigate(screen.account.tab, { screen: screen.account.signUp })

  return (
    <ScrollView centerContent={true} style={styles.content}>
      <Image source={require('../../../images/folkandspoon.jpg')}
        resizeMode='contain'
        style={styles.image}
      />
      <Text style={styles.title}>Look your RestoLaliApp profile</Text>
      <Text style={styles.description}>Search and look yours best Restaurants in a easier, vote your favorites and comment your experience</Text>
      <Button
        title="Look your profile"
        onPress={goToSignUp}
        buttonStyle={styles.btnStyle}
      />
    </ScrollView>
  );
}
