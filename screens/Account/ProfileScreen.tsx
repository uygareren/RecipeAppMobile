import { useNavigation } from "@react-navigation/native";
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { SettingsHeader } from "../../components/Header";
import useI18n from "../../hooks/useI18n";
import { TabAccountScreenProps } from "../../navigations/ProfileNavigation";
import { getFollowing, getRecipeByUserId } from "../../services/ApiService";
import { BLACK_COLOR, LIGHT_GRAY, WHITE } from "../../utils/utils";


export default function ProfileScreen({route}: TabAccountScreenProps<"Profile">){

    const {t} = useI18n("ProfileScreen");

    const width = Dimensions.get("screen").width
    const height = Dimensions.get("screen").height

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
          <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
              <Text>Loading...</Text>
          </View>
        )
      }

    const RenderItem = ({item}:any) => {
        return(
            <View style={{backgroundColor:LIGHT_GRAY, borderBottomLeftRadius:12, borderBottomRightRadius:12,
                 width:width*0.35,alignItems:"center",
            marginBottom:20,marginHorizontal:width*0.04}}>
                <Image source={{ uri: "http://dummyimage.com/118x100.png/ff4444/ffffff" }} 
                style={{ width: width*0.35, height: width*0.35, resizeMode:"cover" }} />
                <View style={{marginVertical:10, paddingHorizontal:5}}>
                <Text >{item?.recipeName}</Text>

                </View>
            </View>
        )
    }

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

            <View style={{height:1, backgroundColor:LIGHT_GRAY, width:"90%", alignSelf:"center"}}/>

            {/* BIOGRAPHI AREA */}
            {userInfo?.biography ? (
                <View style={{marginTop:20, width:width*8/10, alignSelf:"center", alignItems:"center", 
                justifyContent:"center"}}>
                    <Text style={{textAlign:"center", fontWeight:"300"}}>{userInfo?.biography}</Text>
            </View>
            ): null}

            {/* POST AREA */}
            <View style={{ marginTop:20}}>
                <FlatList
                    data={recipe_resp?.data?.data}
                    keyExtractor={(item)=> item._id.toString()}
                    renderItem={RenderItem}
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