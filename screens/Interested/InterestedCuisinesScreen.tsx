import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Divider } from "../../components/Divider";
import { TopHeader } from "../../components/Header";
import { Loading } from '../../components/Loading';
import { HomeRecipeRenderComponent } from "../../components/Render/HomeRecipeRenderComponent";
import { getInterestedData, getRecipeByInterestId, getRecipeByInterests } from "../../services/ApiService";
import { RootStateType } from "../../store/store";
import { BLACK_COLOR, BORDER_RADIUS_1, BORDER_RADIUS_2, CONTAİNER_HORİZONTAL, GRAY_2, LIGHT_GRAY_2, MAIN_COLOR_2, MAIN_COLOR_GREEN, SOFT_BLUE, WHITE } from "../../utils/utils";


export default function InterestedCuisinesScreen(){

    const mockFilterData = [
        {
            id: "1",
            name: "Alfabetik Sıra"
        },
        {
            id: "2",
            name: "En Eski Tarifler"
        },
        {
            id: "3",
            name: "En Yeni Tarifler"
        },

    ]

    const {width} = Dimensions.get("screen");

    const navigation = useNavigation<any>();

    const userInfo = useSelector((state:RootStateType) => state.user.userInfo);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedFilterId, setSelectedFilterId] = useState<string>();

    const bottomSheetRef = useRef<any>();
    const snapPoints = ["40%","75%"];

    const handlePresentModal = () => {
        bottomSheetRef.current?.present();
      }

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
    });
    
    const NoAvaliableData = () => {
        return(
            <View style={{height:"100%",alignItems:"center", justifyContent:"center", backgroundColor:WHITE}}>
                <View style={{ alignItems:'center', justifyContent:'center'}}>
                    <Image source={require('../../assets/images/cooking.jpg')} 
                    style={{width:width*0.35, height:width*0.35, borderRadius:BORDER_RADIUS_1, resizeMode:'cover', 
                    
                    }}/>
                    <View style={{ marginTop:24, alignItems:'center'}}>
                        <Text style={{fontSize:20, fontWeight:'600', color:BLACK_COLOR, textAlign:'center'}}>
                            Bu Mutfağa Ait Hiç Tarif Yok...
                        </Text>
                        <Text style={{marginTop:5, fontSize:16, fontWeight:'500', color:GRAY_2, textAlign:'center'}}>
                            Diğer mutfakları keşfetmeye devam edebilirsin
                        </Text>
                    </View>
                </View>
            </View>
        )
    }


    const renderWorldCuisinesItem = (item:any) => {
        return(
            <TouchableOpacity onPress={() => setSelectedCategory(item?.item?._id)} style={{marginRight:10,
            backgroundColor:selectedCategory == item?.item?._id ? MAIN_COLOR_GREEN : LIGHT_GRAY_2, paddingVertical:10, paddingHorizontal:6, borderRadius:10}}>
                <Text style={{fontSize:12, fontWeight:"500", color: selectedCategory == item?.item?._id ? WHITE: BLACK_COLOR}}>{item?.item?.type}</Text>
            </TouchableOpacity>
        )
        
    }

    if(loading_1 || loading_2 || isLoading){
        return(
            <View style={{flex:1, backgroundColor:WHITE}}>
                <Loading/>
            </View>
        )
    }

    return(
        <GestureHandlerRootView style={{flex:1}}>
            <BottomSheetModalProvider>
                <View style={styles.container}>

                    <View style={{ marginTop: 40 }}>
                        <TopHeader title={"İlgilendiğim Mutfaklar"} />
                        <Divider height={1} width={width*0.8} style={{backgroundColor: LIGHT_GRAY_2, alignSelf: "center", marginTop: 5}}/>
                    </View>

                    {/* <View style={{height:50,  justifyContent:"center", alignItems:"center",paddingHorizontal:20}}>
                        <TouchableOpacity style={{backgroundColor:LIGHT_GRAY, paddingVertical:10, paddingHorizontal:6, borderRadius:10}}>
                            <Text>İlgilendiğim Mutfaklar</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{paddingHorizontal:0,marginTop:20,flexDirection:"row", width:width*0.9}}>
                        <View style={{width:width*0.8}}>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity onPress={() => setSelectedCategory("")} style={{marginRight:10,
                            backgroundColor:selectedCategory == "" ? MAIN_COLOR_GREEN : LIGHT_GRAY_2, paddingVertical:10, paddingHorizontal:6, borderRadius:10}}>
                                <Text style={{fontSize:12, fontWeight:"500", color: selectedCategory == "" ? WHITE: BLACK_COLOR}}>İlgilendiğim Tüm Mutfaklar</Text>
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

                        <TouchableOpacity onPress={handlePresentModal} 
                        style={{position:'absolute', right:-4, top:4, backgroundColor:MAIN_COLOR_GREEN,
                            padding:5, borderRadius:BORDER_RADIUS_2
                        }}>
                            <Ionicons name="filter-sharp" size={18} color="white" />
                        </TouchableOpacity>
                        
                    </View>

                    <View>
                        {selectedCategory == "" ? (
                            interestMutationData?.data?.length > 0 ? (
                                <View style={{ marginTop: 50 }}>
                                    <FlatList
                                        data={interestMutationData?.data}
                                        keyExtractor={(item) => item?._id.toString()}
                                        renderItem={({ item }) => <HomeRecipeRenderComponent navigation={navigation} userId={userInfo?.userId} item={item} />}
                                    />
                                </View>
                            ) : (
                                <NoAvaliableData />
                            )
                        ) : (
                            interestRecipeByIdMutationData?.data?.length > 0 ? (
                                <View style={{ marginTop: 50 }}>
                                    <FlatList
                                        data={interestRecipeByIdMutationData?.data}
                                        keyExtractor={(item) => item?._id.toString()}
                                        renderItem={({ item }) => <HomeRecipeRenderComponent navigation={navigation} userId={userInfo?.userId} item={item} />}
                                    />
                                </View>
                            ) : (
                                <NoAvaliableData />
                            )
                        )}
                    </View>

                        
                  
                </View>
                <BottomSheetModal ref={bottomSheetRef} index={0} snapPoints={snapPoints} 
                handleIndicatorStyle={{backgroundColor:BLACK_COLOR}} 
                backgroundStyle={{backgroundColor:WHITE}}>
                    <View style={{flex:1, backgroundColor:WHITE}}>

                        <View style={{alignItems:'center', marginTop:10}}>
                            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center',width:width}}>
                                <Text style={{fontSize:17, fontWeight:'300'}}>Filtreler</Text>
                                <TouchableOpacity onPress={() => setSelectedFilterId("")} style={{position:"absolute", right: 15,borderWidth:2, borderColor:MAIN_COLOR_2,
                                    paddingHorizontal:12, borderRadius:4
                                }}>
                                    <Text style={{fontSize:12, color:MAIN_COLOR_2, fontWeight:'700'}}>Temizle</Text>
                                </TouchableOpacity>
                            </View>
                            <Divider height={1} width={"90%"}/>
                            <View style={{marginTop:10}}>
                                {mockFilterData.map((item:any)=> (
                                    <TouchableOpacity onPress={() => setSelectedFilterId(item.id)} style={{borderRadius:BORDER_RADIUS_1, flexDirection:'row', width:width-50, paddingHorizontal:30,
                                    justifyContent:'space-between', paddingVertical:16, marginTop:12, backgroundColor:SOFT_BLUE
                                }}>
                                    <Text style={{fontSize:14, fontWeight:'500', color:BLACK_COLOR}}>{item.name}</Text>
                                    {item.id == selectedFilterId ? (
                                        <View style={{borderWidth:3, borderColor:MAIN_COLOR_GREEN, width:20, height:20, borderRadius:360,
                                         alignItems:'center', justifyContent:'center'
                                    }}>
                                        <View style={{width:10, height:10, backgroundColor:MAIN_COLOR_GREEN, borderRadius:360}}/>
                                    </View>
                                    ):null}
                                    
                                </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        

                    </View>
                </BottomSheetModal>
            </BottomSheetModalProvider>

        </GestureHandlerRootView>

    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:WHITE,
        paddingBottom:150,
        paddingHorizontal:CONTAİNER_HORİZONTAL
    }
})