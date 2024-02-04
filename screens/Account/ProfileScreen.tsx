import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { TabAccountScreenProps } from "../../navigations/ProfileNavigation";
import { WHITE } from "../../utils/utils";
import { SettingsHeader } from "../../components/Header";


export default function ProfileScreen({navigation, route}: TabAccountScreenProps<"Profile">){

    const width = Dimensions.get("screen").width
    const height = Dimensions.get("screen").height

    return(
        <View style={styles.container}>

            <View style={{marginTop: 40}}>
                <SettingsHeader/>
            </View>
            
            <View style ={styles.profile_card_container}>
                <View style={{width:80, height:80, }}>
                    <Image source={require("../../assets/images/default_profile.jpg")} style={{width: 80, height:80, borderRadius:180}}/>
                </View>

                <View style={{ marginLeft:20, justifyContent:"center"}}>
                    <Text style={{fontWeight:"600", fontSize:18}}>Uygar EREN</Text>
                </View>

            </View>


        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: WHITE
    },
    profile_card_container:{
        flexDirection: "row",
        borderRadius: 12,
        paddingLeft: 20,
        paddingVertical: 10,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 25,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Android için
        }
})