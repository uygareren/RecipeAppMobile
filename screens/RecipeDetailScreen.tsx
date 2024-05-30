import { AntDesign, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BLACK_COLOR, BORDER_RADIUS_2, BORDER_RADIUS_3, CONTAİNER_HORİZONTAL, GRAY, GRAY_2, GREEN, LANG_STORE, LIGHT_PINK_2, LIGHT_RED, LIGHT_RED_2, MAIN_COLOR_2, MAIN_COLOR_GREEN, WHITE, getTimeFromNow, handleNavigation } from "../utils/utils";

import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useToast } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Loading } from '../components/Loading';
import { Ingredients } from '../components/RecipeDetailComponents/Ingredients';
import { MakeRecipeContext } from '../context/MakeRecipeContext';
import useI18n from '../hooks/useI18n';
import { deleteComment, deleteRecipeById, getAllIngredients, getAllMeasurements, getRecipeById, lengthMadeMeals, postComment, postLike, removeLike } from "../services/ApiService";


export default function RecipeDetailScreen({route}:any){

    const API = process.env.API;
    const recipe_id = route?.params?.id

    const toast = useToast();

    const {t} = useI18n("RecipeDetailScreen");

    const navigation = useNavigation<any>(); 
    const {width, height} = Dimensions.get("screen");

    const userInfo = useSelector((state:any) => state.user.userInfo)

    const [commentData, setCommentData] = useState<CommentData[]>([]); 

    const [isExpanded, setIsExpanded] = useState(false);

    const [initialLike, setInitialLike] = useState(false)
    const [isLike, setIsLıke] = useState(false)
    const [likeCount, setLıkeCount] = useState(0);
    

    const [selectedComment, setSelectedComment] = useState("");

    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(true);

    const {recipe, setRecipe} = useContext(MakeRecipeContext)
    
    const [index, setIndex] = useState(0);

    const [visibleModalComment, setVisibleModalComment] = useState<boolean>(false);

    const snapPoints = ["75%"];
    const snapPointsDelete = ["10%"];
    
    const bottomSheetRef = useRef<any>(null);
    const bottomSheetDeleteRef = useRef<any>(null);

    function handleOpenCloseCommentModal(){
        setVisibleModalComment(!visibleModalComment);
    }
  
    const handlePresentModal = () => {
      bottomSheetRef.current?.present();
    }
    const handlePresentDeleteModal = () => {
      bottomSheetDeleteRef.current?.present();
    }

    let lang_data: string | null;

    async function fetchData() {
        lang_data = await AsyncStorage.getItem(LANG_STORE);
    }

    fetchData();

    const handlePress = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
      
      const timer = setTimeout(() => {
          setLoading(false); // After 4 seconds, set loading state to false
      }, 3000);

      return () => clearTimeout(timer); // Clear the timer on unmount
    }, []);
    


    const {data, isLoading:isLoadingDetail, isSuccess} = useQuery(
        ["recipe-detail"],
        () => getRecipeById(recipe_id),
        {onSuccess(data){
            setCommentData(data?.data?.commentData);
        }}
    );

    
    const ingredientsData = useQuery({
        queryKey: ["get_all_ingredients"],
        queryFn: getAllIngredients
    });

    const measurementData = useQuery({
        queryKey:["get_measurements"],
        queryFn: getAllMeasurements,
        staleTime:1000
    })

    const addlikeMutation = useMutation({
        mutationKey:["post_like"],
        mutationFn: postLike, 
        onSuccess:()=>{
            setLıkeCount(likeCount+1)
            setIsLıke(true)
        }
    })

    const removelikeMutation = useMutation({
        mutationKey:["remove_like"],
        mutationFn: removeLike, 
        onSuccess:()=>{
            setLıkeCount(likeCount-1)
            setIsLıke(false)
        }
    })

    const commentMutation = useMutation({
        mutationKey: ["post_comment"],
        mutationFn: postComment,
        onSuccess: () => {
            setComment("");
        }
    });

    const deletePostMutation = useMutation({
        mutationKey: ["delete-recipe"],
        mutationFn: deleteRecipeById,
        onSuccess: () => {
            navigation.navigate("Profile");
        }
    });

    const deleteCommentMutation = useMutation({
        mutationKey: ["delete_comment"],
        mutationFn: deleteComment,
        onSuccess: () => {
            setSelectedComment("");
        }
    });

    // const postMadeMealsMutation = useMutation({
    //     mutationKey: ["post-made-meals-by-user"],
    //     mutationFn: postMadeMeals,
    //     onSuccess(data, variables, context) {
    //         toast.show(ToastSuccess("Tarifi Yapmaya Başladınız!"));
    //         navigation.navigate("Home");
    //         setLoading(false);
    //     },
    //     onError: async(error: any) => {
    //         toast.show(ToastError(error?.response?.data[`message_${lang_data}`]))
    //         setLoading(false);

    //     }
    // });

    const lengthofMadeMeals:any = useQuery(
        ["get-length-made-meals"],
        () => lengthMadeMeals(recipe_id),
    );

    console.log("length", lengthofMadeMeals?.data?.data);




    useEffect(() => {
        if(isSuccess){
            setInitialLike(data?.data?.likeData.filter((item:any) => item?.userId == userInfo.userId )[0]?.isLike ?? false)
            setIsLıke(data?.data?.likeData.filter((item:any) => item?.userId == userInfo.userId )[0]?.isLike ?? false);
            setLıkeCount(data?.data?.likeData?.length)
        }
    }, [isSuccess, data, userInfo]);
    
    


    async function handleLıke() {
        setIsLıke(!isLike);
        
        if(!isLike){
            // post like
            addlikeMutation.mutate({
                recipeId:recipe_id,
                userId:userInfo.userId,
                isLike:true
            })

        }else{
            // remove like
            removelikeMutation.mutate({
                recipeId:recipe_id,
                userId: userInfo.userId
            })
        }
    } 

    // console.log("comments", commentData);
    // console.log("data", data?.data);
    // console.log("USER", userInfo);

    async function handleComment() {

        const date = new Date();
        const formattedDate = date.toISOString();

        const comment_data = {
            comment: comment,
            createdAt: formattedDate,
            postId: recipe_id,
            userdata : {
                userId: userInfo?.userId,
                user_image: userInfo?.image,
                user_name: userInfo?.name,
                user_surname: userInfo?.surname

            }
        }

        // console.log("commentdata", comment_data);

        setCommentData((prev:any) => [...prev, comment_data]);

        commentMutation.mutate({
            userId: userInfo.userId,
            recipeId: recipe_id,
            comment:comment
        });
        setComment("");

    }

    // async function handleMakeRecipe(){
    //     setLoading(true);
    //     const payload = {
    //         userId:userInfo?.userId,
    //         userName:userInfo?.name,
    //         userSurname:userInfo?.surname,
    //         userImage:userInfo?.image,
    //         recipeId: data?.data?.recipe?._id,
    //         recipeName: data?.data?.recipe?.recipeName,
    //         recipeImage: data?.data?.recipe?.image,
    //         status: 0
    //     }

    //     postMadeMealsMutation.mutate(payload);

    //      // Verilen _id ile aynı olan yemek tarifini bulma
    //     const existingRecipe = recipe.find((recipeItem: any) => recipeItem?.recipeId === payload.recipeId);
    //     console.log("existingRecipe",existingRecipe)

    //     // Eğer böyle bir tarif yoksa, yeni tarifi ekleyin
    //     if (!existingRecipe) {
    //         setRecipe((prev: any) => [...prev, payload]);
    //     }


    //     setLoading(false);
    // }

    async function handleSelectedComment(user_id:string, comment_id:string) {

        if(user_id == userInfo?.userId){
            setSelectedComment(comment_id);
        }
    }

    async function handleDeleteComment(comment_id:string) {
        deleteCommentMutation.mutate({"commentId":comment_id});
        setCommentData(commentData.filter((item:any) => item?._id != comment_id));
    }

    const outsidePressHandler = () => {
        setSelectedComment(""); // setSelectedComment'i sıfırla
    };


    const RenderCommentItem = ({item}:any) => {

        return(
            <Pressable onPress={outsidePressHandler} onLongPress={() => handleSelectedComment(item?.userdata?.userId,item?._id)} 
            style={{marginVertical:8, paddingVertical:4,}}>
            <View style={{flexDirection:"row",alignItems:'flex-start',}}>
                <Pressable onPress={() => handleNavigation({navigation, routeString: "OtherProfile", id_1: userInfo?.userId, id_2: item?.userdata?.userId})}
                    style={{flexDirection:'row', 
                        alignItems:'flex-start', justifyContent:'center',
                }}>
                    <View style={{width:width*0.1, height:width*0.1, borderRadius:360, borderWidth:1, borderColor:GRAY, alignItems:'center', justifyContent:'center'}}>
                    {item?.userdata?.user_image != null ? (
                        <Image source={{uri: `${API}/images/${item?.userdata?.user_image}`}} style={{width:width*0.09, 
                        height:width*0.09, borderRadius:360, resizeMode:'cover'}}/>                            
                    ): (
                        <Image source={require("../assets/images/default_profile.jpg")} style={{width:width*0.09, 
                            height:width*0.09, borderRadius:360, resizeMode:'cover'}}/>     

                    )}
                    </View>

                    <View>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:11, fontWeight:"700", marginLeft:10}}>{item?.userdata?.user_name} {item?.userdata?.user_surname}</Text>
                            <Text style={{fontSize:12, color:GRAY, marginLeft:7, fontWeight:"600"}}>{getTimeFromNow(item?.createdAt)}</Text>
                        </View>
                        <View style={{ marginLeft:10, justifyContent:'center'}}>
                            <Text style={{fontSize:13,marginTop:3, }}>{item?.comment}</Text>
                        </View>

                    </View>
                    

                </Pressable>
            </View>

            <TouchableOpacity onPress={() => handleDeleteComment(item?._id)} style={{ marginLeft:10, marginTop:10, 
            flexDirection:'row', backgroundColor:WHITE, width:width*0.4, alignItems:'center', paddingHorizontal:10, 
            paddingVertical:8, borderRadius:8, display: item?._id == selectedComment ? "flex":"none", ...styles.shadow
            }}>
                <FontAwesome name="trash" size={24} color={LIGHT_RED} />
                <Text style={{color:LIGHT_RED, fontSize:16, fontWeight:'400', marginLeft:10}}>Gönderiyi Sil</Text>
            </TouchableOpacity>

            </Pressable>
            
            
        )
    }

    console.log("islaoding",loading)

    if(loading){
        return(
            <View style={{flex:1, backgroundColor:WHITE}}>
                <Loading/>
            </View>
        )
    }


    return(
        <GestureHandlerRootView style={{flex:1, }}>
            <BottomSheetModalProvider>
                <ScrollView style={styles.container} >
                <Pressable onPress={outsidePressHandler}>
                    <View style={{marginBottom:30}}>
                    
                        {/* <View style={{flexDirection:"row",alignItems:"center", justifyContent:'space-between',}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <TouchableOpacity onPress={() => handleNavigation({navigation, routeString: "OtherProfile", id_1: userInfo?.userId, id_2: data?.data?.recipe?.user?.userId})} 
                                style={{width:width*0.1, height:width*0.1, borderRadius:360, borderWidth:1, borderColor:GRAY, alignItems:'center', justifyContent:'center'}}>
                                {data?.data?.recipe?.user?.image != null ? (
                                <Image source={{uri: `${API}/images/${data?.data?.recipe?.user?.image}`}}
                                style={{width:width*0.09, height:width*0.09, borderRadius:180}}/>
                                ): (
                                <Image source={require("../assets/images/default_profile.jpg")}
                                style={{width:width*0.09, height:width*0.09, borderRadius:180}}/>
                                )}
                                
                                </TouchableOpacity>
                            
                                <Text style={{fontWeight:"500", fontSize:15, marginLeft:10}}>{`${data?.data?.recipe?.user?.name} ${data?.data?.recipe?.user?.surname}`}</Text>
                                
                            </View>

                            <TouchableOpacity onPress={() => handlePresentDeleteModal()}>
                                <Entypo name="dots-three-vertical" size={16} color={BLACK_COLOR} />
                            </TouchableOpacity>
                        </View> */}
                        
                       <View style={{ position: 'relative', width: '100%', height: height * 4 / 10 }}>
                        <Image 
                            source={{ uri: `${API}/recipes/${data?.data?.recipe?.image}` }} 
                            style={{ width: "100%", height: "100%", resizeMode: "cover" }} 
                        />
                        <LinearGradient
                            colors={['rgba(0,0,0,0)', 'rgba(255, 255, 255, 1)']}
                            style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: '25%',
                            width: '100%',
                            }}
                        />
                        <View style={{flexDirection:'row', width:width-35,alignItems:'center', justifyContent:'space-between',position:'absolute', bottom:10, left:20}}>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center',}}>
                                <TouchableOpacity onPress={() => handleNavigation({navigation, routeString: "OtherProfile", id_1: userInfo?.userId, id_2: data?.data?.recipe?.user?.userId})} 
                                    style={{width:width*0.06, height:width*0.06, borderRadius:360, borderWidth:1, borderColor:GRAY, alignItems:'center', justifyContent:'center'}}>
                                    {data?.data?.recipe?.user?.image != null ? (
                                    <Image source={{uri: `${API}/images/${data?.data?.recipe?.user?.image}`}}
                                    style={{width:width*0.07, height:width*0.07, borderRadius:180}}/>
                                    ): (
                                    <Image source={require("../assets/images/default_profile.jpg")}
                                    style={{width:width*0.07, height:width*0.07, borderRadius:180}}/>
                                    )}
                                    
                                </TouchableOpacity>
                            
                                <Text style={{fontWeight:"700", fontSize:12, marginLeft:10, color:GRAY_2}}>{`${data?.data?.recipe?.user?.name} ${data?.data?.recipe?.user?.surname}`}</Text>
                            </View>

                            <View>
                                <TouchableOpacity onPress={() => navigation.push("MissingIngredients", {id:recipe_id})}
                                    style={{paddingVertical:4, paddingHorizontal:20, borderRadius:BORDER_RADIUS_3, 
                                        backgroundColor:LIGHT_PINK_2, flexDirection:'row',alignItems:'center', justifyContent:'center', ...styles.shadow}}
                                >
                                    <Text style={{color:WHITE, fontWeight:'700', fontSize:13}}>Tarifi Yap</Text>
                                    <AntDesign name="caretright" size={12} color="white" style={{marginLeft:5}} />
                                </TouchableOpacity>
                                
                            </View>
                            
                            {/* <View style={{borderWidth:0, backgroundColor:"white", alignItems:'center', justifyContent:'center', paddingVertical:10}}>
                                <ButtonComp loading={loading} onPress={() => navigation.push("MissingIngredients", {id:recipe_id})} 
                                styleContainer={{...authButtonContainer, borderRadius:8}}
                                styleText={{...authTextButton}}
                                title='Tarifi Yap'/>
                                
                            </View> */}
                                
                        </View>

                        <TouchableOpacity onPress={() => navigation.goBack()}
                        style={{position:'absolute', top:50, left:20, padding:2, borderRadius:BORDER_RADIUS_2,
                            backgroundColor:MAIN_COLOR_GREEN
                        }}>
                            <AntDesign name="left" size={24} color={WHITE} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{position:'absolute', top:50, right:20, borderRadius:4,
                            backgroundColor:MAIN_COLOR_GREEN, paddingVertical:2, paddingHorizontal:6
                        }}>
                            {lengthofMadeMeals?.data?.data > 0 ? (
                                <Text style={{fontSize:12, fontWeight:400, color:WHITE}}>{lengthofMadeMeals?.data?.data} Kişi bu tarifi yaptı!</Text>
                            ): 
                            <Text style={{fontSize:12, fontWeight:400, color:WHITE}}>Tarifi İlk Sen Dene!</Text>
                            }
                        </TouchableOpacity>

                        </View>


                        <View style={{ paddingHorizontal:CONTAİNER_HORİZONTAL}}>
                            
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                <Text style={{fontSize:22, fontWeight:'600'}}>{data?.data?.recipe?.recipeName}</Text>
                                <View style={{ flexDirection:"row", alignItems:"center",justifyContent:'flex-end', marginTop:5,}}>
                                <TouchableOpacity onPress={() => handleLıke()} style={{
                                    borderRadius:180, paddingHorizontal:4, paddingVertical:4,alignItems:"center", justifyContent:"center"}}>
                                    {isLike ? <AntDesign name="heart" size={20} color={LIGHT_RED} /> 
                                    : 
                                    <AntDesign name="hearto" size={20} color={LIGHT_RED}/>}
                                </TouchableOpacity>
                                <Text style={{ marginLeft: 2, fontSize: 11, fontWeight: "400" }}>
                                    {likeCount?.toString()} {likeCount === 1 || likeCount === 0 ? t("like") : t("likes")}
                                </Text>

                                </View>
                            </View>
                            <View style={{marginTop:8,flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                        <MaterialCommunityIcons name="clock-time-eight" size={18} color={MAIN_COLOR_GREEN} />
                                        <Text style={{fontWeight:'400', color:GRAY, fontSize:13.5}}> {data?.data?.recipe?.cooking_time} mins</Text>
                                    </View>
                                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginLeft:8}}>
                                        <FontAwesome5 name="burn" size={18} color={MAIN_COLOR_2} />
                                        <Text style={{fontWeight:'400', color:GRAY, fontSize:13.5}}> {data?.data?.recipe?.calory} kcal</Text>
                                    </View>
                                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginLeft:8}}>
                                        <Ionicons name="cellular-outline" size={18} color={BLACK_COLOR} />
                                        <Text style={{fontWeight:'400', color:GRAY, fontSize:13.5}}> {data?.data?.recipe?.level}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={handleOpenCloseCommentModal}>
                                    <Text style={{fontWeight:'600', fontSize:12, color:GRAY_2}}>Yorumları gör</Text>
                                </TouchableOpacity>

                            </View>
                            
                            <View style={{marginTop:20}}>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>Ingredients</Text>
                            <Ingredients item={data?.data?.recipe?.ingredients_with_measurements}
                        ingredients_data={ingredientsData?.data?.data[0].Ingredients_id}
                        measurementData={measurementData?.data?.measurements_data[0].measurement_names}/>
                            </View>


                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>Description</Text>
                                <Text 
                                    style={{ marginTop: 4, color: 'gray', fontWeight: '400', fontSize: 14 }}
                                    numberOfLines={isExpanded ? 0 : 2}
                                >
                                    {data?.data?.recipe?.recipeDescription}
                                </Text>
                                <TouchableOpacity onPress={handlePress} style={{alignSelf:'flex-end'}}>
                                    <Text style={{ color: MAIN_COLOR_GREEN, fontWeight:'500', marginTop: 4 }}>
                                    {isExpanded ? 'Less' : 'More'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                                
                        </View>

                    </View>

                    <Modal visible={visibleModalComment} onRequestClose={() => handleOpenCloseCommentModal()} animationType='slide'>
                        <View style={{flex:1}}>
                            <View style={{ paddingHorizontal:20, paddingVertical:16,justifyContent:'center',alignItems:'flex-end'}}>
                                <TouchableOpacity onPress={handleOpenCloseCommentModal} style={{width:30,height:30, alignItems:'center', justifyContent:'center',
                                    borderRadius:BORDER_RADIUS_2, backgroundColor:GREEN,
                                }}>
                                    <AntDesign name="close" size={24} color={WHITE} />
                                </TouchableOpacity>
                            </View>
                            <View style={{minHeight:height*0.75, paddingHorizontal:16}}>
                            <FlatList
                                data={commentData}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={RenderCommentItem}
                            />
                            </View>
                            <View style={{ justifyContent:'flex-start', flex:1, borderWidth:2}}>
                                
                            </View>
                            
                        </View>
                    </Modal>

                  

                   
                
                    {/* <View style={{ width: "100%", paddingVertical:15, paddingHorizontal:0}}>
                        {index === 0 && <Ingredients item={data?.data?.recipe?.ingredients_with_measurements}
                        ingredients_data={ingredientsData?.data?.data[0].Ingredients_id}
                        measurementData={measurementData?.data?.measurements_data[0].measurement_names}/>}
                        {index === 1 && <Instructions item={data?.data?.recipe?.recipeDescription}/>}
                        {index === 2 && <Comments />}
                        

                    </View> */}
                    
                {/* <BottomSheetModal  ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
                    <Pressable onPress={outsidePressHandler} style={{backgroundColor:WHITE, }}>

                        <View style={{height:height*0.05, borderWidth:0, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{fontWeight:'600', fontSize:16,marginBottom:10}}>Yorumlar</Text>
                            <Divider height={1} width="90%"/>
                        </View>

                        <View style={{width:"100%", paddingHorizontal:20, height:height*0.5,}}>
                            <BottomSheetScrollView style={{marginBottom:0,marginTop:0,height:"100%",}} showsVerticalScrollIndicator={false}>

                                <FlatList
                                    data={commentData}
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={RenderCommentItem}
                                    showsVerticalScrollIndicator={false}
                                />
                            </BottomSheetScrollView>

                        </View>

                        <View style={{flexDirection: "row", alignItems:"center", marginBottom:20,marginTop:10, 
                        marginHorizontal:20,height:height*0.07, }}>
                            <TextInputComp
                                isTextArea={true}
                                value={comment}
                                onchangeValue={setComment}
                                placeholder={t("add_comment")}
                                styleContainer={{width: Dimensions.get("screen").width * 7.8 / 10,}}
                                styleInputContainer={{ borderRadius: 15, }}
                                styleInput={{
                                    borderWidth:1,
                                    borderColor:LIGHT_GRAY,
                                    minHeight:50,
                                    width: Dimensions.get("screen").width * 7.8 / 10,
                                    paddingVertical: 13,
                                    paddingHorizontal: 7,
                                    backgroundColor: LIGHT_GRAY_2,
                                    borderRadius: 15,
                                }}
                            />
                            {comment.length > 0 ? (
                                <TouchableOpacity onPress={() => handleComment()} style={{marginLeft:15}}>
                                    <FontAwesome name="send" size={24} color="black" />
                                </TouchableOpacity>
                            ): null}
                            
                        </View> 

                    </Pressable>
                </BottomSheetModal> */}

                <BottomSheetModal ref={bottomSheetDeleteRef} index={0} snapPoints={snapPointsDelete}>
                    <View style={{backgroundColor:WHITE, paddingHorizontal:20}}>
                        <TouchableOpacity onPress={() => (
                            deletePostMutation.mutate(data?.data?.recipe?._id)
                        )} style={{flexDirection:'row', alignItems:'center'}}>
                            <FontAwesome name="trash" size={24} color={LIGHT_RED} />
                            <Text style={{color:LIGHT_RED, fontSize:18, fontWeight:'400', marginLeft:10}}>Gönderiyi Sil</Text>
                        </TouchableOpacity>

                    </View>
                </BottomSheetModal>
                </Pressable>

                </ScrollView>
                
            </BottomSheetModalProvider>

        </GestureHandlerRootView>


    )

   
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:WHITE,
    },
    shadow:{
        shadowColor:LIGHT_RED_2,
        shadowOffset:{
            width:4,
            height:4
        },
        shadowOpacity:0.7,
        shadowRadius:3.84,
        elevation:9
    }

})