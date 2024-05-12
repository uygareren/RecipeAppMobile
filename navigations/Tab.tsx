import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { RootStateType } from "../store/store";
import { BLACK_COLOR, GRAY, WHITE } from "../utils/utils";
import AddFoodNavigation from "./AddFoodNavigation";
import HomeNavigation from "./HomeNavigation";
import InterestedCuisinesNavigation from './InterestedCuisinesNavigation';
import ProfileNavigation from "./ProfileNavigation";
import SearchNavigation from "./SearchNavigation";


const Tab = createBottomTabNavigator();

export const TabNavigation = () => {

    const userInfo = useSelector((state:RootStateType) => state.user.userInfo);
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: BLACK_COLOR,
                    tabBarInactiveTintColor: GRAY,
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
                                color={focused ? BLACK_COLOR : GRAY}
                            />
                        ),
                        headerShown: false,
                        tabBarLabel: "Home",
                    }}
                    
                />
                <Tab.Screen
                    name="InterestedCuisinesNavigation"
                    component={InterestedCuisinesNavigation}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <MaterialCommunityIcons 
                            name="food-takeout-box-outline" 
                            size={24} 
                            color={focused ? BLACK_COLOR : GRAY}
                        />
                        ),
                        headerShown: false,
                        tabBarLabel: "Interested Cuisines",
                    }}
                    
                />

                <Tab.Screen
                    name="AddFoodNavigation"
                    component={AddFoodNavigation}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <AntDesign name="plus" size={24} color={focused ? BLACK_COLOR : GRAY} />
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
                            <Feather name="search" size={24} color={focused ? BLACK_COLOR : GRAY} />
                        ),
                        headerShown: false,
                        tabBarLabel: "Detail Search",
                    }}
                    
                />

                <Tab.Screen
                    name="ProfileNavigation"
                    component={ProfileNavigation}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons
                                name="person-outline"
                                size={24}
                                color={focused ? BLACK_COLOR : GRAY}
                            />
                        ),
                        headerShown: false,
                        tabBarLabel: "Profile",
                    }}
                    listeners={{
                        tabPress: (e) => {
                            navigation.push("Profile")

                        }
                    }}                
                    />
            </Tab.Navigator>
        </SafeAreaView>
    );
};
