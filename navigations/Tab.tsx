import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native";
import { BLACK_COLOR, MAIN_COLOR, TAB_INACTIVE_COLOR } from "../utils/utils";
import ProfileNavigation from "./ProfileNavigation";
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();


export const TabNavigation = () => {

    return (
        <SafeAreaView>
             <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: TAB_INACTIVE_COLOR,
                    tabBarInactiveTintColor: TAB_INACTIVE_COLOR,
                    
                    tabBarStyle: { 
                        backgroundColor: BLACK_COLOR, height: 70, borderTopLeftRadius: 30, borderTopRightRadius: 30,
                    },
                    tabBarLabelStyle: {  marginBottom: 10 },
                    tabBarIconStyle: { marginTop: 15, marginBottom: 5 },
                    tabBarHideOnKeyboard: true,
                    headerShown: false
                }}
            >
                
                <Tab.Screen
                    name="Profile"
                    component={ProfileNavigation}
                    options={{
                        tabBarIcon: ({focused, color, size}) => (
                            <Ionicons name="person-outline" size={24} color="#fff"/>
                        ),
                        headerShown: false,
                        headerStyle: { backgroundColor: MAIN_COLOR },
                        tabBarLabel: "Profile",
                    }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    )

}