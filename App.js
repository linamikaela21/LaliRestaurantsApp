import { LogBox } from "react-native";
import { Navigation } from './app/Navigations/Navigation';
import { NavigationContainer } from '@react-navigation/native'
import Toast from "react-native-toast-message";

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {

  return (
    <>
      <NavigationContainer>
        < Navigation />
      </NavigationContainer>
      <Toast />
    </>
  );
}