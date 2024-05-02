import { Dimensions, Image, TouchableOpacity } from "react-native";
import { LIGHT_GRAY } from "../../utils/utils";


export const RecipeRenderComponent = ({ navigation, item }: { navigation: any; item: RecipeItem | any }) => {

    console.log("item", item);

    const API = process.env.API;
    const width = Dimensions.get("screen").width


    return(
        <TouchableOpacity onPress={() => navigation.push("RecipeDetail", {id:item?._id})} style={{backgroundColor:LIGHT_GRAY,
             width:width*0.3,alignItems:"center",
        marginBottom:20,marginVertical:2, marginHorizontal:2}}>
            <Image source={{uri: `${API}/recipes/${item?.image}`}} 
            style={{ width: width*0.3, height: width*0.3, resizeMode:"cover" }} />

        </TouchableOpacity>
    )
}