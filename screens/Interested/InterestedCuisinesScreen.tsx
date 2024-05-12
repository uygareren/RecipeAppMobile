import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Divider } from "../../components/Divider";
import { TopHeader } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { HomeRecipeRenderComponent } from "../../components/Render/HomeRecipeRenderComponent";
import { getInterestedData, getRecipeByInterestId, getRecipeByInterests } from "../../services/ApiService";
import { RootStateType } from "../../store/store";
import { LIGHT_GRAY_2, MAIN_COLOR, WHITE } from "../../utils/utils";


export default function InterestedCuisinesScreen(){

    const {width} = Dimensions.get("screen");

    const navigation = useNavigation<any>();

    const userInfo = useSelector((state:RootStateType) => state.user.userInfo);

    const [selectedCategory, setSelectedCategory] = useState("");


    const { mutate: interestMutation, isLoading: loading_1, data: interestMutationData } = useMutation<any, unknown, any, unknown>({
        mutationKey:["recipe-by-interests"],
        mutationFn: getRecipeByInterests,
        onSuccess(data, variables, context) {
        },
    });
    
    const { mutate: interestRecipeByIdMutation, isLoading: loading_2, data: interestRecipeByIdMutationData } = useMutation<any, unknown, any, unknown>({
        mutationKey: ["recipe-by-interest"],
        mutationFn: getRecipeByInterestId,
        onSuccess(data, variables, context) {
            console.log("dataaaaa", data);
        },
    });
    
    console.log("interestMutation", interestMutationData);
    console.log("interestRecipeByIdMutation", interestRecipeByIdMutationData);
    
    useEffect(() => {
        if (userInfo?.interests != null) {
            if(selectedCategory === "") {
                const payload = {
                    interests_data_by_user: [...userInfo?.interests]
                };
                interestMutation(payload);
            } else {
                const payload = {
                    interest_id: selectedCategory
                }
                interestRecipeByIdMutation(payload);
            }
        }
    }, [userInfo, selectedCategory]);


    const {data, isLoading} = useQuery({
        queryKey: ["get-all-world-cuisines"],
        queryFn: getInterestedData
    })  


    const renderWorldCuisinesItem = (item:any) => {
        return(
            <TouchableOpacity onPress={() => setSelectedCategory(item?.item?._id)} style={{marginRight:10,
            backgroundColor:selectedCategory == item?.item?._id ? MAIN_COLOR : LIGHT_GRAY_2, paddingVertical:10, paddingHorizontal:6, borderRadius:10}}>
                <Text style={{fontSize:12, fontWeight:"500"}}>{item?.item?.type}</Text>
            </TouchableOpacity>
        )
        
    }

    return(
        <View style={styles.container}>

            <View style={{ marginTop: 40 }}>
                <TopHeader title={"İlgilendiğim Mutfaklar"} />
                <Divider height={1} width={width*0.8} style={{backgroundColor: LIGHT_GRAY_2, alignSelf: "center", marginTop: 5}}/>
            </View>

            {/* <View style={{height:50, borderWidth:1, justifyContent:"center", alignItems:"center",paddingHorizontal:20}}>
                <TouchableOpacity style={{backgroundColor:LIGHT_GRAY, paddingVertical:10, paddingHorizontal:6, borderRadius:10}}>
                    <Text>İlgilendiğim Mutfaklar</Text>
                </TouchableOpacity>
            </View> */}
            <View style={{paddingHorizontal:20,marginTop:20,flexDirection:"row",}}>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => setSelectedCategory("")} style={{marginRight:10,
                    backgroundColor:selectedCategory == "" ? MAIN_COLOR : LIGHT_GRAY_2, paddingVertical:10, paddingHorizontal:6, borderRadius:10}}>
                        <Text style={{fontSize:12, fontWeight:"500"}}>İlgilendiğim Tüm Mutfaklar</Text>
                    </TouchableOpacity>  
                    

                    <FlatList
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={data?.data[0].cuisines_name}
                    keyExtractor={(item) => item?._id.toString()}
                    renderItem={renderWorldCuisinesItem}
                />
                </ScrollView>
                
            </View>

                {loading_1 || loading_2 ? (
                    <View style={{height:"100%",alignItems:"center", justifyContent:"center", backgroundColor:WHITE}}>
                        <Loading/>
                    </View>
                ):(
                    (selectedCategory == "" ? (
                        (interestMutationData?.data?.length > 0 ? (
                            <View style={{ marginTop: 50 }}>
                                <FlatList
                                    data={interestMutationData?.data}
                                    keyExtractor={(item) => item?._id.toString()}
                                    renderItem={({ item }) => <HomeRecipeRenderComponent navigation={navigation} userId={userInfo?.userId} item={item} />}
                                />
                            </View>
                        ): (
                            <View style={{height:"100%",alignItems:"center", justifyContent:"center", backgroundColor:WHITE}}>
                                <Text style={{fontSize:22, fontWeight:"500"}}>Hiç Tarif Yok!</Text>
                            </View>
                        ))
                        
                    ): (
                        (interestRecipeByIdMutationData?.data?.length > 0 ? (
                            <View style={{ marginTop: 50 }}>
                                <FlatList
                                    data={interestRecipeByIdMutationData?.data}
                                    keyExtractor={(item) => item?._id.toString()}
                                    renderItem={({ item }) => <HomeRecipeRenderComponent navigation={navigation} userId={userInfo?.userId} item={item} />}
                                />
                            </View>
                        ): (
                            <View style={{height:"100%",alignItems:"center", justifyContent:"center", backgroundColor:WHITE}}>
                                <Text style={{fontSize:22, fontWeight:"500"}}>Hiç Tarif Yok!</Text>
                            </View>
                        ))
                        
                    ))
                )}

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:WHITE,
        paddingBottom:150
    }
})