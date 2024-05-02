import { useNavigation } from "@react-navigation/native";
import { Dimensions, FlatList, ScrollView, StyleSheet, View } from "react-native";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Divider } from "../components/Divider";
import { TopHeader } from "../components/Header";
import { RecipeRenderComponent } from "../components/Render/RecipeRenderComponent";
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
                    renderItem={({ item }) => <RecipeRenderComponent item={item} navigation={navigation}/>}
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