import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet, View } from "react-native";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { Divider } from "../components/Divider";
import { TopHeader } from "../components/Header";
import { Loading } from "../components/Loading";
import { HomeRecipeRenderComponent } from "../components/Render/HomeRecipeRenderComponent";
import useI18n from "../hooks/useI18n";
import { getRecipeByIngredients } from "../services/ApiService";
import { RootStateType } from "../store/store";
import { CONTAİNER_HORİZONTAL, WHITE } from "../utils/utils";


export default function SearchResultScreen({route}:any){

    const API = process.env.API;


    const {t} = useI18n("SearchResultScreen");

    const selectedComponentIds = route.params.selectedComponentIds;

    const userInfo = useSelector((state:RootStateType) => state.user.userInfo);

    const {width, height} = Dimensions.get("screen");

    const navigation = useNavigation<any>();


    const searchMutation = useMutation({
        mutationKey: ["recipe-by-ingredients"],
        mutationFn: getRecipeByIngredients,
        
      });


    useEffect(() => {
        searchMutation.mutate({ingredients:selectedComponentIds});
    }, [selectedComponentIds])
    

    if(searchMutation.isLoading){
        return(
            <Loading/>
        )
    }

    return(
        <ScrollView style={styles.container}>
            <View style={{marginTop:50}}>
                <View>
                    <TopHeader title={`Sonuç ${searchMutation?.data?.data?.data.length.toString() ?? ""}`}/>
                    <Divider height={1} width={"90%"} />

                </View>

                <View style={{marginTop:20}}>
                    <FlatList
                        data={searchMutation?.data?.data?.data}
                        keyExtractor={(item:any) => item?._id.toString()}
                        renderItem={({item}) => <HomeRecipeRenderComponent item={item} navigation={navigation} userId={userInfo?.userId}/>}
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
      paddingHorizontal:CONTAİNER_HORİZONTAL
    }
})