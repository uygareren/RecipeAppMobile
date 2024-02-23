import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { GRAY, LIGHT_GRAY_2 } from "../../utils/utils";
import { TextInputComp } from "../Inputs";
import { useState } from "react";
import { Pressable } from "react-native";
import { FontAwesome } from '@expo/vector-icons';


export function Comments(){

    const [comment, setComment] = useState("");

    return(
        <View style={{width:"100%", paddingVertical:10}}>
            <ScrollView>
                <View style={{marginVertical:4, paddingVertical:4,}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{fontSize:11, fontWeight:"700"}}>İbrahim Karatay</Text>
                        <Text style={{fontSize:12, color:GRAY, marginLeft:7, fontWeight:"600"}}>15dk</Text>
                    </View>
                    <Text style={{fontSize:13,marginTop:3}}>Çok Güzel Yemek!!</Text>
                </View>
                <View style={{marginVertical:4, paddingVertical:4,}}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{fontSize:11, fontWeight:"700"}}>İbrahim Karatay</Text>
                            <Text style={{fontSize:12, color:GRAY, marginLeft:7, fontWeight:"600"}}>15dk</Text>
                        </View>
                        <Text style={{fontSize:13,marginTop:3}}>Çok Güzel Yemek!!</Text>
                </View>
                <View style={{marginVertical:4, paddingVertical:4,}}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{fontSize:11, fontWeight:"700"}}>İbrahim Karatay</Text>
                            <Text style={{fontSize:12, color:GRAY, marginLeft:7, fontWeight:"600"}}>15dk</Text>
                        </View>
                        <Text style={{fontSize:13,marginTop:3}}>Çok Güzel Yemek!!</Text>
                </View>
                <View style={{marginVertical:4, paddingVertical:4,}}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{fontSize:11, fontWeight:"700"}}>İbrahim Karatay</Text>
                            <Text style={{fontSize:12, color:GRAY, marginLeft:7, fontWeight:"600"}}>15dk</Text>
                        </View>
                        <Text style={{fontSize:13,marginTop:3}}>Çok Güzel Yemek!!</Text>
                </View>
                <View style={{marginVertical:4, paddingVertical:4,}}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{fontSize:11, fontWeight:"700"}}>İbrahim Karatay</Text>
                            <Text style={{fontSize:12, color:GRAY, marginLeft:7, fontWeight:"600"}}>15dk</Text>
                        </View>
                        <Text style={{fontSize:13,marginTop:3}}>Çok Güzel Yemek!!</Text>
                </View>
                <View style={{marginVertical:4, paddingVertical:4,}}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{fontSize:11, fontWeight:"700"}}>İbrahim Karatay</Text>
                            <Text style={{fontSize:12, color:GRAY, marginLeft:7, fontWeight:"600"}}>15dk</Text>
                        </View>
                        <Text style={{fontSize:13,marginTop:3}}>Çok Güzel Yemek!!</Text>
                </View>
                
            </ScrollView>

            <View style={{marginTop: 10,flexDirection: "row", alignItems:"center"}}>
                <TextInputComp
                    isTextArea={true}
                    value={comment}
                    onchangeValue={setComment}
                    placeholder="Yorum Ekle"
                    styleContainer={{width: Dimensions.get("screen").width * 7.8 / 10,}}
                    styleInputContainer={{ borderRadius: 15, }}
                    styleInput={{
                        width: Dimensions.get("screen").width * 7.8 / 10,
                        paddingVertical: 13,
                        paddingHorizontal: 7,
                        backgroundColor: LIGHT_GRAY_2,
                        borderRadius: 15,
                    }}
                />
                <TouchableOpacity style={{marginLeft:10}}>
                    <FontAwesome name="send" size={24} color="black" />
                </TouchableOpacity>
            </View>

        </View>
    )
}