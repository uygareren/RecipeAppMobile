import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import { RootStateType } from "../store/store";
import { BLACK_COLOR, GRAY, MAIN_COLOR_GREEN, WHITE } from "../utils/utils";
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
                        height: 80,
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
                            <View style={{backgroundColor: focused ? MAIN_COLOR_GREEN: WHITE, padding:8, borderRadius:8}}>

                            <AntDesign
                                name="home"
                                size={28}
                                color={focused ? WHITE : GRAY}
                            />
                            </View>

                        ),
                        headerShown: false,
                        tabBarLabel: "",
                    }}
                    listeners={{
                        tabPress: () => {
                            navigation.push("Home");

                        }
                    }}
                    
                />
                <Tab.Screen
                    name="InterestedCuisinesNavigation"
                    component={InterestedCuisinesNavigation}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <View style={{backgroundColor: focused ? MAIN_COLOR_GREEN: WHITE, padding:8, borderRadius:8}}>
                                <MaterialCommunityIcons 
                                name="food-takeout-box-outline" 
                                size={28} 
                                color={focused ? WHITE : GRAY}
                                />
                                {/* {focused ? (
                                    <View style={{borderWidth:1,marginTop:5, borderRadius:360, height:2, width:2, backgroundColor:MAIN_COLOR_GREEN}}/>
                                ):null} */}
                            </View>
                           
                        ),
                        headerShown: false,
                        tabBarLabel: "",
                    }}
                    
                />

                <Tab.Screen
                    name="AddFoodNavigation"
                    component={AddFoodNavigation}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <View style={{backgroundColor: focused ? MAIN_COLOR_GREEN: WHITE, padding:8, borderRadius:8}}>
                                <AntDesign name="plus"size={28} color={focused ? WHITE : GRAY} />
                                 
                            </View>
                        ),
                        headerShown: false,
                        tabBarLabel: "",
                    }}
                    
                />
                <Tab.Screen
                    name="DetailSearchNavigation"
                    component={SearchNavigation}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <View style={{backgroundColor: focused ? MAIN_COLOR_GREEN: WHITE, padding:8, borderRadius:8}}>
                               <Feather name="search" size={28} color={focused ? WHITE : GRAY} />
                            </View>
                        ),
                        headerShown: false,
                        tabBarLabel: "",
                    }}
                    
                />

                <Tab.Screen
                    name="ProfileNavigation"
                    component={ProfileNavigation}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <View style={{backgroundColor: focused ? MAIN_COLOR_GREEN: WHITE, padding:8, borderRadius:8}}>
                            <Ionicons
                                name="person-outline"
                                size={28}
                                color={focused ? WHITE : GRAY}
                            />
                            </View>
                            
                        ),
                        headerShown: false,
                        tabBarLabel: "",
                    }}
                    // listeners={{
                    //     tabPress: (e) => {
                    //         e.preventDefault();
                    //         navigation.push("Profile")

                    //     }
                    // }}                
                    />
            </Tab.Navigator>
        </SafeAreaView>
    );
};
