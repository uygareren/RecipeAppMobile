import { useToast } from "native-base";
import { useContext } from "react";
import { Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { TopHeader } from "../components/Header";
import { ToastSuccess } from "../components/Toast";
import { MakeRecipeContext } from "../context/MakeRecipeContext";
import { deleteMadeMeals, doneMadeMeals, getMadeMeals } from "../services/ApiService";
import { RootStateType } from "../store/store";
import { LIGHT_GRAY_2, WHITE } from "../utils/utils";

export default function MakeRecipeScreen(){
    const API = process.env.API;
    const {width, height} = Dimensions.get("screen");

    const userInfo = useSelector((state:RootStateType) => state.user.userInfo);

    const toast = useToast();

    const {recipe, setRecipe} = useContext(MakeRecipeContext);


    console.log("recipe", recipe);

    const {data ,isLoading} = useQuery(
        ["get-made-meals-by-user"],
        () => getMadeMeals(userInfo?.userId)
    );

    console.log("data", data?.data[0]?.recipes);

    const deleteMutation = useMutation({
        mutationKey: ["delete-made-meals-by-user"],
        mutationFn: deleteMadeMeals,
        onSuccess(data, variables, context) {
            toast.show(ToastSuccess("Tarif İptal Edildi"))
        },
    });

    const doneMadeMealsMutation = useMutation({
        mutationKey: ["post-done-made-meals"],
        mutationFn: doneMadeMeals,
        onSuccess(data, variables, context) {
            toast.show(ToastSuccess("Tarif Tamamlandı"))
        },
    })

    function DeleteMadeMeals(recipe_id:String){
        const paylaod = {
            userId: userInfo?.userId,
            recipeId: recipe_id
        }

        deleteMutation.mutate(paylaod);
    }

    function DoneMadeMeals(recipe_id:String){
        const payload = {
            userId: userInfo?.userId,
            recipeId: recipe_id,
            status:1
        }

        doneMadeMealsMutation.mutate(payload);

    }

    const RenderItem = ({ item }: any) => {
        console.log("item", item);
        console.log(`${API}/images/${item?.recipeImage}`);
        return item?.status === 0 ? (
            <View style={{ borderWidth: 0.2, width: "100%", alignSelf: "center", borderRadius: 8, paddingVertical: 16, paddingHorizontal: 8, marginBottom: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ borderWidth: 1, width: width * 0.1, height: width * 0.1, alignItems: "center", justifyContent: "center", borderRadius: 360 }}>
                        <Image source={{ uri: `${API}/recipes/${item?.recipeImage}` }} style={{ width: width * 0.09, height: width * 0.09, borderRadius: 360 }} />
                    </View>
                    <View style={{ marginLeft: 8, maxWidth: width * 0.55, width: width * 0.53 }}>
                        <Text>{item?.recipeName}</Text>
                    </View>
                    <View style={{ position: "absolute", right: 0 }}>
                        <TouchableOpacity onPress={() => DeleteMadeMeals(item?.recipeId)} style={{ borderRadius: 8, backgroundColor: LIGHT_GRAY_2, paddingVertical: 4, paddingHorizontal: 8, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 12, fontWeight: "600" }}>İptal Et</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => DoneMadeMeals(item?.recipeId)} style={{ borderRadius: 8, backgroundColor: LIGHT_GRAY_2, paddingVertical: 4, paddingHorizontal: 8, marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 12, fontWeight: "600" }}>Bitir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        ) : null;
    };
    

    return(
        <ScrollView style={{flex:1, backgroundColor:WHITE, paddingHorizontal:20}}>
            <View style={{marginTop:40}}>
                <TopHeader title="Yapılan Tarifler"/>
            </View>

            <View style={{marginTop:20}}>
                <FlatList
                    data={data?.data[0]?.recipes}
                    keyExtractor={(item) => item?.recipeId.toString()}
                    renderItem={RenderItem}
                />
            </View>

            
        </ScrollView>
    )
}