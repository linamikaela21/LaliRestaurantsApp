import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AccountScreen, SignInScreen, SignUpScreen } from '../screens/Account'
import { screen } from '../utils'

const Stack = createNativeStackNavigator()

export const AccountStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={screen.account.account}
                component={AccountScreen}
                options={{ title: 'Account' }} />
            <Stack.Screen
                name={screen.account.signIn}
                component={SignInScreen}
                options={{ title: 'Sign In' }} />
            <Stack.Screen
                name={screen.account.signUp}
                component={SignUpScreen}
                options={{ title: 'Sign Up' }} />
        </Stack.Navigator>
    )
}