import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from '../components/Divider';
import { TopHeader } from '../components/Header';
import useI18n from "../hooks/useI18n";
import { BORDER_RADIUS_1, CONTAİNER_HORİZONTAL, LIGHT_GRAY_2, WHITE } from "../utils/utils";

export default function AccountScreen(){

    const navigation = useNavigation<any>();
    const {t} = useI18n("SettingsScreen");
    const width = Dimensions.get("screen").width;


    return(
        <View style={styles.container}>
             <View style={{marginTop: 50, alignItems: "center"}}>
                <TopHeader title={t("account")}/>
                <Divider height={1} width={width*8/10} style={{alignSelf:"center", marginTop:5}}/>
            </View>

            <TouchableOpacity onPress={() => navigation.push("UpdateProfile")} style={styles.cardStyle}>
                <Ionicons name="person-circle" size={24} color="black" />
                <View style={{marginLeft:15}}>
                    <Text style={styles.cardText}>{t("profile_update_btn_txt")}</Text>
                    <Text style={styles.subCardText}>{t("profile_update_info")}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("UpdatePassword")} style={styles.cardStyle}>
                <MaterialIcons name="password" size={24} color="black" />
                    <View style={{marginLeft:15}}>
                        <Text style={styles.cardText}>{t("password_update_btn_txt")}</Text>
                        <Text style={styles.subCardText}>{t("password_update_info")}</Text>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("UpdatePassword")} style={styles.cardStyle}>
            <MaterialCommunityIcons name="progress-close" size={24} color="black" />
                    <View style={{marginLeft:15}}>
                        <Text style={styles.cardText}>{t("close_account")}</Text>
                        <Text style={styles.subCardText}>{t("close_account_info")}</Text>
                    </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:WHITE,
        paddingHorizontal:CONTAİNER_HORİZONTAL
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
})