import { StatusBar } from 'expo-status-bar';
import i18n from "./utils/i18n"
import { StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { TabNavigation } from './navigations/Tab';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { NativeBaseProvider, extendTheme } from 'native-base';
import SettingsScreen from './screens/SettingsScreen';
import ProtectProvider from './provider/ProtectProvider';
import { I18nextProvider } from 'react-i18next';


type StackParamList = {
  Tab: undefined,
  Settings: undefined;
  
}

export type MainStackScreenProps<T extends keyof StackParamList> = StackScreenProps<StackParamList, T, T>;
const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {

  const theme = extendTheme(DefaultTheme)

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n} defaultNS={"translation"}>
        <NativeBaseProvider>
          <ProtectProvider>
            <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen component={TabNavigation} name="Tab" options={{headerShown: false}}/>
                  <Stack.Screen component={SettingsScreen} name='Settings' options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
          </ProtectProvider>
        </NativeBaseProvider>
      </I18nextProvider>
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
