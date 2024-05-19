import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "native-base";
import { useContext, useState } from "react";
import { Dimensions, FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { ButtonComp } from "../components/Button";
import { ToastError, ToastSuccess } from "../components/Toast";
import { MakeRecipeContext } from "../context/MakeRecipeContext";
import { getAllIngredients, getRecipeById, postMadeMeals } from "../services/ApiService";
import { RootStateType } from "../store/store";
import { authButtonContainer, authTextButton } from "../styles/styles";
import { LANG_STORE, LIGHT_GRAY_2, MAIN_COLOR, WHITE } from "../utils/utils";

export default function MissingIngredients({route}:any){

    const recipe_id = route.params.id;

    const navigation = useNavigation<any>();

    const {width, height} = Dimensions.get("screen");

    const [loading, setLoading] = useState(false);
    const [missinIngredientsData, setMissinIngredientsData] = useState<any[]>([]);
    const {recipe, setRecipe} = useContext(MakeRecipeContext)

    const toast = useToast();

    const userInfo = useSelector((state:RootStateType) => state.user.userInfo);

    let lang_data: string | null;

    async function fetchData() {
        lang_data = await AsyncStorage.getItem(LANG_STORE);
    }

    fetchData();

    const {data, isLoading, isSuccess} = useQuery(
        ["recipe-detail"],
        () => getRecipeById(recipe_id),
        
    );

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

    const ingredientsData = useQuery({
        queryKey: ["get_all_ingredients"],
        queryFn: getAllIngredients
    });

    async function handleDoneMeals(){
        setLoading(true);

        if(missinIngredientsData.length == 0){
            const payload = {
                userId:userInfo?.userId,
                userName:userInfo?.name,
                userSurname:userInfo?.surname,
                userImage:userInfo?.image,
                recipeId: data?.data?.recipe?._id,
                recipeName: data?.data?.recipe?.recipeName,
                recipeImage: data?.data?.recipe?.image,
                recipeCookingTime: data?.data?.recipe?.cooking_time,
                status: 0
            }
    
            postMadeMealsMutation.mutate(payload);

            console.log("payload", payload);
    
             // Verilen _id ile aynı olan yemek tarifini bulma
            const existingRecipe = recipe.find((recipeItem: any) => recipeItem?.recipeId === payload.recipeId);
    
            // Eğer böyle bir tarif yoksa, yeni tarifi ekleyin
            if (!existingRecipe) {
                setRecipe((prev: any) => [...prev, payload]);
            }
    
        }else{
            navigation.push("FinishSelectIngredients", 
            {selected_ingredients:missinIngredientsData, 
            recipeId:recipe_id, 
            recipeName:data?.data?.recipe?.recipeName, 
            recipeImage: data?.data?.recipe?.image,
            recipeCookingTime: data?.data?.recipe?.cooking_time
        })
        }
        setLoading(false);        

    }

    async function handleMakeRecipe(){
        
    }


    function handleSelectIngredient(ingredientId: string) {
        if (missinIngredientsData.includes(ingredientId)) {
            setMissinIngredientsData(prev => prev.filter(item => item !== ingredientId));
        } else {
            setMissinIngredientsData(prev => [...prev, ingredientId]);
        }
    }
    
    console.log("missinIngredientsData",missinIngredientsData)

    const RenderItem = ({item}:any) => {

        let isChecked = missinIngredientsData.includes(item?.ingredients_id);


        const name = (ingredientsData?.data?.data[0].Ingredients_id?.map((value:any) => 
            value?.IngredientsData?.filter((e:any) => e?._id == item?.ingredients_id)[0]?.type
        )[0]);

        return(
            
            <Pressable onPress={() => handleSelectIngredient(item?.ingredients_id)} 
            style={{paddingVertical:10, paddingHorizontal:10, marginVertical:5, 
                backgroundColor:isChecked == true ? MAIN_COLOR : LIGHT_GRAY_2, borderRadius:8, flexDirection:"row", width:width*0.4,
                alignItems:"center", justifyContent:"center"}}>
                <Text style={{marginHorizontal:2, fontWeight:"700", fontSize:14}}>{name}</Text>
            </Pressable>
        )
    }

    return(
        <ScrollView style={{flex:1, backgroundColor:WHITE, paddingHorizontal:20}}>
            <View style={{marginTop:50}}>
                <Text style={{fontWeight:"500", fontSize:15}}>Eksik malzemelerin var mı?</Text>
            </View>
            <View style={{alignItems:"center", marginTop:30, height: height*0.7, maxHeight:height*0.7}}>
                <FlatList
                    data={data?.data?.recipe?.ingredients_with_measurements}
                    keyExtractor={(item) => item?._id}
                    renderItem={RenderItem}
                />
            </View>
            <View style={{marginTop: 20, alignItems: "center"}}>
                <ButtonComp 
                    title={missinIngredientsData.length === 0 ? "Tarife Başla" : "İlerle"} 
                    onPress={handleDoneMeals} 
                    styleContainer={{...authButtonContainer, borderRadius: 8}}
                    styleText={{...authTextButton}}
                />
            </View>

        </ScrollView>
    )
}