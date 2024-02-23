import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native";
import { BLACK_COLOR, LIGHT_GRAY, MAIN_COLOR, TAB_INACTIVE_COLOR, WHITE } from "../utils/utils";
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
                    tabBarActiveTintColor: BLACK_COLOR,
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                        backgroundColor: WHITE,
                        paddingVertical: 0,
                        height: 70,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                    },
                    tabBarLabelStyle: { marginBottom: 10, fontWeight:"600" },
                    tabBarIconStyle: { marginTop: 10, marginBottom: 0},
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
                                color={focused ? BLACK_COLOR : "gray"}
                            />
                        ),
                        headerShown: false,
                        tabBarLabel: "Home",
                    }}
                />

                <Tab.Screen
                    name="AddFoodNavigation"
                    component={AddFoodNavigation}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <AntDesign name="plus" size={24} color={focused ? BLACK_COLOR : "gray"} />
                        ),
                        headerShown: false,
                        tabBarLabel: "Add Food",
                    }}
                />
                <Tab.Screen
                    name="DetailSearchNavigation"
                    component={SearchNavigation}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Feather name="search" size={24} color={focused ? BLACK_COLOR : "gray"} />
                        ),
                        headerShown: false,
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
                                color={focused ? BLACK_COLOR : "gray"}
                            />
                        ),
                        headerShown: false,
                        tabBarLabel: "Profile",
                    }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
};
