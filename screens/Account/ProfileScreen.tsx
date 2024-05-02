import { useNavigation } from "@react-navigation/native";
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Divider } from "../../components/Divider";
import { SettingsHeader } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { RecipeRenderComponent } from "../../components/Render/RecipeRenderComponent";
import useI18n from "../../hooks/useI18n";
import { TabAccountScreenProps } from "../../navigations/ProfileNavigation";
import { getFollowing, getRecipeByUserId } from "../../services/ApiService";
import { BLACK_COLOR, LIGHT_GRAY, WHITE } from "../../utils/utils";


export default function ProfileScreen({route}: TabAccountScreenProps<"Profile">){

    const API = process.env.API;

    const {t} = useI18n("ProfileScreen");

    const width = Dimensions.get("screen").width

    const navigation = useNavigation<any>();

    const userInfo = useSelector((state:any) => state.user.userInfo);

    const userId = userInfo?.userId


    const {data, isLoading} = useQuery({
        queryKey:["get_following"],
        queryFn:()=>getFollowing(userId)
    })


    const follower_data_length = data == undefined ? 0 : data?.data?.follower.length
    const followed_data_length = data== undefined ? 0: data?.data?.followed.length;


    const recipe_resp = useQuery({
        queryKey:["get_recipe_by_userid"],
        queryFn:() => getRecipeByUserId({user_id:userId})
    })


    if(isLoading){
        return(
          <Loading/>
        )
      }

      const RenderItem = ({item}:any) => {
        
    }

    return(
        <ScrollView style={{flex:1, backgroundColor:WHITE}}>

            <View>
                <SettingsHeader />
            </View>

            {/* PROFİLE İMAGE*/}
            <View>
                <View style={{borderWidth:1, borderColor:BLACK_COLOR,marginTop:30, width:width*2.7/10, height:width*2.7/10, alignSelf:"center",
            borderRadius:180, alignItems:"center", justifyContent:"center"}}>
                    
                    {userInfo?.image != null ? (
                    <Image source={{uri: `${API}/images/${userInfo?.image}`}} style={{width: width*2.5/10, height:width*2.5    /10, 
                    borderRadius:180}}/>
                ) : (
                    <Image source={require("../../assets/images/default_profile.jpg")} style={{width: width*2.5/10, height:width*2.5    /10, 
                    borderRadius:180}}/>

                )}
                </View>

                {/* NAME, CİTY AREA  */}
                <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontSize:17, fontWeight:"600", marginTop:10}}>{`${userInfo?.name} ${userInfo?.surname}`}</Text>
                    {userInfo?.city ? (<Text style={{fontSize:14, fontWeight:"300", marginTop:2}}>{`${userInfo?.city}, ${userInfo?.country}`}</Text>): 
                    null}
                    
                </View>
            </View>

            {/* FOLLOWİNG INFO AREA */}
            <View style={{marginTop:20, width:width*8/10, alignSelf:"center", flexDirection:"row",
            justifyContent:"space-between", alignItems:"center"}}>
                <View style={{width:width*2.5/10,paddingVertical:10, alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontSize:19, fontWeight:"600", marginBottom:4}}>{recipe_resp?.data?.data?.length}</Text>
                    <Text style={{fontSize:14, fontWeight:"300"}}>{t("recipes")}</Text>
                </View>
                <View style={{borderWidth:1, borderColor:LIGHT_GRAY, height:40}}/>
                <Pressable onPress={() => navigation.navigate("Follow", {id: 0})} style={{width:width*2.5/10,paddingVertical:10, alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontSize:19, fontWeight:"600", marginBottom:4}}>{followed_data_length}</Text>
                    <Text style={{fontSize:14, fontWeight:"300"}}>{t("followings")}</Text>
                </Pressable>
                <View style={{borderWidth:1, borderColor:LIGHT_GRAY, height:40}}/>
                <Pressable onPress={() => navigation.navigate("Follow", {id:1})} style={{width:width*2.5/10,paddingVertical:10, alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontSize:19, fontWeight:"600", marginBottom:4}}>{follower_data_length}</Text>
                    <Text style={{fontSize:14, fontWeight:"300"}}>{t("followers")}</Text>
                </Pressable>

            </View>

            <Divider height={1} width={"90%"} style={{alignSelf:"center",backgroundColor:LIGHT_GRAY}}/>

            {/* BIOGRAPHI AREA */}
            {userInfo?.biography ? (
                <View style={{marginTop:20, width:width*8/10, alignSelf:"center", alignItems:"center", 
                justifyContent:"center"}}>
                    <Text style={{textAlign:"center", fontWeight:"300"}}>{userInfo?.biography}</Text>
            </View>
            ): null}

            {/* POST AREA */}
            <View style={{ marginTop:20,}}>
                <FlatList
                    data={recipe_resp?.data?.data}
                    keyExtractor={(item)=> item._id.toString()}
                    renderItem={({ item }) => <RecipeRenderComponent item={item} navigation={navigation} />}
                    numColumns={2}
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