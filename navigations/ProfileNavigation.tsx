import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackScreenProps } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { RootStateType } from "../store/store";
import LoginScreen from "../screens/Account/LoginScreen";



type TabStackParamList = {
    Login: undefined,
    // Register: undefined,
    // ForgetPassword: undefined,
    // ConfirmRegister: {
    //     email: string
    // },
    // Profile: undefined,
    // UpdateProfile: undefined
}

export type TabAccountScreenProps<T extends keyof TabStackParamList> = StackScreenProps<TabStackParamList, T, T>;
const Stack = createNativeStackNavigator<TabStackParamList>();

export default function ProfileNavigation() {
    const userInfo = useSelector<RootStateType, any>((state) => state.user.userInfo)

    const RenderScreens = () => {
        if(userInfo.id){
            return (
                <>
                
                </>
            )
        }else{
            return (
                <>
                    <Stack.Screen component={LoginScreen} name="Login" options={{ headerShown: false }} />
                </>
            )
        }
    }

    return (
        <Stack.Navigator screenOptions={{  }}>
            {RenderScreens()} 
        </Stack.Navigator>
)
}
