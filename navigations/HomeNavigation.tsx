import { StackScreenProps, createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "../screens/Home/HomeScreen";
import { useSelector } from "react-redux";
import { RootStateType } from "../store/store";
import { keyGenerator } from "../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InterestSelectionScreen from "../screens/InterestSelectionScreen";


type TabStackParamList = {
   Home: any,
   InterestSelection:undefined
}
export type TabAccountScreenProps<T extends keyof TabStackParamList> = StackScreenProps<TabStackParamList, T, T>;
const Stack = createStackNavigator<TabStackParamList>();

export default function HomeNavigation(){
    const userInfo = useSelector<RootStateType, any>((state) => state.user.userInfo)
    const key = keyGenerator(userInfo?.userId)
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

