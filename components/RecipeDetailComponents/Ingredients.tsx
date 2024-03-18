import { Dimensions, FlatList, Text, View } from "react-native";
import { LIGHT_GRAY_2 } from "../../utils/utils";


export function Ingredients({item, ingredients_data, measurementData}:any){

    const {width, height} = Dimensions.get("screen")

    // console.log("item", item);
    // console.log("ingredientsData", ingredients_data);
    // console.log("measurementDataa", measurementData);


    const RenderItem = ({item}:any) => {

        const name = (ingredients_data?.map((value:any) => 
            value?.IngredientsData?.filter((e:any) => e?._id == item?.ingredients_id)[0]?.type
        )[0]);

        return(
            <View style={{paddingVertical:10, paddingHorizontal:10, marginVertical:5, backgroundColor:LIGHT_GRAY_2, borderRadius:12,
            flexDirection:"row"}}>
                <Text style={{marginHorizontal:2, fontWeight:"700", fontSize:14}}>{name}</Text>
                <Text style={{marginHorizontal:2}}>-</Text>
                <Text style={{marginHorizontal:2}}>{item?.measurement}</Text>
                <Text style={{marginHorizontal:2}}>{measurementData.filter((e:any) => e?._id == item?.measurement_id)[0]?.name}</Text>
            </View>
        )
    }

    return(
        <View style={{width:"100%"}}>
            <FlatList
                data={item}
                keyExtractor={(item:any) => item?._id.toString()}
                renderItem={RenderItem}
            />
        </View>
    )
}