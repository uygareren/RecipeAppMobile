import { useNavigation } from "@react-navigation/native";
import { FlatList } from "native-base";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { useQuery } from "react-query";
import { TopHeader } from "../components/Header";
import { Loading } from "../components/Loading";
import { RecipeRenderComponent } from "../components/Render/RecipeRenderComponent";
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
                renderItem={({item}) => <RecipeRenderComponent item={item} navigation={navigation}/>}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />}
            </View>

        </View>
        </ScrollView>

    );
}
