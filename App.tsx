import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { TabNavigation } from './navigations/Tab';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { NativeBaseProvider, extendTheme } from 'native-base';
import SettingsScreen from './screens/SettingsScreen';


type StackParamList = {
  Tab: undefined,
  Settings: undefined;
  // ConfirmRegister: {
  //     email: string
  // },
  // UpdatePassword: {
  //     email: string
  // }
}

export type MainStackScreenProps<T extends keyof StackParamList> = StackScreenProps<StackParamList, T, T>;
const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {

  const theme = extendTheme(DefaultTheme)

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen component={TabNavigation} name="Tab" options={{headerShown: false}}/>
            <Stack.Screen component={SettingsScreen} name='Settings' options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>

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
