import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Restaurants } from '../screens/Restorants/Restaurants'

const Stack = createNativeStackNavigator()

export const RestaurantsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='restaurants' component={Restaurants} options={{ title: 'Restaurants' }} />
            <Stack.Screen name='add-restaurant' component={Restaurants} options={{ title: 'Add Restaurants' }} />
        </Stack.Navigator>
    )
}