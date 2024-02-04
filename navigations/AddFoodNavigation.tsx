import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackScreenProps } from "@react-navigation/stack";
import AddFoodScreen from "../screens/AddFodd/AddFoodScreen";
import AuthProvider from "../provider/AuthProvider";



type TabStackParamList = {
    AddFoodScreen:undefined
}

export type TabAccountScreenProps<T extends keyof TabStackParamList> = StackScreenProps<TabStackParamList, T, T>;
const Stack = createNativeStackNavigator<TabStackParamList>();


export default function AddFoodNavigation(){

    return(
        <AuthProvider name="addFood">
            <Stack.Navigator>
                <Stack.Screen component={AddFoodScreen} name={"AddFoodScreen"} options={{headerShown:false}}/>
            </Stack.Navigator>
        </AuthProvider>

    )
    

       

}