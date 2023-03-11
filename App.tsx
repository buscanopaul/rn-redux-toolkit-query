import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  // const { data: products } = productApi.useGetAllQuery();
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <HomeScreen />
        <StatusBar style="auto" />
      </View>
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
