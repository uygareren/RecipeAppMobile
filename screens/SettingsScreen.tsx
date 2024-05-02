import { CommonActions, useNavigation } from "@react-navigation/native";
import { Actionsheet } from "native-base";
import { useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { ButtonComp } from "../components/Button";
import { Divider } from "../components/Divider";
import { ChangeLanguage } from "../components/Modals/ChangeLanguageModal";
import useI18n from "../hooks/useI18n";
import { userSliceActions } from "../store/reducer/userSlice";
import { authButtonContainer, authTextButton } from "../styles/styles";
import { LIGHT_GRAY, PINK, WHITE } from "../utils/utils";


export default function SettingsScreen(){

    const {t} = useI18n("SettingsScreen");

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
                <Text style={styles.titleText}>{t("settings")}</Text>
                <Divider height={1} width={width*8/10} style={{alignSelf:"center", marginTop:5}}/>

            </View>

            <View style={styles.cardView}>

                <TouchableOpacity onPress={() => navigation.push("UpdateProfile")} style={styles.cardStyle}>
                    <Text style={styles.cardText}>{t("profile_update_btn_txt")}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardStyle} onPress={() => setIsLanguageVisible(true)}>
                <Text style={styles.cardText}>{t("change_language_btn_txt")}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardStyle} onPress={() => navigation.navigate("Favorites")}>
                <Text style={styles.cardText}>{t("favorite")}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardStyle} onPress={() => navigation.navigate("UpdatePassword")}>
                <Text style={styles.cardText}>{t("password_update_btn_txt")}</Text>
                </TouchableOpacity>

            </View>

            <ButtonComp title={t("logout_btn_txt")} onPress={() => setIsLogoutVisible(true)} styleContainer={{...authButtonContainer, 
                position: "absolute", bottom:50
            }}
            styleText={{...authTextButton}}/>

            <Actionsheet isOpen={isLogoutVisible} onClose={() => setIsLogoutVisible(false)}>
                <Actionsheet.Content>
                    <Actionsheet.Item>
                        <View style={styles.logoutConfirmArea}>

                            <TouchableOpacity style={{marginVertical: 5, backgroundColor: LIGHT_GRAY, 
                            paddingVertical:5, paddingHorizontal:18, borderRadius: 25}} onPress={handleLogout}>
                                <Text style={{...styles.logoutText, color:PINK, fontWeight:"500"}}>{t("logout_btn_txt")}</Text>
                            </TouchableOpacity>

                            <Divider height={1} width={"90%"}/>

                            <TouchableOpacity style={{marginTop: 20}} onPress={() => setIsLogoutVisible(false)}>
                            <Text style={{...styles.logoutText, color:"black", fontWeight: "600"}}>{t("cancel")}</Text>
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