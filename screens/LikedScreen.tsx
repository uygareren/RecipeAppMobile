import { useNavigation } from "@react-navigation/native";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Divider } from "../components/Divider";
import { TopHeader } from "../components/Header";
import { getLikedRecipes } from "../services/ApiService";
import { LIGHT_GRAY, WHITE } from "../utils/utils";



export default function FavoritesScreen(){

    const API = process.env.API;


    const {height, width} = Dimensions.get("screen");
    const navigation = useNavigation<any>();

    const userInfo = useSelector((state:any) => state.user.userInfo );
    console.log("userınfoo", userInfo);

    const {data, isLoading} = useQuery(
        ["liked-recipes"],
        () => getLikedRecipes(userInfo.userId)
    )

    console.log("dataa", data);

    const RenderItem = ({ item }: { item: RecipeType }) => {

        console.log("item", item);

        return(
            <TouchableOpacity onPress={() => navigation.push("RecipeDetail", {id:item?._id})} style={{backgroundColor:LIGHT_GRAY, borderBottomLeftRadius:12, borderBottomRightRadius:12,
                 width:width*0.4,alignItems:"center",
            marginBottom:20,marginHorizontal:width*0.04}}>
                <Image source={{uri: `${API}/recipes/${item?.image}`}}  
                style={{ width: width*0.4, height: width*0.35, resizeMode:"cover" }} />
                <View style={{marginVertical:10, paddingHorizontal:5}}>
                <Text >{item?.recipeName}</Text>

                </View>
            </TouchableOpacity>
        )
    }

    return(
        <ScrollView style={styles.container}>

            <View style={{marginTop:50}}>
                <TopHeader title="Likes"/>
                <Divider height={1} width={"90%"} style={{backgroundColor: LIGHT_GRAY,alignSelf: "center", marginTop: 5}}/>
            </View>

            <View style={{marginTop:20}}>
            <FlatList
                    data={data?.data}
                    keyExtractor={(item:RecipeType)=> item._id.toString()}
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
        backgroundColor:WHITE
    },
   
})