import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { BLACK_COLOR, GRAY, LIGHT_GRAY, LIGHT_GRAY_2, LIGHT_RED, WHITE } from "../utils/utils";
import { RecipeDetailHeader, SettingsHeader } from "../components/Header";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import { MaterialIcons } from '@expo/vector-icons';
import { Ingredients } from "../components/RecipeDetailComponents/Ingredients";
import { Instructions } from "../components/RecipeDetailComponents/Instructions";
import { Comments } from "../components/RecipeDetailComponents/Comments";


export default function RecipeDetailScreen({}){

    const {width, height} = Dimensions.get("screen");
    const [isLike, setisLike] = useState(false)
    const [index, setIndex] = useState(0);



    return(
        <ScrollView style={styles.container}>
            <View style={{ marginTop: 40 }}>
                <Image source={require("../assets/images/default_recipe.jpeg")} style={{ width: "100%", height: height * 4 / 10, resizeMode: "cover" }} />
                <Pressable style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection:"row",justifyContent: 'space-between', 
                alignItems: 'flex-start', paddingHorizontal: 16 }}>
                    <TouchableOpacity style={{backgroundColor:LIGHT_GRAY_2, marginTop:10, borderRadius:180, paddingHorizontal:4, paddingVertical:4}}>
                        <Feather name="arrow-left" size={20} color={GRAY} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setisLike(!isLike)} style={{backgroundColor:LIGHT_GRAY_2, marginTop:10, 
                        borderRadius:180, paddingHorizontal:4, paddingVertical:4,alignItems:"center", justifyContent:"center"}}>
                        {isLike ? <AntDesign name="heart" size={20} color={LIGHT_RED} /> 
                        : 
                        <AntDesign name="hearto" size={20} color={LIGHT_RED}/>}
                    </TouchableOpacity>

                </Pressable>
            </View>

            {/* WHITE CARD */}

            <View style={{marginTop:-40,width:width*8/10, borderRadius:15,alignSelf:"center", backgroundColor:WHITE, paddingHorizontal:15,
        paddingVertical:10, ...styles.shadow }}>
                <Text style={{fontSize:20, fontWeight:"600"}}>Pizza</Text>
                <View style={{marginVertical:6, flexDirection:"row", alignItems:"center",}}>
                    <AntDesign name="heart" size={12} color={LIGHT_RED} />
                    <Text style={{marginLeft:6, fontSize:12, fontWeight:"300"}}>250 Likes</Text>
                </View>
                <View style={{backgroundColor:LIGHT_GRAY, height:1, width:"100%", alignSelf:"center", marginTop:8}}/>

                <View style={{flexDirection:"row", justifyContent:"space-around",paddingHorizontal:5, paddingVertical:10}}>
                    <View style={{backgroundColor:LIGHT_GRAY_2,alignItems:"center", justifyContent:"center", width:width/7, paddingVertical:8,
                borderRadius:15}}>
                        <AntDesign name="clockcircleo" size={24} color="black" />
                        <Text style={{marginTop:8, fontSize:12, fontWeight:"700"}}>10 min</Text>
                    </View>
                    <View style={{backgroundColor:LIGHT_GRAY_2,alignItems:"center", justifyContent:"center", width:width/7, paddingVertical:8,
                borderRadius:15}}>
                        <MaterialIcons name="fastfood" size={24} color="black" />
                        <Text style={{marginTop:8, fontSize:12, fontWeight:"700"}}>340 cal</Text>
                    </View>
                    <View style={{backgroundColor:LIGHT_GRAY_2,alignItems:"center", justifyContent:"center", width:width/7, paddingVertical:8,
                borderRadius:15}}>
                        <MaterialIcons name="workspaces-outline" size={24} color="black" />
                        <Text style={{marginTop:8, fontSize:12, fontWeight:"700"}}>Easy</Text>
                    </View>
                </View>

            </View>

            <View style={{width:"100%", marginTop:20, backgroundColor:LIGHT_GRAY_2, borderRadius:15}}>
                {/* SELECT SECTİON */}
                <View style={{flexDirection:"row", justifyContent:"space-around", paddingVertical:15}}>
                    <TouchableOpacity onPress={() => setIndex(0)} style={{alignItems:"center"}}>
                        <Text style={{fontSize:16, fontWeight:index == 0 ? "500": "300"}}>Ingredients</Text>
                        <View style={{width:width*1.7/10, height:2, backgroundColor: index == 0 ? LIGHT_RED : LIGHT_GRAY_2 , marginTop:4}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIndex(1)} style={{alignItems:"center"}}>
                        <Text style={{fontSize:16, fontWeight:index == 1 ? "500": "300"}}>Instructions</Text>
                        <View style={{width:width*1.7/10, height:2, backgroundColor: index == 1 ? LIGHT_RED : LIGHT_GRAY_2 , marginTop:4}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIndex(2)} style={{alignItems:"center"}}>
                        <Text style={{fontSize:16, fontWeight:index == 2 ? "500": "300"}}>Comments</Text>
                        <View style={{width:width*1.7/10, height:2, backgroundColor: index == 2 ? LIGHT_RED : LIGHT_GRAY_2 , marginTop:4}}/>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={{ width: "100%", paddingVertical:15, paddingHorizontal:0}}>
                {index === 0 && <Ingredients />}
                {index === 1 && <Instructions />}
                {index === 2 && <Comments />}
            </View>


        </ScrollView>
    )

   
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:WHITE,
        paddingHorizontal:20
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