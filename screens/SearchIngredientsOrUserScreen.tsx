import { AntDesign, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { Divider } from "../components/Divider";
import { TopHeader } from "../components/Header";
import { TextInputComp } from "../components/Inputs";
import { getRecipeSearch, getUserSearch } from "../services/ApiService";
import { BORDER_RADIUS_2, CONTAİNER_HORİZONTAL, GRAY, GRAY_2, LIGHT_GRAY_2, SOFT_BLUE, WHITE, keyGenerator } from "../utils/utils";

export default function SearchIngredientsOrUserScreen(){

    const API = process.env.API;


    const {width, height} = Dimensions.get("screen");
    const navigation = useNavigation<any>()

    const userInfo = useSelector((state:any) => state.user.userInfo);
    const userId = userInfo?.userId;

    const key = keyGenerator("searched_values", userId);

    const [searchValue, setSearchValue] = useState("");
    const [searchSelectVisible, setSearchSelectVisible] = useState<number>(0);
    const [searchData, setSearchData] = useState<any[]>([]);
    const [previusSearchedData, setPreviusSearchedData] = useState<any>([]);


    function handleSwitch(){
        if(searchSelectVisible == 0){
          setSearchSelectVisible(1);
        }else if(searchSelectVisible == 1){
          setSearchSelectVisible(0)
        }
  
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
            navigation.navigate("OtherProfile",{id:item?.id})
  
          }
        }
  
        // setModalVisible(false);
        setSearchValue("");
  
      }

      useEffect(() => {
        const fetchData = async () => {
          try {
  
            if(searchSelectVisible == 0){
  
              const result = await getRecipeSearch(searchValue);
  
              setSearchData(result?.data);
            }else if(searchSelectVisible == 1){
              
              const result = await getUserSearch(searchValue);
  
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

      const RenderSearchItem = ({item}: any) => {

        return (
          <TouchableOpacity onPress={() => handleNavigate(item)} style={{flexDirection:'row', marginVertical:7, paddingHorizontal:15, paddingVertical:7, alignItems:'center'}}>
            <View style={{width:width*0.1, height:width*0.1, borderRadius:360, justifyContent:'center', alignItems:'center', borderWidth:1}}>
              {searchSelectVisible === 0 ? (
                // If searching for recipes, render recipe image
                <Image style={{width:width*0.1, height:width*0.1, borderRadius:180, resizeMode:'cover'}} source={{uri: `${API}/recipes/${item?.image}`}}/>
              ) : (
                // If searching for users, render profile image
                <Image style={{width:width*0.09, height:width*0.09, borderRadius:360, resizeMode:'cover'}} source={item?.image ? {uri: `${API}/images/${item?.image}`} : require("../assets/images/default_profile.jpg")}/>
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
      

    return(
        <View style={styles.container}>
            <View style={{marginTop:50}}>
                <TopHeader title="Tarif veya Kullanıcı Ara!"/>
            </View>

            <View style={{borderWidth:0,flexDirection:"row",alignItems:'center', paddingHorizontal:20, paddingVertical:0,}}>

                <TextInputComp value={searchValue} onchangeValue={setSearchValue} placeholder='Ara..' 
                styleInput={{paddingVertical:10, paddingHorizontal: 12,
                 width:width*0.7, borderRadius: BORDER_RADIUS_2, fontSize:15, fontWeight:"500"}}
                styleInputContainer={{borderWidth:1, alignSelf:"center", justifyContent:"center",width:width*0.9,
                borderColor:SOFT_BLUE,backgroundColor: LIGHT_GRAY_2, borderRadius: 15, marginBottom:7, marginLeft:7}}
                />
                {searchValue ? (
                  <TouchableOpacity onPress={() => setSearchValue("")} style={{position:'absolute', right:15,top:45}}>
                  <AntDesign name="closecircleo" size={20} color={GRAY} />
                </TouchableOpacity>
                ): null}
                

              </View>

              <View style={{marginVertical:10, alignItems:'center'}}>
                <Text style={{fontWeight:'600', color:GRAY_2, fontSize:15}}>Tarif adı veya Kullanıcı ara</Text>
              </View>

              <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:8}}>

                <TouchableOpacity onPress={handleSwitch} style={{width:width*0.5, backgroundColor:WHITE, alignItems:'center', justifyContent:'center',
              paddingVertical:7}}>
                  <Text style={{fontWeight:'700', fontSize:15}}>Tarifler</Text>
                  <View style={{justifyContent:"center", height:10}}>

                  {searchSelectVisible == 0 ? (
                      <View style={{height:3, backgroundColor:GRAY_2, width:width*0.25, marginTop:4}}/>

                ): null}
                  </View>

                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleSwitch} style={{width:width*0.5, backgroundColor:WHITE,alignItems:'center', justifyContent:'center',
              paddingVertical:7}}>
                  <Text style={{fontWeight:'700', fontSize:15}}>Kullanıcılar</Text>
                  <View style={{justifyContent:"center", height:10}}>

                  {searchSelectVisible == 1 ? (
                  <View style={{height:3, backgroundColor:GRAY_2, width:width*0.25, marginTop:4}}/>
                ): null}
                  </View>

                </TouchableOpacity>

              </View>
              <Divider height={1} width={"90%"} style={{alignSelf:'center', marginTop:4}}/>
              
              <View style={{}}>
                  
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
                 

              </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:WHITE,
        paddingHorizontal:CONTAİNER_HORİZONTAL
    }
})