import { StackScreenProps, createStackNavigator } from "@react-navigation/stack";
import AuthProvider from "../provider/AuthProvider";
import HomeScreen from "../screens/Home/HomeScreen";


type TabStackParamList = {
   Home: any,
   AddFoodScreenOne:undefined
}
export type TabAccountScreenProps<T extends keyof TabStackParamList> = StackScreenProps<TabStackParamList, T, T>;
const Stack = createStackNavigator<TabStackParamList>();

export default function HomeNavigation(){
   
    return(
        <AuthProvider>

            <Stack.Navigator>
                <Stack.Screen component={HomeScreen} name="Home" options={{headerShown:false}}/>
            </Stack.Navigator>
        </AuthProvider>

    )

}

