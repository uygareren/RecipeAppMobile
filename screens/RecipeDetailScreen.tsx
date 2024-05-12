import { AntDesign, Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BLACK_COLOR, GRAY, LIGHT_GRAY, LIGHT_GRAY_2, LIGHT_RED, WHITE, getTimeFromNow, handleNavigation } from "../utils/utils";

import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Divider } from '../components/Divider';
import { TextInputComp } from '../components/Inputs';
import { Loading } from '../components/Loading';
import { Ingredients } from "../components/RecipeDetailComponents/Ingredients";
import { Instructions } from "../components/RecipeDetailComponents/Instructions";
import useI18n from '../hooks/useI18n';
import { deleteComment, deleteRecipeById, getAllIngredients, getAllMeasurements, getRecipeById, postComment, postLike, removeLike } from "../services/ApiService";


export default function RecipeDetailScreen({route}:any){

    const API = process.env.API;

    const {t} = useI18n("RecipeDetailScreen");

    const navigation = useNavigation<any>(); 


    const recipe_id = route?.params?.id
    const userInfo = useSelector((state:any) => state.user.userInfo)

    const [commentData, setCommentData] = useState<CommentData[]>([]); 

    const [initialLike, setInitialLike] = useState(false)
    const [isLike, setIsLıke] = useState(false)
    const [likeCount, setLıkeCount] = useState(0);

    const [selectedComment, setSelectedComment] = useState("");

    const [comment, setComment] = useState("");

    const [isActionVisible, setisActionVisible] = useState<boolean>(false)

    const {width, height} = Dimensions.get("screen");
    
    const [index, setIndex] = useState(0);

    const snapPoints = ["75%"];
    const snapPointsDelete = ["10%"];
    
    const bottomSheetRef = useRef<any>(null);
    const bottomSheetDeleteRef = useRef<any>(null);
  
    const handlePresentModal = () => {
      bottomSheetRef.current?.present();
    }
    const handlePresentDeleteModal = () => {
      bottomSheetDeleteRef.current?.present();
    }


    const {data, isLoading, isSuccess} = useQuery(
        ["recipe-detail"],
        () => getRecipeById(recipe_id),
        {onSuccess(data){
            console.log("data",data)
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
            console.log("liked")
            setIsLıke(true)
        }
    })

    const removelikeMutation = useMutation({
        mutationKey:["remove_like"],
        mutationFn: removeLike, 
        onSuccess:()=>{
            setLıkeCount(likeCount-1)
            console.log("removed")
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
            console.log("delete başarılı");
            navigation.navigate("Profile");
        }
    });

    const deleteCommentMutation = useMutation({
        mutationKey: ["delete_comment"],
        mutationFn: deleteComment,
        onSuccess: () => {
            console.log("success delete comment");
            setSelectedComment("");
        }
    })

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
    console.log("USER", userInfo);

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
            style={{marginVertical:4, paddingVertical:4,}}>
            <View style={{flexDirection:"row",alignItems:'center'}}>
                <Pressable onPress={() => handleNavigation({navigation, routeString: "OtherProfile", id_1: userInfo?.userId, id_2: item?.userdata?.userId})}
                    style={{flexDirection:'row', 
                        alignItems:'center', justifyContent:'center',
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
                    
                    
                    <Text style={{fontSize:11, fontWeight:"700", marginLeft:10}}>{item?.userdata?.user_name} {item?.userdata?.user_surname}</Text>
                </Pressable>
                <Text style={{fontSize:12, color:GRAY, marginLeft:7, fontWeight:"600"}}>{getTimeFromNow(item?.createdAt)}</Text>
            </View>
            <Text style={{fontSize:13,marginTop:3, marginLeft:width*0.1+10}}>{item?.comment}</Text>

            <TouchableOpacity onPress={() => handleDeleteComment(item?._id)} style={{borderWidth:0, marginLeft:10, marginTop:10, 
            flexDirection:'row', backgroundColor:WHITE, width:width*0.4, alignItems:'center', paddingHorizontal:10, 
            paddingVertical:8, borderRadius:8, display: item?._id == selectedComment ? "flex":"none", ...styles.shadow
            }}>
                <FontAwesome name="trash" size={24} color={LIGHT_RED} />
                <Text style={{color:LIGHT_RED, fontSize:16, fontWeight:'400', marginLeft:10}}>Gönderiyi Sil</Text>
            </TouchableOpacity>

            </Pressable>
            
            
        )
    }

    const Comments = () => {
        return(
            <View style={{width:"100%", paddingVertical:10 }}>
                <FlatList
                    data={commentData.slice(0,3)}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={RenderCommentItem}
                />

                
                <TouchableOpacity style={{marginTop:10}} onPress={handlePresentModal}>
                    {commentData.length == 0 ? (
                        <Text style={{fontWeight:'600', fontSize:13, color:GRAY}}>Hiç Yorum Yok</Text>

                    ) : (
                        <Text style={{fontWeight:'600', fontSize:13, color:GRAY}}>{`${commentData.length} Yorumun Hepsini Gör`}</Text>

                    )}
                </TouchableOpacity>
    
                {/* <View style={{marginTop: 10,flexDirection: "row", alignItems:"center", }}>
                    <TextInputComp
                        isTextArea={true}
                        value={comment}
                        onchangeValue={setComment}
                        placeholder={t("add_comment")}
                        styleContainer={{width: Dimensions.get("screen").width * 7.8 / 10,}}
                        styleInputContainer={{ borderRadius: 15, }}
                        styleInput={{
                            minHeight:50,
                            width: Dimensions.get("screen").width * 7.8 / 10,
                            paddingVertical: 13,
                            paddingHorizontal: 7,
                            backgroundColor: LIGHT_GRAY_2,
                            borderRadius: 15,
                        }}
                    />
                    <TouchableOpacity onPress={() => handleComment()} style={{marginLeft:10}}>
                        <FontAwesome name="send" size={24} color="black" />
                    </TouchableOpacity>
                </View> */}

               
    
            </View>
        )
    }

    if(isLoading){
        return(
           <Loading/>
        )
    }

    return(
        <GestureHandlerRootView style={{flex:1, }}>
            <BottomSheetModalProvider>


                <ScrollView style={styles.container} >
            <Pressable onPress={outsidePressHandler}>



                    <View style={{ marginTop: 40 }}>

                        <TouchableOpacity onPress={() => navigation.goBack()} 
                        style={{marginVertical:20}}>
                            <Feather name="arrow-left" size={28} color={BLACK_COLOR} />
                        </TouchableOpacity>

                        
                        <View style={{flexDirection:"row",alignItems:"center", justifyContent:'space-between',}}>
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
                        </View>
                        <Image source={{uri:`${API}/recipes/${data?.data?.recipe?.image}`}} style={{ width: "100%", height: height * 4 / 10, resizeMode: "contain" }} />
                        
                    </View>

                    {/* WHITE CARD */}

                    <View style={{marginTop:-40,width:width*8/10, borderRadius:15,alignSelf:"center", backgroundColor:WHITE, paddingHorizontal:15,
                paddingVertical:10, ...styles.shadow }}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}> 
                            <Text style={{fontSize:20, fontWeight:"600"}}>{data?.data?.recipe?.recipeName}</Text>

                            <View style={{ flexDirection:"row", alignItems:"center",}}>
                            <TouchableOpacity onPress={() => handleLıke()} style={{backgroundColor:LIGHT_GRAY_2,
                                borderRadius:180, paddingHorizontal:4, paddingVertical:4,alignItems:"center", justifyContent:"center"}}>
                                {isLike ? <AntDesign name="heart" size={20} color={LIGHT_RED} /> 
                                : 
                                <AntDesign name="hearto" size={20} color={LIGHT_RED}/>}
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 6, fontSize: 12, fontWeight: "300" }}>
                                {likeCount?.toString()} {likeCount === 1 || likeCount === 0 ? t("like") : t("likes")}
                            </Text>

                        </View>
                            
                        </View>
                        
                        <View style={{backgroundColor:LIGHT_GRAY, height:1, width:"100%", alignSelf:"center", marginTop:8}}/>

                        <View style={{flexDirection:"row", justifyContent:"space-around",paddingHorizontal:5, paddingVertical:10}}>
                            <View style={{backgroundColor:LIGHT_GRAY_2,alignItems:"center", justifyContent:"center", width:width/7, paddingVertical:8,
                        borderRadius:15}}>
                                <AntDesign name="clockcircleo" size={24} color="black" />
                                <Text style={{marginTop:8, fontSize:12, fontWeight:"700"}}>{data?.data?.recipe?.cooking_time}</Text>
                            </View>
                            <View style={{backgroundColor:LIGHT_GRAY_2,alignItems:"center", justifyContent:"center", width:width/7, paddingVertical:8,
                        borderRadius:15}}>
                                <MaterialIcons name="fastfood" size={24} color="black" />
                                <Text style={{marginTop:8, fontSize:12, fontWeight:"700"}}>{data?.data?.recipe?.calory} cal</Text>
                            </View>
                            <View style={{backgroundColor:LIGHT_GRAY_2,alignItems:"center", justifyContent:"center", width:width/7, paddingVertical:8,
                        borderRadius:15}}>
                                <MaterialIcons name="workspaces-outline" size={24} color="black" />
                                <Text style={{marginTop:8, fontSize:12, fontWeight:"700"}}>{data?.data?.recipe?.level}</Text>
                            </View>
                        </View>

                    </View>

                    <View style={{width:"100%", marginTop:20, backgroundColor:LIGHT_GRAY_2, borderRadius:15}}>
                        {/* SELECT SECTİON */}
                        <View style={{flexDirection:"row", justifyContent:"space-around", paddingVertical:15}}>
                            <TouchableOpacity onPress={() => setIndex(0)} style={{alignItems:"center"}}>
                                <Text style={{fontSize:16, fontWeight:index == 0 ? "500": "300"}}>{t("ingredients")}</Text>
                                <View style={{width:width*1.7/10, height:2, backgroundColor: index == 0 ? LIGHT_RED : LIGHT_GRAY_2 , marginTop:4}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIndex(1)} style={{alignItems:"center"}}>
                                <Text style={{fontSize:16, fontWeight:index == 1 ? "500": "300"}}>{t("instructions")}</Text>
                                <View style={{width:width*1.7/10, height:2, backgroundColor: index == 1 ? LIGHT_RED : LIGHT_GRAY_2 , marginTop:4}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIndex(2)} style={{alignItems:"center"}}>
                                <Text style={{fontSize:16, fontWeight:index == 2 ? "500": "300"}}>{t("comments")}</Text>
                                <View style={{width:width*1.7/10, height:2, backgroundColor: index == 2 ? LIGHT_RED : LIGHT_GRAY_2 , marginTop:4}}/>
                            </TouchableOpacity>
                        </View>

                        
                    </View>
                
                    <View style={{ width: "100%", paddingVertical:15, paddingHorizontal:0}}>
                        {index === 0 && <Ingredients item={data?.data?.recipe?.ingredients_with_measurements}
                        ingredients_data={ingredientsData?.data?.data[0].Ingredients_id}
                        measurementData={measurementData?.data?.measurements_data[0].measurement_names}/>}
                        {index === 1 && <Instructions item={data?.data?.recipe?.recipeDescription}/>}
                        {index === 2 && <Comments />}
                        

                    </View>

                {/* <Actionsheet isOpen={isActionVisible} onClose={() => setisActionVisible(false)} >
                    <Actionsheet.Content style={{height:height*0.7}}> 
                        
                        <View style={{height:height*0.05, }}>
                            <Text style={{fontWeight:'600', fontSize:16,marginBottom:10}}>Yorumlar</Text>
                            <Divider height={1} width="90%"/>
                        </View>

                        <View style={{width:"100%", paddingHorizontal:20, height:height*0.5}}>
                            <View style={{marginBottom:0,marginTop:0,height:"100%" }}>

                                <FlatList
                                    data={commentData}
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={RenderCommentItem}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>

                        </View>

                        <View style={{flexDirection: "row", alignItems:"center", marginBottom:20,marginTop:10, height:height*0.07, }}>
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
                                <TouchableOpacity onPress={() => handleComment()} style={{marginLeft:10}}>
                                    <FontAwesome name="send" size={24} color="black" />
                                </TouchableOpacity>
                            ): null}
                            
                        </View> 
                        
                    </Actionsheet.Content>

                </Actionsheet> */}

                        
            
                <BottomSheetModal  ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
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
                </BottomSheetModal>

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
        paddingHorizontal:20,
    },
    shadow:{
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5
    }

})