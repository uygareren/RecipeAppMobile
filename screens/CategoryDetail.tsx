import { FlatList } from "native-base";
import { Dimensions, Image, Text, View } from "react-native";
import { useQuery } from "react-query";
import { TopHeader } from "../components/Header";
import useI18n from "../hooks/useI18n";
import { getCategoryDetail } from "../services/ApiService";
import { LIGHT_GRAY, LIGHT_GRAY_2, WHITE } from "../utils/utils";

export default function CategoryDetail({ route }: any) {
    const { id, name } = route.params;
    
    const {t} = useI18n("CategoryDetail")

    const {width, height} = Dimensions.get("screen");
    
    const {data, isLoading} = useQuery(
        ["recipe-by-category", id],
        () => getCategoryDetail(id)
    )
    
    const category_detail_data = data?.data?.data

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

    if(isLoading){
        return(
          <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
              <Text>Loading...</Text>
          </View>
        )
      }

    return(
        <View style={{flex:1, backgroundColor:WHITE, justifyContent:"center"}}>
            <View style={{ marginTop: 50, position:"absolute", top:0, width:"100%" }}>
                <TopHeader title={name} />
                <View style={{ backgroundColor: LIGHT_GRAY_2, height: 1, width: width * 8 / 10, alignSelf: "center", marginTop: 5 }} />
            </View>

            <View style={{marginTop:50, alignItems:"center"}}>
            {category_detail_data?.length == 0 ? (
                <Text style={{fontWeight:"600", fontSize:14}}>{t("no_recipe")}</Text>
            ):<FlatList
                data={category_detail_data}
                keyExtractor={(item:any)=> item._id.toString()}
                renderItem={RenderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />}
            </View>

        </View>
    );
}
