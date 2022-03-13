import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TopRestaurants } from '../screens/TopRestorants/TopRestaurants'

const Stack = createNativeStackNavigator()

export const TopRestaurantsStack = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name='top-restaurants' component={TopRestaurants} options={{ title: 'Top 5' }} />
        </Stack.Navigator>
    )
}