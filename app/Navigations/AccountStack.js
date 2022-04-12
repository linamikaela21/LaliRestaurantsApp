import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AccountScreen } from '../screens/Account/AccountScreen'
import { SignInScreen } from '../screens/Account/SignInScreen/index'
import { SignUpScreen } from '../screens/Account/SignUpScreen'
import { screen } from '../utils/screenName'

const Stack = createNativeStackNavigator()

export const AccountStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name={screen.account.account}
            component={AccountScreen} 
            options={{ title: 'Account' }} />
            <Stack.Screen 
            name='SignIn'
            component={SignInScreen} 
            options={{ title: 'Sign In' }} />
            <Stack.Screen 
            name='SignUp'
            component={SignUpScreen} 
            options={{ title: 'Sign Up' }} />
        </Stack.Navigator>
    )
}