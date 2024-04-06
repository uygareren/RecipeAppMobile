import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps, createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import HomeScreen from "../screens/Home/HomeScreen";
import InterestSelectionScreen from "../screens/InterestSelectionScreen";
import { RootStateType } from "../store/store";
import { keyGenerator } from "../utils/utils";


type TabStackParamList = {
   Home: any,
   InterestSelection:undefined,
   AddFoodScreen:undefined
}
export type TabAccountScreenProps<T extends keyof TabStackParamList> = StackScreenProps<TabStackParamList, T, T>;
const Stack = createStackNavigator<TabStackParamList>();

export default function HomeNavigation(){
    const userInfo = useSelector<RootStateType, any>((state) => state.user.userInfo)
    const key = keyGenerator("interest",userInfo?.userId)
    let value :any;
    AsyncStorage.getItem(key).then((storedValue) => value = storedValue);

    const renderScreen = () => {
        if(value == "true"){
            return(
                <>
                    <Stack.Screen component={InterestSelectionScreen} name="InterestSelection" options={{headerShown:false}}/>
                </>
            )
        }else{
            return(
                <>
                    <Stack.Screen component={HomeScreen} name="Home" options={{headerShown:false}}/>
                </>
            )
        }
    }
    
    return(
        <Stack.Navigator>
            {renderScreen()}
        </Stack.Navigator>
    )

}

