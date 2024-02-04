import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native";
import { BLACK_COLOR, MAIN_COLOR, TAB_ACTIVE_COLOR, TAB_INACTIVE_COLOR, WHITE } from "../utils/utils";
import ProfileNavigation from "./ProfileNavigation";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import HomeNavigation from "./HomeNavigation";
import AddFoodNavigation from "./AddFoodNavigation";
import SearchNavigation from "./SearchNavigation";


const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveBackgroundColor: MAIN_COLOR,
                    tabBarItemStyle: {borderRadius: 180, alignSelf: "center", marginHorizontal: 5},
                    tabBarActiveTintColor: TAB_ACTIVE_COLOR,
                    tabBarInactiveTintColor: TAB_INACTIVE_COLOR,
                    tabBarStyle: {
                        backgroundColor: WHITE,
                        paddingVertical: 0,
                        height: 80,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                    },
                    tabBarLabelStyle: { marginBottom: 10 },
                    tabBarIconStyle: { marginTop: 25, marginBottom: 5 },
                    tabBarHideOnKeyboard: true,
                    headerShown: false,
                }}
            >
                <Tab.Screen
                    name="HomeNavigation"
                    component={HomeNavigation}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <AntDesign
                                name="home"
                                size={24}
                                color={focused ? TAB_ACTIVE_COLOR : TAB_INACTIVE_COLOR}
                            />
                        ),
                        headerShown: false,
                        headerStyle: { backgroundColor: MAIN_COLOR },
                        tabBarLabel: "Home",
                    }}
                />

                <Tab.Screen
                    name="AddFoodNavigation"
                    component={AddFoodNavigation}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <AntDesign name="plus" size={24} color={focused ? TAB_ACTIVE_COLOR : TAB_INACTIVE_COLOR} />
                        ),
                        headerShown: false,
                        headerStyle: { backgroundColor: MAIN_COLOR },
                        tabBarLabel: "Add Food",
                    }}
                />
                <Tab.Screen
                    name="DetailSearchNavigation"
                    component={SearchNavigation}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Feather name="search" size={24} color={focused ? TAB_ACTIVE_COLOR : TAB_INACTIVE_COLOR} />
                        ),
                        headerShown: false,
                        headerStyle: { backgroundColor: MAIN_COLOR },
                        tabBarLabel: "Detail Search",
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={ProfileNavigation}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons
                                name="person-outline"
                                size={24}
                                color={focused ? TAB_ACTIVE_COLOR : TAB_INACTIVE_COLOR}
                            />
                        ),
                        headerShown: false,
                        headerStyle: { backgroundColor: MAIN_COLOR },
                        tabBarLabel: "Profile",
                    }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
};
