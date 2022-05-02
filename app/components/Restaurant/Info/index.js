import { map } from 'lodash';
import React from 'react';
import { View, } from 'react-native';
import { ListItem, Icon, Text } from 'react-native-elements';
import { Map } from '../../Shared/Map';
import { styles } from './Info.styles';

export const Info = ({ restaurant }) => {

    const listInfo = [
        { text: restaurant.address, iconType: 'material-community', iconName: 'map-marker' },
        { text: restaurant.phone, iconType: 'material-community', iconName: 'phone' },
        { text: restaurant.email, iconType: 'material-community', iconName: 'at' }
    ]

    return (
        <View style={styles.content}>
            <Text style={styles.title}>Information about restaurant</Text>
            <Map location={restaurant.location} name={restaurant.name} />
            {map(listInfo, (item, i) => (
                <ListItem key={i} bottomDivider>
                    <Icon iconStyle={{ color: '#00a680' }} type={item.iconType} name={item.iconName} />
                    <ListItem.Content>
                        <ListItem.Title>{item.text}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            ))}
        </View>
    )
};