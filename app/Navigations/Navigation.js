import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
import { screen } from '../utils/screenName'
import { RestaurantsStack } from './RestaurantsStack'
import { FavoritesStack } from './FavoritesStack'
import { TopRestaurantsStack } from './TopRestaurantsStack'
import { SearchStack } from './SearchStack'
import { AccountStack } from './AccountStack'

const Tab = createBottomTabNavigator()

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#00a680",
          tabBarInactiveTintColor: "#646464",
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name={screen.restaurant.tab}
          component={RestaurantsStack}
          options={{ title: 'Restourants', headerShown: false }} />
        <Tab.Screen
          name={screen.favorites.tab}
          component={FavoritesStack}
          options={{ title: 'Favorites', headerShown: false }} />
        <Tab.Screen
          name={screen.ranking.tab}
          component={TopRestaurantsStack}
          options={{ title: 'Top 5', headerShown: false }} />
        <Tab.Screen
          name={screen.search.tab}
          component={SearchStack}
          options={{ title: 'Search', headerShown: false }} />
        <Tab.Screen
          name={screen.account.tab}
          component={AccountStack}
          options={{ title: 'Account', headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const screenOptions = (route, color) => {
  let iconName

  switch (route.name) {
    case screen.restaurant.tab:
      iconName = 'compass-outline'
      break;

    case screen.favorites.tab:
      iconName = 'heart-outline'
      break;

    case screen.ranking.tab:
      iconName = 'star-outline'
      break;

    case screen.search.tab:
      iconName = 'magnify'
      break;

    case screen.account.tab:
      iconName = 'home-outline'
      break;

    default:
      break;
  }
  return <Icon type='material-community' name={iconName} size={32} color={color} />
}