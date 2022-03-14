import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Account } from '../screens/Account/AccountScreen'
import { SignIn } from '../screens/Account/SingInScreen/SingInScreen'
import { SignUp } from '../screens/Account/SignUpScreen/SignUpScreen'

const Stack = createNativeStackNavigator()

export const AccountStack = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name='account' component={Account} options={{ title: 'Account' }} />
        <Stack.Screen name='signIn' component={SignIn} options={{ title: 'Sign In' }} />
        <Stack.Screen name='signUp' component={SignUp} options={{ title: 'Sign Up' }} />
        </Stack.Navigator>
    )
}