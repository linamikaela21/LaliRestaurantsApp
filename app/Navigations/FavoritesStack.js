import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Favorites } from '../screens/Favorites/Favorites'

const Stack = createNativeStackNavigator()

export const FavoritesStack = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name='favorites' component={Favorites} options={{ title: 'Favorites' }} />
        </Stack.Navigator>
    )
}