import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { GoBackHeader } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { RecipeRenderComponent } from "../../components/Render/RecipeRenderComponent";
import useI18n from "../../hooks/useI18n";
import { addFollowed, getFollowing, getRecipeByUserId, getUserDetail, removeFollowed } from "../../services/ApiService";
import { BLACK_COLOR, LIGHT_GRAY, PINK, WHITE } from "../../utils/utils";


export default function OtherProfile({route}:any){

    const API = process.env.API;

    const {t} = useI18n("OtherProfile");

    const id = route.params.id;

    console.log("id", id);

    const navigation = useNavigation<any>()

    const {width} = Dimensions.get("screen");

    const userInfo = useSelector((state:any) => state.user.userInfo);

    const [FollowerCount, setFollowerCount] = useState(0)
    const [isFollow, setIsFollow] = useState(false);

    console.log("isfollowe", isFollow);


    const user_detail = useQuery(
        ['get_user_detail', id],
        () => getUserDetail(id),
    );

    console.log("user detail", user_detail);

    const recipeResponse = useQuery(
        {queryKey:["get_recipe_by_userid"],
        queryFn:() => getRecipeByUserId({user_id:id})}
        
    )

    const {data, isLoading, isSuccess} = useQuery({
        queryKey:["get_following"],
        queryFn:()=>getFollowing(id),
        staleTime:100
    })

    const follower_data = data?.data?.follower
    const followed_data = data?.data?.followed


    // TAKİPÇİ EKLEME 
    const followMutation = useMutation({
        mutationKey:["add_followed"],
        mutationFn:addFollowed,
        onSuccess: () => {
            setIsFollow(true);
            setFollowerCount((prev) => prev+ 1);
        }
    });
    const removeFollowedMutation = useMutation({
        mutationKey:["remove_followed"],
        mutationFn:removeFollowed,
        onSuccess: () => {

            console.log("sdsdsd")
            console.log("successs remove followed");
            setIsFollow(false);
            setFollowerCount((prev) => prev-1);
        }
    });

    useEffect(() => {
        if (data?.data?.follower.length > 0) {
            console.log("follower data : ",data?.data?.follower)
          setFollowerCount(data?.data?.follower?.length);
          setIsFollow(data?.data?.follower.filter((v:any) => v?._id == userInfo.userId) ? true : false)
          console.log("ischeckk", data?.data?.follower.filter((v:any) => v?._id == userInfo.userId) ? true : false)
        }else{
            setIsFollow(false);
        }
      }, []);
    

    async function handleFollow() {
        if(!isFollow){
            
            followMutation.mutate({user_id:userInfo?.userId, followed_id:id})
        }else{
            removeFollowedMutation.mutate({user_id:userInfo?.userId, followed_id:id});
        }

    }

    // useEffect(() => {
    //   follower_data?.map((item:any) => item?._id == userInfo?.userId ? setIsFollow(true): setIsFollow(false))
    // }, [])
    

    if(isLoading){
        return(
            <Loading/>
        )
    }
    

    return(
        <ScrollView style={{flex:1, backgroundColor:WHITE}}>

            <View>
                <GoBackHeader goBackPress={() => navigation.goBack()}/>
            </View>

            {/* PROFİLE İMAGE*/}
            <View>
                <View style={{borderWidth:1, borderColor:BLACK_COLOR,marginTop:10, width:width*2.7/10, height:width*2.7/10, alignSelf:"center",
            borderRadius:180, alignItems:"center", justifyContent:"center"}}>
                    {user_detail?.data?.user?.image == null ? (
                        <Image source={require('../../assets/images/default_profile.jpg')} style={{width: width*2.5/10, height:width*2.5    /10, 
                    borderRadius:180}}/>
                    ): (
                        <Image source={{uri: `${API}/images/${user_detail?.data?.user?.image}`}} style={{width: width*2.5/10, height:width*2.5    /10, 
                        borderRadius:180}}/>
                    )}
                    
                </View>


                {/* NAME, CİTY AREA  */}
                <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-between",marginTop:15, paddingHorizontal:40}}>
                    <View style={{alignItems:"center"}}>
                        <Text style={{fontSize:17, fontWeight:"600", marginTop:10}}>{`${user_detail?.data?.user?.name} ${user_detail?.data?.user?.surname}`}</Text>
                        {user_detail?.data?.user?.city ? (
                        <Text style={{fontSize:14, fontWeight:"300", marginTop:2}}>{user_detail?.data?.user?.city}, {user_detail?.data?.user?.country} </Text>

                        ):null}
                    </View>
                    <TouchableOpacity onPress={() => handleFollow()} style={{
                    backgroundColor:LIGHT_GRAY,paddingHorizontal:15, paddingVertical:8, borderRadius:12}}>
                        <Text style={{fontSize:12, fontWeight:"400"}}>{isFollow ? t("keep_following") : t("follow")}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* FOLLOWİNG INFO AREA */}
            <View style={{marginTop:20, width:width*8/10, alignSelf:"center", flexDirection:"row",
            justifyContent:"space-between", alignItems:"center"}}>
                <View style={{width:width*2.5/10,paddingVertical:10, alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontSize:19, fontWeight:"600", marginBottom:4}}>{recipeResponse?.data?.data.length ?? "0"}</Text>
                    <Text style={{fontSize:14, fontWeight:"300"}}>{t("recipes")}</Text>
                </View>
                <View style={{borderWidth:1, borderColor:LIGHT_GRAY, height:40}}/>

                <TouchableOpacity onPress={() => navigation.navigate("Follow", {user_id:id, id:0})} style={{width:width*2.5/10,paddingVertical:10, alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontSize:19, fontWeight:"600", marginBottom:4}}>{followed_data?.length ?? "0"}</Text>
                    <Text style={{fontSize:14, fontWeight:"300"}}>{t("followings")}</Text>
                </TouchableOpacity>
                <View style={{borderWidth:1, borderColor:LIGHT_GRAY, height:40}}/>

                <TouchableOpacity onPress={() => navigation.navigate("Follow", {user_id:id, id:1})} style={{width:width*2.5/10,paddingVertical:10, alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontSize:19, fontWeight:"600", marginBottom:4}}>{FollowerCount ?? "0"}</Text>
                    <Text style={{fontSize:14, fontWeight:"300"}}>{t("followers")}</Text>
                </TouchableOpacity>

            </View>

            {/* BIOGRAPHI AREA */}
            {user_detail?.data?.user?.biography ? (
                <View style={{ marginTop:20, width:width*8/10, alignSelf:"center", alignItems:"center", 
            justifyContent:"center"}}>
                <Text style={{textAlign:"center", fontWeight:"300"}}>
                </Text>
            </View>
            ):null}
            

            {/* POST AREA */}
            <View style={{marginTop:20,}}>
                <FlatList
                    data={recipeResponse?.data?.data}
                    keyExtractor={(item)=> item._id.toString()}
                    renderItem={({item}) => <RecipeRenderComponent item={item} navigation={navigation}/>}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                />
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