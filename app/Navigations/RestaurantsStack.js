import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { screen } from '../utils'
import { AddRestaurantScreen, RestaurantScreen, RestaurantsScreen, AddReviewRestaurantsScreen } from '../screens/RestaurantsScreen'

const Stack = createNativeStackNavigator()

export const RestaurantsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.restaurant.restaurants} component={RestaurantsScreen} options={{ title: 'Restaurants' }} />
            <Stack.Screen name={screen.restaurant.addRestaurant} component={AddRestaurantScreen} options={{ title: 'Add Restaurant' }} />
            <Stack.Screen name={screen.restaurant.restaurant} component={RestaurantScreen} options={{ title: 'Restaurants' }} />
            <Stack.Screen name={screen.restaurant.addReviewRestaurant} component={AddReviewRestaurantsScreen} options={{ title: 'New Review' }} />
        </Stack.Navigator>
    )
}