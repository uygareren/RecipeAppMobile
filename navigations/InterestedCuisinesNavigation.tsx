import { StackScreenProps, createStackNavigator } from "@react-navigation/stack";
import AuthProvider from "../provider/AuthProvider";
import InterestedCuisinesScreen from "../screens/Interested/InterestedCuisinesScreen";


type TabStackParamList = {
   InterestedCuisines:undefined
}
export type TabAccountScreenProps<T extends keyof TabStackParamList> = StackScreenProps<TabStackParamList, T, T>;
const Stack = createStackNavigator<TabStackParamList>();

export default function InterestedCuisinesNavigation(){
   
    return(
        <AuthProvider>
            <Stack.Navigator>
                <Stack.Screen component={InterestedCuisinesScreen} options={{headerShown:false}} name="InterestedCuisines" />
            </Stack.Navigator>
        </AuthProvider>

    )

}

