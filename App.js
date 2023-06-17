import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './app/screens/homeScreen';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import StackNavigator from './app/navigation/stackNavigator';

export default function App() {
  return (
    <Provider store={store}>
        <StackNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
