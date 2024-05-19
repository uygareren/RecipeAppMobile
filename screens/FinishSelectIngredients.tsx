import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "native-base";
import { useContext, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { ToastError, ToastSuccess } from "../components/Toast";
import { MakeRecipeContext } from "../context/MakeRecipeContext";
import { postMadeMeals } from "../services/ApiService";
import { LANG_STORE, WHITE } from "../utils/utils";

export default function FinishSelectIngredients({route}:any){

    const ingredients_data = route.params.selected_ingredients;
    const recipeId = route.params.recipeId;
    const recipeName = route.params.recipeName;
    const recipeImage = route.params.recipeImage;
    const recipeCookingTime = route.params.recipeCookingTime;

    console.log("recipeCookingTime",recipeCookingTime)

    console.log("ingredients_data",ingredients_data);
    console.log("recipeId",recipeId);
    console.log("recipeName",recipeName);
    console.log("recipeImage",recipeImage);

    const {width, height} = Dimensions.get("screen");

    const toast = useToast();
    const navigation = useNavigation<any>();

    const {recipe, setRecipe} = useContext(MakeRecipeContext);
    const [loading, setLoading] = useState(false);

    const userInfo = useSelector((state:any) => state.user.userInfo)

    let lang_data: string | null;

    async function fetchData() {
        lang_data = await AsyncStorage.getItem(LANG_STORE);
    }

    fetchData();



    console.log("ingredients_data", ingredients_data);
    const postMadeMealsMutation = useMutation({
            mutationKey: ["post-made-meals-by-user"],
            mutationFn: postMadeMeals,
            onSuccess(data, variables, context) {
                toast.show(ToastSuccess("Tarifi Yapmaya Başladınız!"));
                navigation.navigate("Home");
                setLoading(false);
            },
            onError: async(error: any) => {
                toast.show(ToastError(error?.response?.data[`message_${lang_data}`]))
                setLoading(false);

            }
    });
    

    async function handleDoneMeals(){
        setLoading(true);
        const payload = {
            userId:userInfo?.userId,
            userName:userInfo?.name,
            userSurname:userInfo?.surname,
            userImage:userInfo?.image,
            recipeId: recipeId,
            recipeName: recipeName,
            recipeImage: recipeImage,
            recipeCookingTime: recipeCookingTime,
            status: 0
        }

        postMadeMealsMutation.mutate(payload);

         // Verilen _id ile aynı olan yemek tarifini bulma
        const existingRecipe = recipe.find((recipeItem: any) => recipeItem?.recipeId === payload.recipeId);
        console.log("existingRecipe",existingRecipe)

        // Eğer böyle bir tarif yoksa, yeni tarifi ekleyin
        if (!existingRecipe) {
            setRecipe((prev: any) => [...prev, payload]);
        }


        setLoading(false);
    }

    return(
        <View style={{flex:1, backgroundColor:WHITE, paddingHorizontal:20}}>
            <View style={{marginTop:50}}>
                <Text style={{fontWeight:"500", fontSize:15}}>Eksik Malzemelerini Aşağıdaki Marketlerden Hızlıca Alabilirsin</Text>
            </View>
            <View style={{height:height*0.7,}}>
                <View style={{borderWidth:1, alignItems:"center", justifyContent:"center",height:50,marginTop:20, borderRadius:8}}>
                    <Text style={{fontWeight:"500", fontSize:15}}>Market 1</Text>
                </View>
                <View style={{borderWidth:1, alignItems:"center", justifyContent:"center",height:50,marginTop:20,borderRadius:8}}>
                    <Text style={{fontWeight:"500", fontSize:15}}>Market 2</Text>
                </View>
                <View style={{borderWidth:1, alignItems:"center", justifyContent:"center",height:50,marginTop:20,borderRadius:8}}>
                    <Text style={{fontWeight:"500", fontSize:15}}>Market 3</Text>
                </View>
            </View>
            <Pressable onPress={handleDoneMeals} style={{marginTop:20, alignItems:"center"}}>
                <Text style={{fontWeight:"600", fontSize:13}}>Hayır, Teşekkürler</Text>
            </Pressable>
        </View>
    )
}