import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useToast } from "native-base";
import { useContext, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { TopHeader } from "../components/Header";
import { ToastSuccess } from "../components/Toast";
import { MakeRecipeContext } from "../context/MakeRecipeContext";
import { deleteMadeMeals, doneMadeMeals, getContinuousMeals, getRecipeById } from "../services/ApiService";
import { RootStateType } from "../store/store";
import { BLACK_COLOR, BORDER_RADIUS_1, BORDER_RADIUS_3, CONTAİNER_HORİZONTAL, GRAY_2, LIGHT_PINK_2, MAIN_COLOR_GREEN, WHITE } from "../utils/utils";

export default function MakeRecipeScreen() {
    const API = process.env.API;
    const { width } = Dimensions.get("screen");

    const userInfo = useSelector((state: RootStateType) => state.user.userInfo);

    const toast = useToast();
    const queryClient = useQueryClient();

    const bottomSheetRef = useRef<any>();
    const snapPoints = ["35%","60%","90%"];

    const navigation = useNavigation<any>();

    const [selectedRecipeId, setSelectedRecipeId] = useState("");

    const handlePresentModal = (recipe_id:string) => {
        setSelectedRecipeId(recipe_id);
        bottomSheetRef.current?.present();

      }

    const { data: recipeData, isLoading: isRecipeLoading, isSuccess } = useQuery(
        ["recipe-detail", selectedRecipeId],
        () => getRecipeById(selectedRecipeId),
        {
            enabled: !!selectedRecipeId, // Only run the query if selectedRecipeId is not null
        }
    );
    const { recipe, setRecipe } = useContext(MakeRecipeContext);


    const { data, isLoading } = useQuery(
        ["get-continuous-made-meals"],
        () => getContinuousMeals(userInfo?.userId),
        {
            onSuccess(data) {
                // Optional: You can set initial recipe data here if needed.
            },
        }
    );

console.log("loading", isRecipeLoading);
    const deleteMutation = useMutation({
        mutationKey: ["delete-made-meals-by-user"],
        mutationFn: deleteMadeMeals,
        onSuccess(data, variables, context) {
            toast.show(ToastSuccess("Tarif İptal Edildi"));
            queryClient.invalidateQueries(["get-continuous-made-meals"]);
        },
    });

    const doneMadeMealsMutation = useMutation({
        mutationKey: ["post-done-made-meals"],
        mutationFn: doneMadeMeals,
        onSuccess(data, variables, context) {
            toast.show(ToastSuccess("Tarif Tamamlandı"));
            queryClient.invalidateQueries(["get-continuous-made-meals"]);
        },
    });

    console.log("recipe",recipe);

    function DeleteMadeMeals(recipe_id: String) {
        const payload = {
            userId: userInfo?.userId,
            recipeId: recipe_id,
        };



        deleteMutation.mutate(payload);
    }

    function DoneMadeMeals(recipe_id: String) {
        const payload = {
            userId: userInfo?.userId,
            recipeId: recipe_id,
            status: 1,
        };

        doneMadeMealsMutation.mutate(payload);
    }

    function handleCancelBottomSheet(){
        bottomSheetRef.current.close();
    }


    // <View style={{ position: "absolute", right: 0 }}>
    //                     <TouchableOpacity onPress={() => DeleteMadeMeals(item?.recipeId)} style={{ borderRadius: 8, backgroundColor: LIGHT_GRAY_2, paddingVertical: 4, paddingHorizontal: 8, alignItems: "center", justifyContent: "center" }}>
    //                         <Text style={{ fontSize: 12, fontWeight: "600" }}>İptal Et</Text>
    //                     </TouchableOpacity>
    //                     <TouchableOpacity onPress={() => DoneMadeMeals(item?.recipeId)} style={{ borderRadius: 8, backgroundColor: LIGHT_GRAY_2, paddingVertical: 4, paddingHorizontal: 8, marginTop: 10, alignItems: "center", justifyContent: "center" }}>
    //                         <Text style={{ fontSize: 12, fontWeight: "600" }}>Bitir</Text>
    //                     </TouchableOpacity>
    //                 </View>

    // const RenderItem = ({ item }: any) => {
    //     return item?.status === 0 ? (
    //         <View style={{ borderWidth: 0.2, width: "100%", alignSelf: "center", borderRadius: 8, paddingVertical: 16, paddingHorizontal: 8, marginBottom: 8 }}>
    //             <View style={{ flexDirection: "row", alignItems: "center" }}>
    //                 <View style={{ borderWidth: 1, width: width * 0.1, height: width * 0.1, alignItems: "center", justifyContent: "center", borderRadius: 360 }}>
    //                     <Image source={{ uri: `${API}/recipes/${item?.recipeImage}` }} style={{ width: width * 0.09, height: width * 0.09, borderRadius: 360 }} />
    //                 </View>
    //                 <View style={{ marginLeft: 8, maxWidth: width * 0.55, width: width * 0.53 }}>
    //                     <Text>{item?.recipeName}</Text>
    //                 </View>
                    
    //             </View>
    //         </View>
    //     ) : null;
    // };
   

    const RenderItem = ({ item }: {item: RecipeItem | any }) => {
        // onPress={() => navigation.push("RecipeDetail", {id:item?._id})}
    
        return (
            
            <Pressable onPress = {() => handlePresentModal(item?.recipeId)} style={{ marginBottom: 20, borderRadius: BORDER_RADIUS_1, overflow: 'hidden' }}>
                <View style={{ position: 'relative', height: 150 }}>
                    <Image 
                        source={{ uri: `${API}/recipes/${item?.recipeImage}` }} 
                        style={{ height: '100%', width: '100%', resizeMode: "cover" }} 
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <View style={styles.textContainer}>
                        <View style={{maxWidth:width*0.6}}>
                            <Text style={styles.title}>{item?.recipeName}</Text>
                        </View>
                        <View>
                            
                            <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center',paddingHorizontal:12, 
                            paddingVertical:0, borderRadius:BORDER_RADIUS_3, backgroundColor:LIGHT_PINK_2,
                            ...styles.shadow
                            }}>
                                <Text style={{...styles.duration}}>Detayı Gör</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <GestureHandlerRootView style={{flex:1}}>
            <BottomSheetModalProvider>
                <Pressable 
                onPress={handleCancelBottomSheet}
                style={{ flex: 1, backgroundColor: WHITE, paddingHorizontal: 20 }}>
                    <View style={{ marginTop: 40 }}>
                        <TopHeader title="Yapılan Tarifler" />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <FlatList
                            data={data?.data}
                            keyExtractor={(item) => item?.recipeId?.toString()}
                            renderItem={RenderItem}
                        />
                    </View>

                    <BottomSheetModal ref={bottomSheetRef} index={0} snapPoints={snapPoints}  
                    
                        backgroundStyle={{backgroundColor:WHITE}}>

                            {isRecipeLoading ? (
                                <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                                    <ActivityIndicator/>
                                </View>
                            ):(
                                <View style={{flex:1, backgroundColor:WHITE, paddingHorizontal:CONTAİNER_HORİZONTAL, paddingVertical:20}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <Pressable onPress={() => navigation.push("RecipeDetail", {id:recipeData?.data?.recipe?._id})} 
                                    style={{ width:width*0.20, height:width*0.20, alignItems:"center", justifyContent:"center",
                                        borderRadius:8
                                    }}>
                                        <Image source={{uri:`${API}/recipes/${recipeData?.data?.recipe?.image}`}}
                                        style={{width:"100%", height:"100%", borderRadius:8}}/>
                                    </Pressable>
                                    <Pressable onPress={() => navigation.push("RecipeDetail", {id:recipeData?.data?.recipe?._id})}
                                    style={{marginLeft:20, maxWidth:width*0.8-80}}>
                                        <Text style={{fontWeight:"700", fontSize:16, color:BLACK_COLOR}}>{recipeData?.data?.recipe?.recipeName}</Text>
                                    </Pressable>
                                   
                                    </View>
                                    <View style={{marginTop:20, alignSelf:"flex-end"}}>
                                        <Text style={{fontSize:13, fontWeight:"600", color:GRAY_2}}>32 dakika önce başlandı</Text>
                                    </View>

                                    <View style={{marginTop:25, flexDirection:"row",justifyContent:"space-between"}}>
                                         <TouchableOpacity onPress={() => DoneMadeMeals(recipeData?.data?.recipe?._id)}
                                         style={{borderRadius:BORDER_RADIUS_3, paddingHorizontal:12, paddingVertical:8,
                                            backgroundColor:MAIN_COLOR_GREEN, width:(width-100)/2, alignItems:"center", justifyContent:"center"
                                          }}>
                                            <Text style={{fontWeight:"600", fontSize:14, color:WHITE}}>Tarifi Bitir</Text>
                                         </TouchableOpacity>
                                         <TouchableOpacity onPress={() => DeleteMadeMeals(recipeData?.data?.recipe?._id)} 
                                         style={{borderRadius:BORDER_RADIUS_3, paddingHorizontal:12, paddingVertical:8,
                                            backgroundColor:MAIN_COLOR_GREEN, width:(width-100)/2, alignItems:"center", justifyContent:"center"
                                          }}>
                                            <Text style={{fontWeight:"600", fontSize:14, color:WHITE}}>Tarifi İptal Et</Text>
                                         </TouchableOpacity>
                                    </View>
                                    
                                </View>
                            )}

                            
                    </BottomSheetModal>

                </Pressable>

        
            </BottomSheetModalProvider>

        </GestureHandlerRootView>

    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        paddingHorizontal: CONTAİNER_HORİZONTAL,
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: WHITE,
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "300",
        color: WHITE,
    },
    duration: {
        color: WHITE,
        fontWeight:"600",
        fontSize:13
    },
    shadow:{
        shadowColor:LIGHT_PINK_2,
        shadowOffset:{
            width:4,
            height:4
        },
        shadowOpacity:1,
        shadowRadius:3.84,
        elevation:9
    }
});
