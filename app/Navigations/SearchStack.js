import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Seach } from '../screens/Search/Seach'

const Stack = createNativeStackNavigator()

export const SearchStack = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name='search' component={Seach} options={{ title: 'Search' }} />
        </Stack.Navigator>
    )
}