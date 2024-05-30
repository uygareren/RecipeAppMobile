import { Dimensions, FlatList, Text, View } from "react-native";
import { GRAY_2, SOFT_BLUE } from "../../utils/utils";


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
            <View style={{paddingVertical:16, paddingHorizontal:10, marginVertical:8, backgroundColor:SOFT_BLUE, borderRadius:12,
            flexDirection:"row", justifyContent:"space-between"}}>
                <View>
                    <Text style={{fontWeight:"600", fontSize:16}}>{name}</Text>
                </View>
                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontWeight:"600", fontSize:15}}>{item?.measurement}</Text>
                    <Text style={{fontWeight:"400", fontSize:14, color:GRAY_2}}> {measurementData.filter((e:any) => e?._id == item?.measurement_id)[0]?.name}</Text>
                </View>
               
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