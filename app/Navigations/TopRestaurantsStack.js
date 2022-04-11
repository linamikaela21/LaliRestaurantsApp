import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { screen } from '../utils/screenName'
import { TopRestaurantsScreen } from '../screens/TopRestaurantsScreen/TopRestaurantsScreen'

const Stack = createNativeStackNavigator()

export const TopRestaurantsStack = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name={screen.ranking.ranking} component={TopRestaurantsScreen} options={{ title: 'Top 5' }} />
        </Stack.Navigator>
    )
}