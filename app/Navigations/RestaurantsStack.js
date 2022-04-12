import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { screen } from '../utils/screenName'
import { AddRestaurantScreen, RestaurantScreen, RestaurantsScreen } from '../screens/RestaurantsScreen'

const Stack = createNativeStackNavigator()

export const RestaurantsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Restaurants' component={RestaurantsScreen} options={{ title: 'Restaurants' }} />
            <Stack.Screen name='AddRestaurant' component={AddRestaurantScreen} options={{ title: 'Add Restaurant' }} />
            <Stack.Screen name='Restaurant' component={RestaurantScreen} options={{ title: 'Restaurants' }} />
        </Stack.Navigator>
    )
}