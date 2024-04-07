import { AntDesign, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from '../../components/Divider';
import { SearchHeader } from '../../components/Header';
import { TextInputComp } from '../../components/Inputs';
import SkeletonComp from '../../components/Skeleton';
import useI18n from "../../hooks/useI18n";
import { getCategories, getRecipeSearch, getUserDetail, getUserSearch } from "../../services/ApiService";
import { userSliceActions } from "../../store/reducer/userSlice";
import { BLACK_COLOR, GRAY, keyGenerator, LIGHT_GRAY, LIGHT_GRAY_2, WHITE } from "../../utils/utils";

export default function HomeScreen({ route }: any) {

    const {t} = useI18n("HomeScreen");

    const {width, height} = Dimensions.get('screen');

    const [text, setText] = useState("");

    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>()

    const userInfo = useSelector((state:any) => state.user.userInfo);
    const userId = userInfo?.userId;

    const key = keyGenerator("searched_values", userId);


    const [searchValue, setSearchValue] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [searchSelectVisible, setSearchSelectVisible] = useState<number>(0)

    const [searchData, setSearchData] = useState<any[]>([]);

    const [previusSearchedData, setPreviusSearchedData] = useState<any>([]);
    // const [searchUserData, setSearchUserData] = useState<any[]>([]);

    const [searchLoading, setSearchLoading] = useState(false)

    const recipeData = useQuery(
      ["recipe-search"],
      () => getRecipeSearch(searchValue)
      
    );

    const userData = useQuery(
      ["user-search"],
      () => getUserSearch(searchValue)
      
    )
    
    const {data, isLoading} = useQuery({
      queryKey: ["categories"],
      queryFn: getCategories
    })

    const user_detail = useQuery(
      ['get_user_detail', userId],
      () => getUserDetail(userId),
    );

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

      if(searchSelectVisible==0){

        handleSaveValues(item?.recipeName);
        navigation.push("RecipeDetail", {id:item?.id})
      }else if(searchSelectVisible == 1){
        const value = `${item?.name} ${item?.surname}`;
        handleSaveValues(value);

        if(item?.id == userId){
          navigation.push("Profile")
        }else{
          navigation.push("OtherProfile",{id:item?.id})

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

    useEffect(() => {
      if (searchSelectVisible === 0) {
        // Tarif arama

        if(searchValue.length == 0){
          setSearchData([]);
        }else{
          setSearchData(recipeData?.data?.data)
        }

      } else if (searchSelectVisible === 1) {
        // Kullanıcı arama
        setSearchLoading(true);
        // console.log("data", userData);

        if(searchValue.length == 0){
          setSearchData([]);
        }else{
          setSearchData(userData?.data?.data)

        }

      }

      setSearchLoading(false);


    }, [searchValue])

    useEffect(() => {

      // const getStoredData = async () => {
      //   try {
      //     const storedValues = await AsyncStorage.getItem(key);
      //     if (storedValues !== null) {
      //       setPreviusSearchedData(JSON.parse(storedValues));
      //     }
      //   } catch (error) {
      //     console.error("Error retrieving data from AsyncStorage:", error);
      //   }
      // };
    
      // getStoredData(); 

      const key = keyGenerator("interest",userInfo?.userId)
      let value :any;
      AsyncStorage.getItem(key).then((storedValue) => value = storedValue);

      console.log("key", key);
      console.log("value", value);

      
    }, []);
    
    
    

    const Card = ({ item }: any) => {
      return (
        <Pressable onPress={() => navigation.navigate("CategoryDetail", { id: item?._id, name: item?.categoryName })}
        style={{ marginTop: 10, marginHorizontal: 10, width: 100, alignItems: "center" }}>
          <Image source={{ uri: "http://dummyimage.com/118x100.png/ff4444/ffffff" }} style={{ width: 90, height: 90, resizeMode:"cover" }} />
          <Text>{item.categoryName}</Text>
        </Pressable>
      );
    };

    const RenderSearchItem = ({item}:any) => {

      return(
        <TouchableOpacity onPress={() => handleNavigate(item)} style={{flexDirection:'row', marginVertical:7, 
          paddingHorizontal:15, paddingVertical:7,alignItems:'center'}}>
            <View style={{width:50, height:50, borderRadius:180}}>
              <Image style={{width: 50, height:50, borderRadius:180}} source={require("../../assets/images/default_profile.jpg")}/>
            </View>
            {searchSelectVisible == 0 ? (
            <Text style={{marginLeft:15, fontWeight:'500', fontSize:15}}>{item?.recipeName}</Text>

            ): 
            (<Text style={{marginLeft:15, fontWeight:'500', fontSize:15}}>{item?.name}</Text>
            )
            }
        </TouchableOpacity>
      )
    }

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

    if(modalVisible){
      return(
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

                <TouchableOpacity onPress={handleSwitch} style={{width:width*0.5, backgroundColor:"white", alignItems:'center', justifyContent:'center',
              paddingVertical:7}}>
                  <Text style={{fontWeight:'500', fontSize:13}}>Tarifler</Text>
                  {searchSelectVisible == 0 ? (
                  <View style={{height:2, backgroundColor:BLACK_COLOR, width:width*0.25, marginTop:4}}/>
                ): null}
                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleSwitch} style={{width:width*0.5, backgroundColor:"white",alignItems:'center', justifyContent:'center',
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
      )
    }

    if(isLoading){
      return(
        <SkeletonComp/>
      )
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 50 }}>
          <SearchHeader openModal={openModal} value={text} onChangeValue={setText} placeholder="Search Recipes..." name={userInfo.name ?? ""}
          onPress={() => navigation.navigate("Profile")} id={userId} greeting={t("greeting")} title={t("title")}/>
        </View>

        <View style={{ marginTop: 20, marginLeft: 20, }}>
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

        <View style={{ marginTop: 50, marginLeft: 20, }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 10 }}>{t("popular_foods")}</Text>

          {/* CARD */}
          {/* <FlatList
            data={category_data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={Card}
            horizontal
            showsHorizontalScrollIndicator={false} 
          /> */}
        </View>
      </SafeAreaView>
    );

    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
