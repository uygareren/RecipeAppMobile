import { AntDesign, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from '../../components/Divider';
import { SearchHeader } from '../../components/Header';
import { TextInputComp } from '../../components/Inputs';
import { HomeRecipeRenderComponent } from '../../components/Render/HomeRecipeRenderComponent';
import SkeletonComp from '../../components/Skeleton';
import useI18n from "../../hooks/useI18n";
import { getCategories, getFollowerRecipe, getRecipeSearch, getUserDetail, getUserSearch } from "../../services/ApiService";
import { userSliceActions } from "../../store/reducer/userSlice";
import { BLACK_COLOR, GRAY, keyGenerator, LIGHT_GRAY, LIGHT_GRAY_2, WHITE } from "../../utils/utils";

export default function HomeScreen({ route }: any) {

    const API = process.env.API;

    const {t} = useI18n("HomeScreen");

    const {width, height} = Dimensions.get('screen');

    const [text, setText] = useState("");

    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>()

    const userInfo = useSelector((state:any) => state.user.userInfo);
    const userId = userInfo?.userId;

    const key = keyGenerator("searched_values", userId);

    const [backPressCount, setBackPressCount] = useState(0);

    const [isLoading, setIsLoading] = useState(true); // State to track loading state


    const [searchValue, setSearchValue] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [searchSelectVisible, setSearchSelectVisible] = useState<number>(0)

    const [searchData, setSearchData] = useState<any[]>([]);

    const [recipeData, setRecipeData] = useState<any[]>([]);

    const [previusSearchedData, setPreviusSearchedData] = useState<any>([]);
    // const [searchUserData, setSearchUserData] = useState<any[]>([]);

    const [searchLoading, setSearchLoading] = useState(false)

  
    const {data} = useQuery({
      queryKey: ["categories"],
      queryFn: getCategories
    })

   
    const user_detail = useQuery(
      ['get_user_detail', userId],
      () => getUserDetail(userId),
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

    function openModal(){
      setModalVisible(!modalVisible);
    }

    function handleSwitch(){
      if(searchSelectVisible == 0){
        setSearchSelectVisible(1);
      }else if(searchSelectVisible == 1){
        setSearchSelectVisible(0)
      }

      setSearchValue("");
    }


    async function handleNavigate(item:any){

      console.log("item", item);

      if(searchSelectVisible==0){

        handleSaveValues(item?.recipeName);
        navigation.push("RecipeDetail", {id:item?.id})
      }else if(searchSelectVisible == 1){
        const value = `${item?.name} ${item?.surname}`;
        handleSaveValues(value);

        if(item?.id == userId){
          navigation.push("Profile")
        }else{
          navigation.navigate("OtherProfile",{id:item?.id})

        }
      }

      setModalVisible(false);
      setSearchValue("");

    }

    function handleSaveValues(value:string){

      let index = previusSearchedData.indexOf(value);

      if(index != -1){
        previusSearchedData.splice(index,1);
        setPreviusSearchedData((prev:any) => [value, ...prev])
      }else{
        if(previusSearchedData.length < 5){
          setPreviusSearchedData((prev:any) =>  [value, ...prev])
        }else if(previusSearchedData.length == 5){
          previusSearchedData.pop();
          setPreviusSearchedData((prev:any) => [value, ...prev])
        }
      }
      AsyncStorage.setItem(key, JSON.stringify(previusSearchedData));
            
    }

    // useEffect(() => {
    //   const backAction = () => {
    //     if (backPressCount === 1) {
    //       Alert.alert(
    //         'Çıkış',
    //         'Çıkış Yapmak İstediğinizden Emin misiniz?',
    //         [
    //           {
    //             text: 'Cancel',
    //             onPress: () => null,
    //             style: 'cancel',
    //           },
    //           {
    //             text: 'Leave',
    //             onPress: () => BackHandler.exitApp(),
    //           },
    //         ],
    //       );
    //       setBackPressCount(0); 
    //       return true; 
    //     } else {
    //       setBackPressCount(1);
    //       setTimeout(() => setBackPressCount(0), DOUBLE_PRESS_INTERVAL);
    //       return true; 
    //     }
    //   };
  
    //   const backHandler = BackHandler.addEventListener(
    //     'hardwareBackPress',
    //     backAction,
    //   );
  
    //   return () => backHandler.remove(); 
    // }, [backPressCount]);

    useEffect(() => {
      if(userInfo?.userId){
        const payload = {user_id:userInfo?.userId};
        recipeDataMutation.mutate(payload);

      }

    }, [userInfo]);

    // console.log("recipe data", recipeDataMutation?.data?.data);

    useEffect(() => {
      const timer = setTimeout(() => {
          setIsLoading(false); // After 4 seconds, set loading state to false
      }, 4000);

      return () => clearTimeout(timer); // Clear the timer on unmount
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {

          if(searchSelectVisible == 0){

            const result = await getRecipeSearch(searchValue);

            console.log("result", result?.data);
            setSearchData(result?.data);
          }else if(searchSelectVisible == 1){
            
            const result = await getUserSearch(searchValue);

            console.log("result", result?.data);
            setSearchData(result?.data);
          }

    
        } catch (error) {
          console.error("Error fetching recipe data:", error);
        }
      };
    
      // searchValue değiştiğinde fetchData fonksiyonunu çağır
      if (searchValue) {
        fetchData();
      }
    }, [searchValue]);
    
    
    useEffect(() => {

      const key = keyGenerator("interest",userInfo?.userId)
      let value :any;
      AsyncStorage.getItem(key).then((storedValue) => value = storedValue);

      
      
    }, []);

    if(data == undefined){
      return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:WHITE}}>
          <Text style={{fontSize:22, fontWeight:'500'}}>Sunucuya Bağlanılamadı!</Text>
        </View>
      )
    }

    if (isLoading) {
      // Render SkeletonComp for the first 4 seconds
      return <SkeletonComp />;
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

    const RenderSearchItem = ({item}: any) => {

      console.log("itemmm", item);
      return (
        <TouchableOpacity onPress={() => handleNavigate(item)} style={{flexDirection:'row', marginVertical:7, paddingHorizontal:15, paddingVertical:7, alignItems:'center'}}>
          <View style={{width:width*0.1, height:width*0.1, borderRadius:360, justifyContent:'center', alignItems:'center', borderWidth:1}}>
            {searchSelectVisible === 0 ? (
              // If searching for recipes, render recipe image
              <Image style={{width:width*0.1, height:width*0.1, borderRadius:180, resizeMode:'cover'}} source={{uri: `${API}/recipes/${item?.image}`}}/>
            ) : (
              // If searching for users, render profile image
              <Image style={{width:width*0.09, height:width*0.09, borderRadius:360, resizeMode:'cover'}} source={item?.image ? {uri: `${API}/images/${item?.image}`} : require("../../assets/images/default_profile.jpg")}/>
            )}
          </View>
          <Text style={{marginLeft:15, fontWeight:'500', fontSize:15}}>
            {searchSelectVisible === 0 ? item?.recipeName : `${item?.name} ${item?.surname}`}
          </Text>
        </TouchableOpacity>
      );
    };
    

    const RenderPreviusSearchData = ({item}:any) => {


      return(
        <View style={{flexDirection:"row", justifyContent:'space-between', paddingHorizontal:30, paddingVertical:7,
          alignItems:'center'}}>
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => setSearchValue(item)}>
              <Feather name="arrow-up-left" size={24} color={GRAY} />
            </TouchableOpacity>
        </View>
      )
    }

   
    return (
      <ScrollView style={styles.container}>
        <View style={{ marginTop: 50 }}>
          <SearchHeader openModal={openModal} value={text} onChangeValue={setText} placeholder="Search Recipes..." name={userInfo.name ?? ""}
          onPress={() => navigation.navigate("Profile")} id={userId} greeting={t("greeting")} title={t("title")}/>
        </View>

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

        

        {recipeDataMutation?.data?.data.length > 0 ? (
            <View style={{ marginTop: 50, }}>
                <FlatList
                    data={recipeDataMutation?.data?.data}
                    keyExtractor={(item:any) => item?._id.toString()}
                    renderItem={({item}) => <HomeRecipeRenderComponent navigation={navigation} userId={userInfo?.userId} item={item}/>}
                />
            </View>
            ): (
            null
            )}
       
        <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} >
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
          </Modal>
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
