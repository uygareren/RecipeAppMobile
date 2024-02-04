import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackScreenProps } from "@react-navigation/stack";
import SearchScreen from "../screens/Search/SearchScreen";
import AuthProvider from "../provider/AuthProvider";



type TabStackParamList = {
    Search:undefined,
}

export type TabAccountScreenProps<T extends keyof TabStackParamList> = StackScreenProps<TabStackParamList, T, T>;
const Stack = createNativeStackNavigator<TabStackParamList>();


export default function SearchNavigation(){
    return(
        <AuthProvider name="search">
            <Stack.Navigator>
                <Stack.Screen component={SearchScreen} name={"Search"} options={{headerShown:false}}></Stack.Screen>
            </Stack.Navigator>
        </AuthProvider>

    )

}