import { useNavigation } from "@react-navigation/native";
import { FlatList } from "native-base";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import { TopHeader } from "../components/Header";
import { Loading } from "../components/Loading";
import useI18n from "../hooks/useI18n";
import { getCategoryDetail } from "../services/ApiService";
import { LIGHT_GRAY_2, WHITE } from "../utils/utils";

export default function CategoryDetail({ route }: any) {
    const API = process.env.API;

    const { id, name } = route.params;

    const navigation = useNavigation<any>();
    
    const {t} = useI18n("CategoryDetail")

    const {width, height} = Dimensions.get("screen");
    
    const {data, isLoading} = useQuery(
        ["recipe-by-category", id],
        () => getCategoryDetail(id)
    )
    
    const category_detail_data = data?.data?.data

    const RenderItem = ({item}:any) => {

        console.log(item);
        return(
            <TouchableOpacity style={{backgroundColor:LIGHT_GRAY_2, borderBottomLeftRadius:12, borderBottomRightRadius:12,
                 width:width*0.35,alignItems:"center",marginBottom:20,marginHorizontal:width*0.04}} 
                 onPress={() =>navigation.push("RecipeDetail", {id:item?._id})}>
                <Image source={{ uri: `${API}/recipes/${item?.image}` }} 
                style={{ width: width*0.35, height: width*0.35, resizeMode:"cover" }} />
                <View style={{marginVertical:10, paddingHorizontal:5}}>
                <Text style={{fontSize:14.5, fontWeight:"500"}}>{item?.recipeName}</Text>

                </View>
            </TouchableOpacity>
        )
    }

    if(isLoading){
        return(
          <Loading/>
        )
      }

    return(
        <ScrollView style={{backgroundColor:WHITE}}>

        <View style={{flex:1, backgroundColor:WHITE, }}>
            <View style={{ marginTop: 50, }}>
                <TopHeader title={name} />
                <View style={{ backgroundColor: LIGHT_GRAY_2, height: 1, width: width * 8 / 10, alignSelf: "center", marginTop: 5 }} />
            </View>

            <View style={{marginTop:50, alignItems:"flex-start", justifyContent:"center",height:Dimensions.get("screen").height-120 }}>
            {category_detail_data?.length == 0 ? (
                <Text style={{fontWeight:"600", fontSize:14, alignSelf:"center"}}>{t("no_recipe")}</Text>
            ):<FlatList
                data={category_detail_data}
                keyExtractor={(item:any)=> item._id.toString()}
                renderItem={RenderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />}
            </View>

        </View>
        </ScrollView>

    );
}
