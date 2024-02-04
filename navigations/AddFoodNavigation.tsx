import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackScreenProps } from "@react-navigation/stack";
import AddFoodScreen from "../screens/AddFodd/AddFoodScreen";



type TabStackParamList = {
    AddFoodScreen:undefined
}

export type TabAccountScreenProps<T extends keyof TabStackParamList> = StackScreenProps<TabStackParamList, T, T>;
const Stack = createNativeStackNavigator<TabStackParamList>();


export default function AddFoodNavigation(){

    return(
        <Stack.Navigator>
            <Stack.Screen component={AddFoodScreen} name={"AddFoodScreen"} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
    

       

}