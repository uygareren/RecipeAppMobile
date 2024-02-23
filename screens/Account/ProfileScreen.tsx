import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TabAccountScreenProps } from "../../navigations/ProfileNavigation";
import { BLACK_COLOR, LIGHT_GRAY, WHITE } from "../../utils/utils";
import { GoBackHeader, SettingsHeader } from "../../components/Header";
import { useSelector } from "react-redux";


export default function ProfileScreen({navigation, route}: TabAccountScreenProps<"Profile">){

    const width = Dimensions.get("screen").width
    const height = Dimensions.get("screen").height

    const userInfo = useSelector((state:any) => state.user.userInfo);
    console.log("userınfoo", userInfo);

    return(
        <ScrollView style={{flex:1, backgroundColor:WHITE}}>

            <View>
                <SettingsHeader />
            </View>

            {/* PROFİLE İMAGE*/}
            <View>
                <View style={{borderWidth:3, borderColor:BLACK_COLOR,marginTop:30, width:width*2.7/10, height:width*2.7/10, alignSelf:"center",
            borderRadius:180, alignItems:"center", justifyContent:"center"}}>
                    <Image source={require("../../assets/images/default_profile.jpg")} style={{width: width*2.5/10, height:width*2.5    /10, 
                    borderRadius:180}}/>
                </View>

                {/* NAME, CİTY AREA  */}
                <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontSize:17, fontWeight:"600", marginTop:10}}>{`${userInfo?.name} ${userInfo?.surname}`}</Text>
                    {userInfo?.city ? (<Text style={{fontSize:14, fontWeight:"300", marginTop:2}}>{userInfo?.city}</Text>): 
                    null}
                    
                </View>
            </View>

            {/* FOLLOWİNG INFO AREA */}
            <View style={{marginTop:20, width:width*8/10, alignSelf:"center", flexDirection:"row",
            justifyContent:"space-between", alignItems:"center"}}>
                <View style={{width:width*2.5/10,paddingVertical:10, alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontSize:19, fontWeight:"600", marginBottom:4}}>580</Text>
                    <Text style={{fontSize:14, fontWeight:"300"}}>Recipes</Text>
                </View>
                <View style={{borderWidth:1, borderColor:LIGHT_GRAY, height:40}}/>
                <View style={{width:width*2.5/10,paddingVertical:10, alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontSize:19, fontWeight:"600", marginBottom:4}}>800</Text>
                    <Text style={{fontSize:14, fontWeight:"300"}}>Following</Text>
                </View>
                <View style={{borderWidth:1, borderColor:LIGHT_GRAY, height:40}}/>
                <View style={{width:width*2.5/10,paddingVertical:10, alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontSize:19, fontWeight:"600", marginBottom:4}}>900</Text>
                    <Text style={{fontSize:14, fontWeight:"300"}}>Followers</Text>
                </View>

            </View>

            {/* BIOGRAPHI AREA */}
            {userInfo?.biography ? (
                <View style={{borderWidth:1, borderColor:"black", marginTop:20, width:width*8/10, alignSelf:"center", alignItems:"center", 
                justifyContent:"center"}}>
                    <Text style={{textAlign:"center", fontWeight:"300"}}>{userInfo?.biography}</Text>
            </View>
            ): null}
            

            {/* POST AREA */}
            <View style={{borderWidth:1, borderColor:BLACK_COLOR, marginTop:20, paddingHorizontal:10}}>

            </View>

            

        </ScrollView>
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
});