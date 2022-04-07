import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AddRestaurants } from '../screens/Restorants/AddRestaurants/AddRestaurants'
import { Restaurants } from '../screens/Restorants/Restaurants'

const Stack = createNativeStackNavigator()

export const RestaurantsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='restaurants' component={Restaurants} options={{ title: 'Restaurants' }} />
            <Stack.Screen name='add-restaurants' component={AddRestaurants} options={{ title: 'Add Restaurant' }} />
        </Stack.Navigator>
    )
}