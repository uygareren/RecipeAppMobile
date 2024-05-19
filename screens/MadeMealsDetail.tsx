import { useNavigation } from "@react-navigation/native";
import { AnyAction } from "@reduxjs/toolkit";
import { Dimensions, FlatList, Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { useQuery } from "react-query";
import { TopHeader } from "../components/Header";
import { getMadeMealsDetail } from "../services/ApiService";
import { WHITE } from "../utils/utils";


export default function MadeMealsDetail({route}:AnyAction){

    const recipe_id = route.params.id;
    console.log("iddd", recipe_id);

    const navigation = useNavigation<any>();
    const {width, height} = Dimensions.get("screen");

    const API = process.env.API;

    const {data, isLoading} = useQuery(
        ["get-made-meals"],
        () => getMadeMealsDetail(recipe_id)
    );

    console.log("dataaaa", data?.data?.user);

    const RenderItem = ({item}:any) => {
        return(
            <Pressable onPress={() => navigation.navigate("OtherProfile", {id:item?.userId})} style={{flexDirection:"row", marginBottom:15}}>
                <View style={{width:width*0.1, height:width*0.1, borderWidth:1,borderRadius:360, alignItems:"center", justifyContent:"center"}}>
                    <Image style={{width:width*0.09, height:width*0.09, borderRadius:180}}
                        source={{uri: `${API}/images/${item?.userImage}`}}/>
                </View>

                <View style={{marginLeft:20, width:width*0.75, justifyContent:"center"}}>
                    <Text style={{fontWeight:"400", fontSize:14}}>{`${item?.userName} ${item?.userSurname}`}</Text>
                </View>
            </Pressable>
        )
    }


    return(
        <SafeAreaView style={{flex:1, backgroundColor:WHITE, paddingHorizontal:20}}>
            <View style={{marginTop:50}}>
                <TopHeader title="Tarifi Yapanlar"/>
            </View>

            <FlatList
                data={data?.data?.user}
                keyExtractor={(item)=> item?._id.toString()}
                renderItem={RenderItem} 
                contentContainerStyle={{ marginTop:20}}
            />

        </SafeAreaView>
    )
}