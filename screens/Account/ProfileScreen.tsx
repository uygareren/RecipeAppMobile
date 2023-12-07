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

            <View style={{borderWidth:1, borderColor:"black"}}>
                <View style={{borderWidth:1, borderColor:"black",width: width/3, height:height/6, borderRadius:180, alignItems:"center",
            justifyContent:"center", alignSelf:"center", marginTop:20}}>
                    <Image source={require("../../assets/images/default_profile.jpg")} style={{width: width/3, height:height/6, borderRadius:180}}/>
                </View>
                <Text style={{alignSelf:"center",fontSize:20, fontWeight:"500", marginVertical:18}}>Name Surname</Text>
            </View>

            <View style={{borderWidth:1, borderColor:"black"}}>
                {/* CARD SECTİON  (Horizontal posts section)*/}

                <Text style={{marginTop:10, marginLeft:15, fontSize:19, fontWeight:"600"}}>My Posts</Text>

            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: WHITE
    }
})