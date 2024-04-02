import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { SearchHeader } from "../../components/Header";
import { TextInputComp } from '../../components/Inputs';
import useI18n from "../../hooks/useI18n";
import { getCategories, getRecipeSearch, getUserDetail, getUserSearch } from "../../services/ApiService";
import { userSliceActions } from "../../store/reducer/userSlice";
import { BLACK_COLOR, GRAY, LIGHT_GRAY, LIGHT_GRAY_2, WHITE } from "../../utils/utils";

export default function HomeScreen({ route }: any) {

    const {t} = useI18n("HomeScreen");

    const {width, height} = Dimensions.get('screen');

    const [text, setText] = useState("");

    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>()

    const userInfo = useSelector((state:any) => state.user.userInfo);
    const userId = userInfo?.userId;

    const [searchValue, setSearchValue] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [searchSelectVisible, setSearchSelectVisible] = useState<number>(0)

    const [searchData, setSearchData] = useState<any[]>([]);
    // const [searchUserData, setSearchUserData] = useState<any[]>([]);

    const [searchLoading, setSearchLoading] = useState(false)

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
      console.log(modalVisible)
    }

    function handleSwitch(){
      if(searchSelectVisible == 0){
        setSearchSelectVisible(1);
      }else if(searchSelectVisible == 1){
        setSearchSelectVisible(0)
      }

      setSearchValue("");
    }

    function handleNavigate(id:any){
      if(searchSelectVisible==0){
        navigation.navigate("RecipeDetail", {id:id})
      }else if(searchSelectVisible == 1){
        if(id == userId){
          navigation.navigate("Profile")
        }else{
          navigation.navigate("OtherProfile",{id:id})

        }
      }
    }

    const recipeData = useQuery(
      ["recipe-search"],
      () => getRecipeSearch(searchValue)
      
    );

    const userData = useQuery(
      ["user-search"],
      () => getUserSearch(searchValue)
      
    )
    

    useEffect(() => {
      if (searchSelectVisible === 0) {
        // Tarif arama
        setSearchLoading(true);

        if(searchValue.length == 0){
          setSearchData([]);
        }else{
          setSearchData(recipeData?.data?.data)
        }

      } else if (searchSelectVisible === 1) {
        // Kullanıcı arama
        setSearchLoading(true);
        console.log("data", userData);

        if(searchValue.length == 0){
          setSearchData([]);
        }else{
          setSearchData(userData?.data?.data)

        }

      }

      setSearchLoading(false);


    }, [searchValue])
    

    const Card = ({ item }: any) => {
      return (
        <Pressable onPress={() => navigation.navigate("CategoryDetail", { id: item?._id, name: item?.categoryName })}
        style={{ marginTop: 10, marginHorizontal: 10, width: 100, alignItems: "center" }}>
          <Image source={{ uri: "http://dummyimage.com/118x100.png/ff4444/ffffff" }} style={{ width: 90, height: 90, resizeMode:"cover" }} />
          <Text>{item.categoryName}</Text>
        </Pressable>
      );
    };

    const RenderItem = ({item}:any) => {

      console.log("itemm", item);
      return(
        <TouchableOpacity onPress={() => handleNavigate(item?.id)} style={{flexDirection:'row', marginVertical:7, 
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
              <View style={{height:1, backgroundColor:LIGHT_GRAY, width:"90%", alignSelf: "center", marginTop:4}}/>
              
              <ScrollView style={{}}>
                  
                 <FlatList
                  data={searchData}
                  keyExtractor={item=> item.id}
                  renderItem={RenderItem}
                 />

              </ScrollView>
              
              
            </View >
              


          </Modal>
      )
    }

    if(isLoading){
      return(
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
            <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 50 }}>
          <SearchHeader openModal={openModal} value={text} onChangeValue={setText} placeholder="Search Recipes..." name={userInfo.name ?? ""}
          onPress={() => navigation.navigate("Profile")} id={userId}/>
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
