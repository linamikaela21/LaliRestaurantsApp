import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { screen } from '../utils/screenName'
import { AccountScreen } from '../screens/Account/AccountScreen'
import { SingInScreen } from '../screens/Account/SingInScreen'
import { SignUpScreen } from '../screens/Account/SignUpScreen'

const Stack = createNativeStackNavigator()

export const AccountStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.account.account} component={AccountScreen} options={{ title: 'Account' }} />
            <Stack.Screen name={screen.account.signIn} component={SingInScreen} options={{ title: 'Sign In' }} />
            <Stack.Screen name={screen.account.signUp} component={SignUpScreen} options={{ title: 'Sign Up' }} />
        </Stack.Navigator>
    )
}