import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FavoritesScreen } from '../screens/FavoritesScreen/FavoritesScreen'
import { screen } from '../utils/screenName'

const Stack = createNativeStackNavigator()

export const FavoritesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.favorites.favorites} component={FavoritesScreen} options={{ title: 'Favorites' }} />
        </Stack.Navigator>
    )
}