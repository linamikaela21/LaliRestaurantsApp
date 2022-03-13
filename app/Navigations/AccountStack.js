import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Account } from '../screens/Account/Account'

const Stack = createNativeStackNavigator()

export const AccountStack = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name='account' component={Account} options={{ title: 'Account' }} />
        </Stack.Navigator>
    )
}