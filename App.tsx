import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { registerRootComponent } from 'expo';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { I18nextProvider } from 'react-i18next';
import { AppRegistry, Platform, StyleSheet } from 'react-native';
import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { TabNavigation } from './navigations/Tab';
import ProtectProvider from './provider/ProtectProvider';
import OtherProfile from './screens/Account/OtherProfile';
import CategoryDetail from './screens/CategoryDetail';
import CategoryScreen from './screens/CategoryScreen';
import FollowScreen from './screens/FollowScreen';
import InterestSelectionScreen from './screens/InterestSelectionScreen';
import FavoritesScreen from './screens/LikedScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import SearchResultScreen from './screens/SearchResultScreen';
import SettingsScreen from './screens/SettingsScreen';
import UpdatePasswordScreen from './screens/UpdatePasswordScreen';
import UpdateProfileScreen from './screens/UpdateProfile';
import { store } from './store/store';
import i18n from "./utils/i18n";



type StackParamList = {
  Tab: undefined,
  Settings: undefined,
  UpdatePassword:undefined,
  Favorites:undefined,
  RecipeDetail:undefined,
  Categories:undefined,
  CategoryDetail:{
    id:string,
    name:string
  },
  OtherProfile: undefined,
  InterestSelection:undefined,
  Follow:undefined,
  UpdateProfile:undefined,
  SearchResult:{
    selectedComponentIds:any
  }
  
}

export type MainStackScreenProps<T extends keyof StackParamList> = StackScreenProps<StackParamList, T, T>;
const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {

  const theme = extendTheme(DefaultTheme)

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <I18nextProvider i18n={i18n} defaultNS={"translation"}>
        <NativeBaseProvider theme={theme}>
          <ProtectProvider>
            <NavigationContainer>
                <Stack.Navigator>
                <Stack.Screen component={TabNavigation} name="Tab" options={{headerShown: false}}/>

                <Stack.Screen component={InterestSelectionScreen} name='InterestSelection' options={{headerShown:false}}/>

                <Stack.Screen component={RecipeDetailScreen} name="RecipeDetail" options={{headerShown:false}}/>


                  <Stack.Screen component={CategoryScreen} name='Categories' options={{headerShown:false}}/>


                  <Stack.Group screenOptions={{headerShown: false}}>
                    <Stack.Screen component={SettingsScreen} name='Settings' options={{headerShown: false}}/>
                    <Stack.Screen component={UpdatePasswordScreen} name='UpdatePassword' options={{headerShown:false}}/>
                    <Stack.Screen component={FavoritesScreen} name='Favorites'/>
                    <Stack.Screen component={CategoryDetail} name='CategoryDetail' options={{headerShown:false}}/>
                    <Stack.Screen component={OtherProfile} name='OtherProfile' options={{headerShown:false}}/>
                    <Stack.Screen component={FollowScreen} name='Follow' options={{headerShown:false}}/>
                    <Stack.Screen component={UpdateProfileScreen} name='UpdateProfile' options={{headerShown:false}}/>
                    <Stack.Screen component={SearchResultScreen} name='SearchResult' options={{headerShown:false}}/>

                  </Stack.Group>
                  
                </Stack.Navigator>
            </NavigationContainer>
          </ProtectProvider>
        </NativeBaseProvider>
      </I18nextProvider>
    </Provider>
    </QueryClientProvider>
    
  );
}
if (Platform.OS == "android") {
  registerRootComponent(App);
} else {
  AppRegistry.registerComponent("recipeapp", () => App);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
