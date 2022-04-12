import { LogBox } from 'react-native';
import { Navigation } from './app/navigations/Navigation';

LogBox.ignoreAllLogs(['Setting a timer', 'AsyncStorage has been extracted'])
export default function App() {

  return (
    < Navigation />
  );
}