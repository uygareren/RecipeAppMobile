import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GRAY, LIGHT_GRAY, LIGHT_GRAY_2, LIGHT_RED, WHITE, getTimeFromNow } from "../utils/utils";

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { TextInputComp } from "../components/Inputs";
import { Ingredients } from "../components/RecipeDetailComponents/Ingredients";
import { Instructions } from "../components/RecipeDetailComponents/Instructions";
import useI18n from '../hooks/useI18n';
import { getAllIngredients, getAllMeasurements, getRecipeById, postComment, postLike, removeLike } from "../services/ApiService";

export default function RecipeDetailScreen({route}:any){

    const {t} = useI18n("RecipeDetailScreen");

    const navigation = useNavigation<any>(); 

    const recipe_id = route?.params?.id
    const userInfo = useSelector((state:any) => state.user.userInfo)

    const [initialLike, setInitialLike] = useState(false)
    const [isLike, setIsLıke] = useState(false)
    const [likeCount, setLıkeCount] = useState(0);

    const [comment, setComment] = useState("");

    const {width, height} = Dimensions.get("screen");
    
    const [index, setIndex] = useState(0);


    const {data, isLoading, isSuccess} = useQuery(
        ["recipe-detail"],
        () => getRecipeById(recipe_id),
    );

    useEffect(() => {
        if(isSuccess){
            setInitialLike(data?.data?.likeData.filter((item:any) => item?.userId == userInfo.userId )[0]?.isLike ?? false)
            setIsLıke(data?.data?.likeData.filter((item:any) => item?.userId == userInfo.userId )[0]?.isLike ?? false);
            setLıkeCount(data?.data?.likeData?.length)
        }
    }, [isSuccess, data, userInfo]);
    
    

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

    console.log("addlikemutation", addlikeMutation);
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

    


    async function handleLıke() {
        setIsLıke(!isLike);
        
        console.log("islikee", !isLike)
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

    async function handleComment() {
        commentMutation.mutate({
            userId: userInfo.userId,
            recipeId: recipe_id,
            comment:comment
        })
    }

    const RenderCommentItem = ({item}:any) => {

        return(
            <View style={{marginVertical:4, paddingVertical:4,}}>
                <View style={{flexDirection:"row"}}>
                    <Pressable onPress={() => navigation.navigate("OtherProfile", {id:item?.user?.userId})}>
                        <Text style={{fontSize:11, fontWeight:"700"}}>{item?.userdata?.user_name} {item?.userdata?.user_surname}</Text>
                    </Pressable>
                    <Text style={{fontSize:12, color:GRAY, marginLeft:7, fontWeight:"600"}}>{getTimeFromNow(item?.createdAt)}</Text>
                </View>
                <Text style={{fontSize:13,marginTop:3}}>{item?.comment}</Text>
            </View>
        )
    }

    const Comments = () => {
        return(
            <View style={{width:"100%", paddingVertical:10 }}>
                <FlatList
                    data={data?.data?.commentData}
                    keyExtractor={(item:any) => item?._id.toString()}
                    renderItem={RenderCommentItem}
                />
    
                <View style={{marginTop: 10,flexDirection: "row", alignItems:"center", }}>
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

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View >

                <View style={{ marginTop: 40 }}>
                    <Image source={require("../assets/images/default_recipe.jpeg")} style={{ width: "100%", height: height * 4 / 10, resizeMode: "cover" }} />
                    <Pressable style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection:"row",justifyContent: 'space-between', 
                    alignItems: 'flex-start', paddingHorizontal: 16 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{backgroundColor:LIGHT_GRAY_2, marginTop:10, borderRadius:180, paddingHorizontal:4, paddingVertical:4}}>
                            <Feather name="arrow-left" size={20} color={GRAY} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleLıke()} style={{backgroundColor:LIGHT_GRAY_2, marginTop:10, 
                            borderRadius:180, paddingHorizontal:4, paddingVertical:4,alignItems:"center", justifyContent:"center"}}>
                            {isLike ? <AntDesign name="heart" size={20} color={LIGHT_RED} /> 
                            : 
                            <AntDesign name="hearto" size={20} color={LIGHT_RED}/>}
                        </TouchableOpacity>

                    </Pressable>
                </View>

                {/* WHITE CARD */}

                <View style={{marginTop:-40,width:width*8/10, borderRadius:15,alignSelf:"center", backgroundColor:WHITE, paddingHorizontal:15,
            paddingVertical:10, ...styles.shadow }}>
                    <Text style={{fontSize:20, fontWeight:"600"}}>{data?.data?.recipe?.recipeName}</Text>
                    <View style={{marginVertical:6, flexDirection:"row", alignItems:"center",}}>
                        <AntDesign name="heart" size={12} color={LIGHT_RED} />
                        <Text style={{ marginLeft: 6, fontSize: 12, fontWeight: "300" }}>
                            {likeCount?.toString()} {likeCount === 1 || likeCount === 0 ? t("like") : t("likes")}
                        </Text>

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

                </View>

        </ScrollView>

    )

   
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:WHITE,
        paddingHorizontal:20
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