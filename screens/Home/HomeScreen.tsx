import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { SearchHeader } from '../../components/Header';
import { MakeRecipeContext } from '../../context/MakeRecipeContext';
import useI18n from "../../hooks/useI18n";
import { getCategories, getContinuousMeals, getFollowerRecipe, getMadeMeals, getUserDetail } from "../../services/ApiService";
import { userSliceActions } from "../../store/reducer/userSlice";
import { LIGHT_GRAY, LIGHT_GRAY_2, WHITE } from "../../utils/utils";

export default function HomeScreen({ route }: any) {

    const API = process.env.API;

    const {recipe, setRecipe} = useContext(MakeRecipeContext);

    const {t} = useI18n("HomeScreen");

    const {width, height} = Dimensions.get('screen');

    const [text, setText] = useState("");

    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>()

    const userInfo = useSelector((state:any) => state.user.userInfo);
    const userId = userInfo?.userId;

    const [isLoading, setIsLoading] = useState(true); // State to track loading state


    const {data} = useQuery({
      queryKey: ["categories"],
      queryFn: getCategories
    })

   
    const user_detail = useQuery(
      ['get_user_detail', userId],
      () => getUserDetail(userId),
    );

    const { data:madeMeals, isLoading:isMadeMeals } = useQuery(
      ["get-made-meals-by-user"],
      () => getMadeMeals(userInfo?.userId),
      {
          onSuccess(data) {
              // Optional: You can set initial recipe data here if needed.
              console.log("data",data);
          },
      }
  );
  
  const { data:continuousMeals, error, isLoading:isContinuous } = useQuery(
    ["get-continuous-made-meals", userId, recipe],
    () => getContinuousMeals(userId),
    {
      enabled: !!recipe, // The query will not execute until the recipe is truthy
    }
  );

    
    const recipeDataMutation = useMutation({
      mutationKey:["recipe-by-follower"],
      mutationFn: getFollowerRecipe,
      onSuccess(data, variables, context) {
      },
    });


    if(user_detail.isSuccess){
      dispatch(userSliceActions.setUser(user_detail?.data?.user))

    }

    function openSearchScreen(){
      // setModalVisible(!modalVisible);
      navigation.navigate("SearchIngredientsOrUser");
      
    }


    useEffect(() => {
      if(userInfo?.userId){
        const payload = {user_id:userInfo?.userId};
        recipeDataMutation.mutate(payload);

      }

    }, [userInfo]);

    // console.log("recipe data", recipeDataMutation?.data?.data);

    // useEffect(() => {
      
    //   const timer = setTimeout(() => {
    //       setIsLoading(false); // After 4 seconds, set loading state to false
    //   }, 4000);

    //   return () => clearTimeout(timer); // Clear the timer on unmount
    // }, []);

  
    useEffect(() => {
      if (data) {
        console.log("continuousMeals", data?.data?.length);
      }
    }, [continuousMeals]);

   
   
    if (isLoading) {
      // Render SkeletonComp for the first 4 seconds
      // return <SkeletonComp />;
    }


    const Card = ({ item }: any) => {
      return (
        <Pressable onPress={() => navigation.navigate("CategoryDetail", { id: item?._id, name: item?.categoryName })}
        style={{ marginTop: 10, borderRadius:10, marginHorizontal: 10, width: width*0.3, height:width*0.3, alignItems: "center",justifyContent:'center',  ...styles.shadow, borderWidth:0 }}>
          <Image source={{ uri: `${API}/categories/${item?.categoryImage}` }} style={{ borderRadius:10, width: width*0.25, height: width*0.2, resizeMode:"contain" }} />
          <Text style={{fontSize:13, fontWeight:'500'}}>{item.categoryName}</Text>
        </Pressable>
      );
    };


   
    return (
      <ScrollView style={styles.container}>
        <View style={{ marginTop: 50 }}>
          <SearchHeader openModal={openSearchScreen} value={text} onChangeValue={setText} placeholder="Search Recipes..." name={userInfo.name ?? ""}
          onPress={() => navigation.navigate("Profile")} id={userId} greeting={t("greeting")} title={t("title")}/>
        </View>

        {
          true  ? (
            <Pressable onPress={() => navigation.push("MakeRecipe")} 
            style={{ width:width-40, backgroundColor:LIGHT_GRAY_2, marginTop:20, alignSelf:'center', borderRadius:10, paddingVertical:8,
                paddingHorizontal:12, alignItems:'center', 
              }}>
               <Text style={{fontWeight:'500'}}>Tarifler Yapılıyor...</Text>
            </Pressable>
          ):
          null
        }
        

        <View style={{ marginTop: 20, marginLeft: 20, paddingVertical:10}}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 10 }}>{t("categories")}</Text>

          {/* CARD */}
          {
            data && 
            <FlatList
            data={data?.data}
            keyExtractor={(item) => item._id.toString()}
            renderItem={Card}
            horizontal
            showsHorizontalScrollIndicator={false} 
          />
          }
          
        </View>

        

        {/* {recipeDataMutation?.data?.data.length > 0 ? (
            <View style={{ marginTop: 50, }}>
                <FlatList
                    data={recipeDataMutation?.data?.data}
                    keyExtractor={(item:any) => item?._id.toString()}
                    renderItem={({item}) => <HomeRecipeRenderComponent navigation={navigation} userId={userInfo?.userId} item={item}/>}
                />
            </View>
            ): (
            null
            )} */}
       
          {/* <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} >
            <View style={{flex:1, backgroundColor:WHITE}}>

              <View style={{flexDirection:"row",alignItems:'center', paddingHorizontal:20, paddingVertical:15,}}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Feather name="arrow-left" size={28} color={GRAY} />
                </TouchableOpacity>

                <TextInputComp value={searchValue} onchangeValue={setSearchValue} placeholder='Ara..' 
                styleInput={{paddingVertical:7, paddingHorizontal: 7,
                 width:width*0.7, borderRadius: 15}}
                styleInputContainer={{borderWidth:1,width:width*0.82,borderColor:LIGHT_GRAY,backgroundColor: LIGHT_GRAY_2,
                  borderRadius: 15, marginBottom:7, marginLeft:7}}
                />
                {searchValue ? (
                  <TouchableOpacity onPress={() => setSearchValue("")} style={{position:'absolute', right:30,}}>
                  <AntDesign name="closecircleo" size={20} color={GRAY} />
                </TouchableOpacity>
                ): null}
                

              </View>
              <View style={{marginBottom:5, alignItems:'center'}}>
                <Text style={{fontWeight:'600', color:GRAY, fontSize:15}}>Tarif adı veya Kullanıcı ara</Text>
              </View>

              <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:8}}>

                <TouchableOpacity onPress={handleSwitch} style={{width:width*0.5, backgroundColor:WHITE, alignItems:'center', justifyContent:'center',
              paddingVertical:7}}>
                  <Text style={{fontWeight:'500', fontSize:13}}>Tarifler</Text>
                  {searchSelectVisible == 0 ? (
                  <View style={{height:2, backgroundColor:BLACK_COLOR, width:width*0.25, marginTop:4}}/>
                ): null}
                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleSwitch} style={{width:width*0.5, backgroundColor:WHITE,alignItems:'center', justifyContent:'center',
              paddingVertical:7}}>
                  <Text style={{fontWeight:'500', fontSize:13}}>Kullanıcılar</Text>
                  {searchSelectVisible == 1 ? (
                  <View style={{height:2, backgroundColor:BLACK_COLOR, width:width*0.25, marginTop:4}}/>
                ): null}
                </TouchableOpacity>

              </View>
              <Divider height={1} width={"90%"} style={{alignSelf:'center', marginTop:4}}/>
              
              <ScrollView style={{}}>
                  
                 {searchValue.length > 0 ? (
                  <FlatList
                  data={searchData}
                  keyExtractor={item=> item.id}
                  renderItem={RenderSearchItem}
                 />
                 ):
                 (
                  <FlatList
                    data={previusSearchedData}
                    keyExtractor={item=> item.id}
                    renderItem={RenderPreviusSearchData}
                  />
                 )
                 } 
                 

              </ScrollView>
            </View >
          </Modal> */}
      </ScrollView>
    );

    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  shadow:{
    shadowColor:LIGHT_GRAY,
    shadowOffset:{
        width:4,
        height:2
    },
    shadowOpacity:0.1,
    shadowRadius:1,
    elevation:9
}
});
