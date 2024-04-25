import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { Divider } from "../components/Divider";
import { TopHeader } from "../components/Header";
import { Loading } from "../components/Loading";
import useI18n from "../hooks/useI18n";
import { getRecipeByIngredients } from "../services/ApiService";
import { RootStateType } from "../store/store";
import { handleNavigation, WHITE } from "../utils/utils";


export default function SearchResultScreen({route}:any){

    const API = process.env.API;


    const {t} = useI18n("SearchResultScreen");

    const selectedComponentIds = route.params.selectedComponentIds;

    const userInfo = useSelector((state:RootStateType) => state.user.userInfo);

    const {width, height} = Dimensions.get("screen");

    const navigation = useNavigation<any>();


    const searchMutation = useMutation({
        mutationKey: ["recipe-by-ingredients"],
        mutationFn: getRecipeByIngredients,
        
      });


    useEffect(() => {
        searchMutation.mutate({ingredients:selectedComponentIds});
    }, [selectedComponentIds])
    

    const RenderItem = ({item}:any) => {

        console.log("itemmm", item);

        return(
            <View style={{ paddingHorizontal:15, marginBottom:20}}>
                {/* USER */}
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <TouchableOpacity onPress={() => handleNavigation({navigation, routeString: "OtherProfile", id_1: userInfo?.userId, id_2: item?.user?.userId})} style={{width:width*0.1, height:width*0.1, borderRadius:180}}>
                    {item?.user?.image != null ? (
                        <Image source={{uri: `${API}/images/${item?.user?.image}`}}
                    style={{width:width*0.1, height:width*0.1, borderRadius:180}}/>
                    ): (
                        <Image source={require("../assets/images/default_profile.jpg")}
                        style={{width:width*0.1, height:width*0.1, borderRadius:180}}/>
                    )}
                    
                    </TouchableOpacity>
                    
                    <Text style={{fontWeight:"500", fontSize:15, marginLeft:10}}>{`${item?.user?.name} ${item?.user?.surname}`}</Text>
                </View>

                <Pressable onPress={() => navigation.push("RecipeDetail", {id:item?._id})} style={{width:width-30}}>
                    <Image source={{uri: `${API}/recipes/${item?.image}`}}
                    style={{width:width-30, height:width-50, resizeMode:"contain"}}/>
                </Pressable>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontWeight:"300", fontSize:16, marginBottom:10}}>{item?.recipeName}</Text>
                </View>
                <Divider height={1} width={"90%"}/>

            </View>
            

            
        )
    }

    if(searchMutation.isLoading){
        return(
            <Loading/>
        )
    }

    return(
        <ScrollView style={styles.container}>
            <View style={{marginTop:50}}>
                <View>
                    <TopHeader title={`Sonuç ${searchMutation?.data?.data?.data.length.toString() ?? ""}`}/>
                    <Divider height={1} width={"90%"} />

                </View>

                <View style={{marginTop:20}}>
                    <FlatList
                        data={searchMutation?.data?.data?.data}
                        keyExtractor={(item:any) => item?._id.toString()}
                        renderItem={RenderItem}
                    />
                </View>
                

            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: WHITE,
    }
})