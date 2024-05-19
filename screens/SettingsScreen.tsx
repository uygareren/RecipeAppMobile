import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Actionsheet } from "native-base";
import { useState } from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ButtonComp } from "../components/Button";
import { Divider } from "../components/Divider";
import { TopHeader } from "../components/Header";
import { ChangeLanguage } from "../components/Modals/ChangeLanguageModal";
import useI18n from "../hooks/useI18n";
import { userSliceActions } from "../store/reducer/userSlice";
import { RootStateType } from '../store/store';
import { authButtonContainer, authTextButton } from "../styles/styles";
import { BORDER_RADIUS_1, CONTAİNER_HORİZONTAL, GRAY, LIGHT_GRAY_2, LIGHT_RED_2, PINK, WHITE } from "../utils/utils";

export default function SettingsScreen(){

    const API = process.env.API;

    const {t} = useI18n("SettingsScreen");

    const width = Dimensions.get("screen").width;

    const navigation = useNavigation<any>();
    const dispatch = useDispatch();

    const [isLogoutVisible, setIsLogoutVisible] = useState(false);
    const [isLanguageVisible, setIsLanguageVisible] = useState(false);

    const userInfo = useSelector((state:RootStateType) => state.user.userInfo);
    console.log("userınof", userInfo);


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
                <TopHeader title={t("settings")}/>
                <Divider height={1} width={width*8/10} style={{alignSelf:"center", marginTop:5}}/>
            </View>

            <View style={{flexDirection:"row", marginTop:20, paddingVertical:10, paddingHorizontal:12, 
            borderRadius:BORDER_RADIUS_1, backgroundColor:"#f0f4fa" }}>
                <View style={{width:width*0.25, height:width*0.25, borderWidth:2, borderColor:GRAY, 
                    borderRadius:360, alignItems:"center", justifyContent:"center"}}>
                    {userInfo?.image ? (
                        <Image source={{uri: `${API}/images/${userInfo.image}`}} 
                    style={{width:width*0.24, height:width*0.24, borderRadius:360}}/>
                    ):(
                        <Image source={require('../assets/images/default_profile.jpg')} 
                        style={{width:width*0.24, height:width*0.24, borderRadius:360}}/>
                    )}
                    
                </View>
                <View style={{ width:width*0.6, paddingHorizontal:25, justifyContent:"center"}}>
                    <Text style={{fontSize:16, fontWeight:"600"}}>{userInfo.name} {userInfo.surname}</Text>
                    <View style={{marginTop:5}}>
                        <Text style={{fontSize:12, fontWeight:"300"}}>{userInfo.email}</Text>
                    </View>
                </View>

            </View>
                

                <TouchableOpacity onPress={() => navigation.navigate("Account")} style={styles.cardStyle}>
                <MaterialCommunityIcons name="account-cog" size={24} color="black" />
                    <View style={{marginLeft:15}}>
                        <Text style={styles.cardText}>{t("account")}</Text>
                        <Text style={styles.subCardText}>{t("account_info")}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsLanguageVisible(true)} style={styles.cardStyle}>
                <FontAwesome name="language" size={24} color="black" />
                    <View style={{marginLeft:15}}>
                        <Text style={styles.cardText}>{t("change_language_btn_txt")}</Text>
                        <Text style={styles.subCardText}>{t("change_language_info")}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Favorites")} style={styles.cardStyle}>
                <AntDesign name="like1" size={24} color="black" />
                    <View style={{marginLeft:15}}>
                        <Text style={styles.cardText}>{t("like")}</Text>
                        <Text style={styles.subCardText}>{t("like_info")}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.push("DoneMeals")} style={styles.cardStyle}>
                <Ionicons name="checkmark-done-sharp" size={24} color="black" />
                    <View style={{marginLeft:15}}>
                        <Text style={styles.cardText}>{t("done_meals")}</Text>
                        <Text style={styles.subCardText}>{t("done_meals_info")}</Text>
                    </View>
                </TouchableOpacity>
               
            <View>

            </View>

            {/* <View style={styles.cardView}>

                <TouchableOpacity onPress={() => navigation.push("UpdateProfile")} style={styles.cardStyle}>
                    <Text style={styles.cardText}>{t("profile_update_btn_txt")}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardStyle} onPress={() => setIsLanguageVisible(true)}>
                <Text style={styles.cardText}>{t("change_language_btn_txt")}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardStyle} onPress={() => navigation.navigate("Favorites")}>
                <Text style={styles.cardText}>{t("favorite")}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardStyle} onPress={() => navigation.push("DoneMeals")}>
                <Text style={styles.cardText}>{t("done_meals")}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardStyle} onPress={() => navigation.navigate("UpdatePassword")}>
                <Text style={styles.cardText}>{t("password_update_btn_txt")}</Text>
                </TouchableOpacity>

            </View> */}

            <ButtonComp title={t("logout_btn_txt")} onPress={() => setIsLogoutVisible(true)} 
            styleContainer={{...authButtonContainer,position: "absolute", bottom:50, borderRadius:BORDER_RADIUS_1, 
            backgroundColor:LIGHT_RED_2
            }}
            styleText={{...authTextButton}}/>

            <Actionsheet isOpen={isLogoutVisible} onClose={() => setIsLogoutVisible(false)}>
                <Actionsheet.Content>
                    <Actionsheet.Item>
                        <View style={styles.logoutConfirmArea}>

                            <TouchableOpacity style={{marginVertical: 5, 
                            paddingVertical:5, paddingHorizontal:18, borderRadius: 25}} onPress={handleLogout}>
                                <Text style={{...styles.logoutText, color:LIGHT_RED_2, fontWeight:"600"}}>{t("logout_btn_txt")}</Text>
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
        backgroundColor:WHITE,
        paddingHorizontal:CONTAİNER_HORİZONTAL
    },
    titleText:{
        fontSize:18,
        fontWeight:"300"
    },
    cardView:{
        marginTop:30
    },
    cardStyle:{
        flexDirection:'row',
        alignItems:'center',
        width: "100%",
        paddingVertical: 13,
        paddingHorizontal:15,
        marginVertical: 12,
        borderRadius: BORDER_RADIUS_1,
        backgroundColor: LIGHT_GRAY_2
    },
    cardText:{
        fontSize: 16,
        fontWeight:"500",
    },
    subCardText:{
        fontSize:11,
        fontWeight:'200',
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