import { Dimensions, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { GRAY, handleNavigation } from "../../utils/utils";
import { Divider } from "../Divider";

interface Props {
    item: RecipeItem;
    navigation: any;
    userId: string;
}

export const HomeRecipeRenderComponent = ({ item, navigation, userId }: Props) => {
    const { width, height } = Dimensions.get('screen');
    const API = process.env.API;

    // userInfo?.userId

    return(
        <View style={{ paddingHorizontal:0, marginBottom:20, }}>
            {/* USER */}
            <View style={{flexDirection:"row",alignItems:"center", justifyContent:'flex-start',paddingHorizontal:20 }}>
            <TouchableOpacity onPress={() => handleNavigation({navigation, routeString: "OtherProfile", id_1: userId, id_2: item?.user?.userId})} 
            style={{width:width*0.1, height:width*0.1, borderRadius:360, alignItems:"center", justifyContent:"center", borderWidth:1, 
                borderColor:GRAY
            }}>
                {item?.user?.image != null ? (
                  <Image source={{uri: `${API}/images/${item?.user?.image}`}}
                  style={{width:width*0.09, height:width*0.09, borderRadius:180}}/>
                ): (
                  <Image source={require("../../assets/images/default_profile.jpg")}
                style={{width:width*0.09, height:width*0.09, borderRadius:180}}/>
                )}
                
                </TouchableOpacity>
                
                <Text style={{fontWeight:"500", fontSize:15, marginLeft:10}}>{`${item?.user?.name} ${item?.user?.surname}`}</Text>
            </View>

            <Pressable onPress={() => navigation.push("RecipeDetail", {id:item?._id})} style={{width:width-30, alignSelf:"center"}}>
                <Image source={{uri: `${API}/recipes/${item?.image}`}}
                style={{width:width-50, height:width-50, resizeMode:"contain", borderRadius:8}}/>
            </Pressable>
            <View style={{alignItems:"center", marginTop:10}}>
                <Text style={{fontWeight:"300", fontSize:16, marginBottom:10}}>{item?.recipeName}</Text>
            </View>
            <Divider height={1} width={"90%"}/>

        </View>
        

        
    )    
}

