import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Loading } from "../components/Loading";
import useI18n from "../hooks/useI18n";
import { getFollowing } from "../services/ApiService";
import { BLACK_COLOR, LIGHT_GRAY, WHITE } from "../utils/utils";


export default function FollowScreen({route}:any){

    const {t} = useI18n("FollowScreen");

    const {width, height} = Dimensions.get("screen");

    const navigation = useNavigation<any>()

    const visible_id = route.params.id;
    const user_id = route.params.user_id

    const userInfo = useSelector((state: any) => state.user.userInfo);
    const userId = userInfo?.userId;

    const selectedUserId = user_id || userId;


    const [visible, setVisible] = useState<number>(visible_id);



    const {data, isLoading} = useQuery(
        ["get_following"],
        () => getFollowing(selectedUserId)
    );

    console.log("data", data);

    const RenderItem = ({item}:any) => {
        return(
            <Pressable onPress={() => navigation.navigate("OtherProfile", {id:item?._id})} style={{flexDirection:"row", marginBottom:15}}>
                <View style={{width:width*0.12, height:width*0.12, borderRadius:180, justifyContent:"center"}}>
                    <Image style={{width:width*0.12, height:width*0.12, borderRadius:180}}
                        source={require('../assets/images/default_profile.jpg')}/>
                </View>

                <View style={{marginLeft:20, width:width*0.75, justifyContent:"center"}}>
                    <Text style={{fontWeight:"400", fontSize:14}}>{`${item?.name} ${item?.surname}`}</Text>
                </View>
            </Pressable>
        )
    }


    const FollowedComponent = () => {
        return(
            <View style={{ marginTop:20, paddingHorizontal:10, paddingVertical:10 }}>
                {data == undefined ? null : (
                    <FlatList
                    data={data?.data?.followed}
                    keyExtractor={(item)=> item?._id.toString()}
                    renderItem={RenderItem}
                />  
                )}            
            </View>
        )
    } 

    const FollowerComponent = () => {
        return(
            <View style={{marginTop:20, marginHorizontal:10}}>
                {data == undefined ? null : (
                    <FlatList
                    data={data?.data?.follower}
                    keyExtractor={(item)=> item?._id.toString()}
                    renderItem={RenderItem}
                />  
                )}
                
            </View>
        )
    } 

    return(
        <ScrollView style={{flex:1, backgroundColor:WHITE}}>
            <View style={{ marginTop:50}}>
                <View style={{flexDirection:"row", justifyContent:"space-evenly",}}>

                    <TouchableOpacity onPress={() => setVisible(0)} style={{paddingVertical:10, paddingHorizontal:8, 
                    alignItems:"center", justifyContent:"center"}}>
                        <View style={{alignItems:"center", width:width*0.3}}>
                            <Text style={{fontWeight:"700", fontSize:16}}>{t("following")}</Text>
                            {visible == 0 ? (
                                <View style={{height: 2, backgroundColor:BLACK_COLOR, width:width*0.3, marginTop:5}}/>                        
                            ):null}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setVisible(1)} style={{paddingVertical:10, paddingHorizontal:8, 
                    alignItems:"center", justifyContent:"center"}}>
                        <View style={{alignItems:"center", width:width*0.3}}>
                            <Text style={{fontWeight:"700", fontSize:16}}>{t("follower")}</Text>
                            {visible == 1 ? (
                                <View style={{height: 2, backgroundColor:BLACK_COLOR, width:width*0.3, marginTop:5}}/>                        
                            ):null}
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={{height:1, backgroundColor:LIGHT_GRAY, marginTop:-10}}/>

                {isLoading ? (
                    <Loading/>
                    ) : (
                    visible === 0 ? (
                        <FollowedComponent />
                    ) : (
                        <FollowerComponent />
                    )
                )}

                


                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

})