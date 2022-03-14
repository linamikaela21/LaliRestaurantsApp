import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { styles } from './UserGuest.styles'

export const UserGuest = () => {
  const navigation = useNavigation();
  return (
    <ScrollView centerContent={true} style={styles.viewBody}>
        <Image source={require('../../../images/folkandspoon.jpg')} 
        resizeMode='contain' 
        style={styles.image}
        />
        <Text style={styles.title}>Look your RestoLaliApp profile</Text>
        <Text style={styles.description}>Search and look yours best Restaurants in a easier, vote your favorites and comment your experience</Text>
        <View style={styles.viewBtn}>
        <Button
          title="Look your profile"
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate('signIn')}
        />
      </View>
    </ScrollView>
);
}
