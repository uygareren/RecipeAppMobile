import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackScreenProps } from "@react-navigation/stack";
import AuthProvider from "../provider/AuthProvider";
import AddFoodScreenOne from "../screens/AddFodd/AddFoodScreenOne";
import AddFoodScreenTwo from "../screens/AddFodd/AddFoodScreenTwo";



type TabStackParamList = {
    AddFoodScreenOne:undefined,
    AddFoodScreenTwo:undefined,

}

export type TabAccountScreenProps<T extends keyof TabStackParamList> = StackScreenProps<TabStackParamList, T, T>;
const Stack = createNativeStackNavigator<TabStackParamList>();


export default function AddFoodNavigation(){

    return(
        <AuthProvider name="addFood">
            <Stack.Navigator>
                <Stack.Screen component={AddFoodScreenOne} name={"AddFoodScreenOne"} options={{headerShown:false}}/>
                <Stack.Screen component={AddFoodScreenTwo} name={"AddFoodScreenTwo"} options={{headerShown:false}}/>
            </Stack.Navigator>
        </AuthProvider>

    )
    

       

}