import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BLACK_COLOR, LIGHT_GRAY, WHITE } from "../utils/utils";
import { useMutation } from "react-query";
import { getRecipeByIngredients } from "../services/ApiService";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { TopHeader } from "../components/Header";


export default function SearchResultScreen({route}:any){

    const selectedComponentIds = route.params.selectedComponentIds;

    const {width, height} = Dimensions.get("screen");

    const navigation = useNavigation<any>();


    const searchMutation = useMutation({
        mutationKey: ["recipe-by-ingredients"],
        mutationFn: getRecipeByIngredients,
        
      });


    useEffect(() => {
        searchMutation.mutate({ingredients:selectedComponentIds});
    }, [selectedComponentIds])
    
    console.log("searhcmutation", searchMutation);


    const RenderItem = ({item}:any) => {

        console.log("item", item);
        return(
            <View style={{ paddingHorizontal:15, marginBottom:20}}>
                {/* USER */}
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <TouchableOpacity onPress={() => navigation.navigate("OtherProfile", {id:item?.user?.userId})} style={{width:width*0.1, height:width*0.1, borderRadius:180}}>
                    <Image source={require('../assets/images/default_profile.jpg')}
                    style={{width:width*0.1, height:width*0.1, borderRadius:180}}/>
                    </TouchableOpacity>
                    
                    <Text style={{fontWeight:"500", fontSize:15, marginLeft:10}}>{`${item?.user?.name} ${item?.user?.surname}`}</Text>
                </View>

                <Pressable onPress={() => navigation.navigate("RecipeDetail", {id:item?._id})} style={{width:width-30}}>
                    <Image source={require('../assets/images/default_recipe.jpeg')}
                    style={{width:width-30, height:width-50, resizeMode:"contain"}}/>
                </Pressable>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontWeight:"300", fontSize:16, marginBottom:10}}>{item?.recipeName}</Text>
                </View>
                <View style={{backgroundColor: LIGHT_GRAY, height:1, width: "90%", alignSelf: "center", marginTop: 5}}/>

            </View>
            

            
        )
    }

    if(searchMutation.isLoading){
        return(
            <View style={{flex:1, backgroundColor:WHITE, alignItems:"center", justifyContent:"center"}}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return(
        <ScrollView style={styles.container}>
            <View style={{marginTop:50}}>
                <View>
                    <TopHeader title={`Sonuç ${searchMutation?.data?.data?.data.length.toString() ?? ""}`}/>
                    <View style={{backgroundColor: LIGHT_GRAY, height:1, width: "90%", alignSelf: "center", marginTop: 5}}/>

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