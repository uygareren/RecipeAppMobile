import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigation } from './navigations/Tab';


export default function App() {

  type StackParamList = {
    Tab: undefined,
    // ConfirmRegister: {
    //     email: string
    // },
    // UpdatePassword: {
    //     email: string
    // }
}

type MainStackScreenProps<T extends keyof StackParamList> = StackScreenProps<StackParamList, T, T>;
const Stack = createNativeStackNavigator<StackParamList>();


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={TabNavigation} name="Tab" options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
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
