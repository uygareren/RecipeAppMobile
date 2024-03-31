import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackScreenProps } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/Account/LoginScreen";
import ProfileScreen from "../screens/Account/ProfileScreen";
import RegisterScreen from "../screens/Account/RegisterScreen";
import { RootStateType } from "../store/store";



type TabStackParamList = {
    Login: undefined,
    Register: undefined,
    Profile: undefined,
    // ForgetPassword: undefined,
    // ConfirmRegister: {
    //     email: string
    // },
    // UpdateProfile: undefined
}

export type TabAccountScreenProps<T extends keyof TabStackParamList> = StackScreenProps<TabStackParamList, T, T>;
const Stack = createNativeStackNavigator<TabStackParamList>();

export default function ProfileNavigation() {
    const userInfo = useSelector<RootStateType, any>((state) => state.user.userInfo)

    const RenderScreens = () => {
        if(userInfo.userId){
            return (
                <>
                    <Stack.Screen component={ProfileScreen} name="Profile" options={{headerShown: false}}/>
                </>
            )
        }else{
            return (
                <>
                    <Stack.Screen component={LoginScreen} name="Login" options={{ headerShown: false }} />
                    <Stack.Screen component={RegisterScreen} name="Register" options={{ headerShown: false }} />
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
