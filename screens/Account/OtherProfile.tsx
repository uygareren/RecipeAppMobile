import { Image, SafeAreaView, StyleSheet, Text, View, Pressable, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { BLACK_COLOR, LIGHT_GRAY, MAIN_COLOR, PINK, WHITE } from "../../utils/utils";
import { useState } from "react";
import { GoBackHeader, TopHeader } from "../../components/Header";


export default function OtherProfile(){

    const {width} = Dimensions.get("screen");

    const [isFollow, setIsFollow] = useState(false);

    return(
        <ScrollView style={{flex:1, backgroundColor:WHITE}}>

            <View>
                <GoBackHeader goBackPress={() => console.log("Go back Tıklandı")}/>
            </View>

            {/* PROFİLE İMAGE*/}
            <View>
                <View style={{borderWidth:3, borderColor:BLACK_COLOR,marginTop:10, width:width*2.7/10, height:width*2.7/10, alignSelf:"center",
            borderRadius:180, alignItems:"center", justifyContent:"center"}}>
                    <Image source={require("../../assets/images/default_profile.jpg")} style={{width: width*2.5/10, height:width*2.5    /10, 
                    borderRadius:180}}/>
                </View>


                {/* NAME, CİTY AREA  */}
                <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-between",marginTop:15, paddingHorizontal:40}}>
                    <View style={{alignItems:"center"}}>
                        <Text style={{fontSize:17, fontWeight:"600", marginTop:10}}>İbrahim Karatay </Text>
                        <Text style={{fontSize:14, fontWeight:"300", marginTop:2}}>Diyarbakır </Text>
                    </View>
                    <TouchableOpacity onPress={() => setIsFollow(!isFollow)} style={{
                    backgroundColor:LIGHT_GRAY,paddingHorizontal:15, paddingVertical:8, borderRadius:12}}>
                        <Text style={{fontSize:12, fontWeight:"400"}}>{isFollow ? "Takip Ediliyor" : "Takip Et"}</Text>
                    </TouchableOpacity>
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
            <View style={{ marginTop:20, width:width*8/10, alignSelf:"center", alignItems:"center", 
            justifyContent:"center"}}>
                <Text style={{textAlign:"center", fontWeight:"300"}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                standard dummy text ever since the 1500s, 
                </Text>
            </View>

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
        marginTop: 50,
        marginHorizontal: 20,

        
    },
    follow_btn:{
        backgroundColor:PINK, 
        width:Dimensions.get("screen").width*5/10, 
        alignItems:"center", 
        justifyContent:"center",
        paddingVertical:10, 
        borderRadius:12,

        
    },
    shadow:{
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5
    }

})