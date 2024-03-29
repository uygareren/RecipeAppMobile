import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BLACK_COLOR, LIGHT_GRAY, PINK, WHITE } from "../utils/utils";
import { SafeAreaView } from "react-native";
import { useState } from "react";
import { Actionsheet } from "native-base";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { userSliceActions } from "../store/reducer/userSlice";
import { ChangeLanguage } from "../components/Modals/ChangeLanguageModal";


export default function SettingsScreen(){

    const width = Dimensions.get("screen").width;

    const navigation = useNavigation<any>();
    const dispatch = useDispatch();

    const [isLogoutVisible, setIsLogoutVisible] = useState(false);
    const [isLanguageVisible, setIsLanguageVisible] = useState(false)


    const handleLogout = () => {

        dispatch(userSliceActions.logout(true))

        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: "Tab" }
                ]
            })
        );

        setIsLogoutVisible(false);
    }
    
    return(
        <SafeAreaView style={styles.container}>

            <View style={{marginTop: 50, alignItems: "center"}}>
                <Text style={styles.titleText}>Settings</Text>
                <View style={{backgroundColor:LIGHT_GRAY, height:1, width:width*8/10, alignSelf:"center", marginTop:5}}/>

            </View>

            <View style={styles.cardView}>

                <TouchableOpacity onPress={() => navigation.navigate("UpdateProfile")} style={styles.cardStyle}>
                    <Text style={styles.cardText}>Profile Update</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardStyle} onPress={() => setIsLanguageVisible(true)}>
                <Text style={styles.cardText}>Change Language</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardStyle} onPress={() => navigation.navigate("Favorites")}>
                <Text style={styles.cardText}>Favorites</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardStyle} onPress={() => navigation.navigate("UpdatePassword")}>
                <Text style={styles.cardText}>Update Password</Text>
                </TouchableOpacity>

            </View>

            <TouchableOpacity style={styles.logoutView} onPress={() => setIsLogoutVisible(true)}>
                <Text style={{fontSize: 16, fontWeight:"600", color:WHITE}}>Log Out</Text>
            </TouchableOpacity>

            <Actionsheet isOpen={isLogoutVisible} onClose={() => setIsLogoutVisible(false)}>
                <Actionsheet.Content>
                    <Actionsheet.Item>
                        <View style={styles.logoutConfirmArea}>

                            <TouchableOpacity style={{marginVertical: 18, backgroundColor: LIGHT_GRAY, 
                            paddingVertical:5, paddingHorizontal:18, borderRadius: 25}} onPress={handleLogout}>
                                <Text style={{...styles.logoutText, color:PINK, fontWeight:"400"}}>Çıkış Yap</Text>
                            </TouchableOpacity>

                            <View style={{height:1, width:"90%", backgroundColor: LIGHT_GRAY}}/>

                            <TouchableOpacity style={{marginTop: 20}} onPress={() => setIsLogoutVisible(false)}>
                            <Text style={{...styles.logoutText, color:"black", fontWeight: "600"}}>Vazgeç</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>

            <ChangeLanguage isModalVisible={isLanguageVisible} setIsModalVisible={setIsLanguageVisible}/>



        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:WHITE
    },
    titleText:{
        fontSize:18,
        fontWeight:"300"
    },
    cardView:{
        marginTop:30
    },
    cardStyle:{
        width: "85%",
        alignSelf: "center",
        alignItems: "center",
        paddingVertical: 13,
        marginVertical: 13,
        borderRadius: 25,
        backgroundColor: "#e0e0e0"
    },
    cardText:{
        fontSize: 16,
        fontWeight:"600"
    },
    logoutView:{
        alignItems: "center", 
        position: "absolute", 
        bottom: 30, 
        alignSelf: "center",
        paddingVertical: 10,
        paddingHorizontal:45,
        borderRadius: 25,
        backgroundColor: PINK
    },
    logoutConfirmArea:{
        alignItems: 'center',   
        justifyContent: 'center',   
        width: Dimensions.get("screen").width-45,
        alignSelf: "center",
        marginRight: 10
    },
    logoutText: {
        fontSize: 17,
        fontWeight: "400"   
    },
})