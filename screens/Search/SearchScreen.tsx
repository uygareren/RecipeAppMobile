import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import { ButtonComp } from "../../components/Button";
import { Divider } from '../../components/Divider';
import { TopHeader } from "../../components/Header";
import useI18n from "../../hooks/useI18n";
import { getAllIngredients } from "../../services/ApiService";
import { authButtonContainer, authTextButton, ingredientSaveButtonContainer, ingredientSaveButtonText } from '../../styles/styles';
import { BLACK_COLOR, BORDER_RADIUS_1, BORDER_RADIUS_2, CONTAİNER_HORİZONTAL, GRAY, GRAY_2, LIGHT_GRAY, LIGHT_GRAY_2, MAIN_COLOR_2, MAIN_COLOR_GREEN, WHITE } from "../../utils/utils";

export default function SearchScreen({}) {
  const {width, height} = Dimensions.get("screen");

  const {t} = useI18n("SearchScreen");

  const navigation = useNavigation<any>();

  const [componentValue, setComponentValue] = useState("");
  const [componentId, setComponentId] = useState("");
  const [searchComponent, setSearchComponent] = useState("");


  const [isModalVisible, setIsModalVisible] = useState(false)
  // const [allComponents, setAllComponents] = useState<string[]>([]);
  const [selectedComponentsId, setSelectedComponentsId] = useState<any[]>([]);
  const [selectedComponentValue, setSelectedComponentValue] = useState<any[]>([]);

  const [IngredientsData, setIngredientsData] = useState([]);

    const {data} = useQuery({
      queryKey:["get_all_ingredients"],
      queryFn: getAllIngredients
    });



  const saveComponent = (id:any, name:any) => {

      setComponentId(id);
      setComponentValue(name);
      setIsModalVisible(false)

  }

  const handleSaveComponents = () => {
      const checkIngeriendts = selectedComponentValue.includes(componentValue)

      if(checkIngeriendts == false && componentValue != ""){
        setSelectedComponentsId((prevIds) => [...prevIds, componentId]);
        setSelectedComponentValue((prevValue) => [...prevValue, componentValue])
      }

      setComponentId("");
      setComponentValue("");

  }

  const handleRemoveItem = (name: string) => {
    const index = selectedComponentValue.indexOf(name);

    if (index !== -1) {
      // Remove item from selectedComponentValue
      const updatedComponentValues = [...selectedComponentValue];
      updatedComponentValues.splice(index, 1);
      setSelectedComponentValue(updatedComponentValues);

      // Remove item from selectedComponentsId
      const updatedComponentIds = [...selectedComponentsId];
      updatedComponentIds.splice(index, 1);
      setSelectedComponentsId(updatedComponentIds);
    }
  }

  const handleSearchRecipe = () => {
    navigation.navigate("SearchResult", {selectedComponentIds:selectedComponentsId})

  }

  function handleSearchIngredients(value: string) {
    setSearchComponent(value);

    // data?.data[0]?.Ingredients_id içindeki tüm IngredientsData öğelerini filtrele
    const searchedData = data?.data[0]?.Ingredients_id.flatMap((item: any) =>
        item?.IngredientsData.filter((e: any) =>
            e.type.includes(value)
        )
    );

    if(value == ""){
      setIngredientsData([]);
    }else{
      setIngredientsData(searchedData);
    }


    console.log("searched data", searchedData);
}


  const RenderItem = ({ item }: any) => {
    return (
      <View>
        <View style={{minWidth:width*0.7, alignSelf:'center', alignItems:'center', justifyContent:'center', borderRadius:BORDER_RADIUS_2,
          backgroundColor:"#37916d",marginTop:16, paddingVertical:8
        }}>
          <Text style={{ fontSize: 20, fontWeight:"400",alignSelf:"center", color:WHITE, }}>{item?.IngredientsName}</Text>
        </View>
        <View style={{ alignItems:"center",marginTop:10 }}>
            {item?.IngredientsData?.map((value: any, index: number) => (
            <Pressable onPress={() => saveComponent(value?._id, value?.type)} style={{paddingVertical:16, width:width*0.7, alignSelf:"center",
            marginVertical:5, borderRadius:10, alignItems:"center", justifyContent:"center", backgroundColor:LIGHT_GRAY_2}}>
              <Text key={index} style={{fontWeight:"500"}}>{value?.type}</Text>
            </Pressable>

            ))}
        </View>
      </View>
    );
  };
  const RenderSearchedItem = ({ item }: any) => {
    return (
      <View>
        <View style={{ alignItems:"center",marginTop:8 }}>

            <Pressable onPress={() => saveComponent(item?._id, item?.type)}
            style={{paddingVertical:12, width:width*0.7, alignSelf:"center",
            borderRadius:10, alignItems:"center", justifyContent:"center", backgroundColor:LIGHT_GRAY_2}}>
              <Text key={item?._id} style={{fontWeight:"500"}}>{item?.type}</Text>
            </Pressable>


        </View>
      </View>
    );
  };

  const RenderSelectedItem = ({item}:any) => {

    return(
      <Pressable style={{backgroundColor:WHITE, borderWidth:2, borderColor:LIGHT_GRAY,marginHorizontal:10,marginVertical:10,
      paddingVertical:16, paddingHorizontal:12, borderRadius:10, flexDirection:"row", alignItems:"center", justifyContent:'center'}}>
        <View style={{maxWidth:width*0.55, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontWeight:"600", fontSize:14,}}>{item}</Text>
        </View>
        <TouchableOpacity onPress={() => handleRemoveItem(item)} style={{position: 'absolute', right:16}}>
          <Ionicons name="close-circle-outline" size={24} color={GRAY} style={{marginLeft:5}}/>
        </TouchableOpacity>
      </Pressable>
    )
  }


  const isActive = selectedComponentValue.length > 0 ? true : false;

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <TopHeader title={t("search_recipe_title")}/>
        <Divider height={1} width={width*0.8} style={{alignSelf:'center', marginTop:5}}/>
      </View>

      <View style={{ alignItems: "center" }}>


        <TouchableOpacity onPress={() => setIsModalVisible(true)} style={{
          borderWidth: 0.4,
          borderColor: GRAY_2,
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 5,
          width: width * 8 / 10,
          alignItems: "center",
          marginTop: 25,
        }}>
          <Text style={{color : componentValue ? BLACK_COLOR : GRAY}}>
            {componentValue ? componentValue: t("select_ingredient")}
            </Text>
        </TouchableOpacity>


        <ButtonComp
          title={t("save_ingredient")}
          onPress={() => handleSaveComponents()}
          styleContainer={{
            ...ingredientSaveButtonContainer,
            borderRadius:BORDER_RADIUS_1, paddingHorizontal:24,
            backgroundColor:MAIN_COLOR_GREEN,
          }}
          styleText={{...ingredientSaveButtonText,
            fontWeight:'500',
            fontSize:12,
            color:WHITE
          }}
        />
      </View>

      <View style={{paddingVertical:15,justifyContent:"center", marginTop:15, minHeight:height*0.50, maxHeight:height*0.50}}>

        <FlatList
          data={selectedComponentValue}
          keyExtractor={(item, index) => index.toString()}
          renderItem={RenderSelectedItem}
          showsVerticalScrollIndicator={false}

        />
      </View>



      <ButtonComp
        isActive={isActive}
        title={t("search")}
        onPress={() => handleSearchRecipe()}
        styleContainer={{...authButtonContainer, borderRadius:10, width:"100%", paddingVertical:18, backgroundColor:MAIN_COLOR_2,
        position: 'absolute', bottom:30}}
        styleText={{...authTextButton, fontWeight:"600", fontSize:16, color:BLACK_COLOR}}
      />

      <Modal style={{}} visible={isModalVisible} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
          <View style={{}}>

              <TouchableOpacity onPress={() => setIsModalVisible(false)}
              style={{marginTop:20, marginLeft:20, width:30,height:30,alignItems:'center', justifyContent:'center',
                borderRadius:BORDER_RADIUS_2, backgroundColor:MAIN_COLOR_2
              }}>
                <AntDesign name="left" size={24} color={WHITE} />
              </TouchableOpacity>

              <TextInput
                placeholder={t("search")}
                value={searchComponent}
                onChangeText={handleSearchIngredients}
                style={{borderWidth:1, width:width*0.8, alignSelf:'center', marginTop:30, paddingVertical:10,
                  borderColor:GRAY, borderRadius:BORDER_RADIUS_1, paddingHorizontal:10
                }}
              />



              <View style={{marginTop:20, marginBottom:100}}>
                {IngredientsData.length > 0 ? (
                  <FlatList
                  data={IngredientsData}
                  keyExtractor={(item,index) => index.toString()}
                  renderItem={RenderSearchedItem}
                />
                ):(
                  <FlatList
                  data={data?.data[0]?.Ingredients_id}
                  keyExtractor={(item) => item?._id.toString()}
                  renderItem={RenderItem}
                />
                )}


              </View>

          </View>
      </Modal>
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal:CONTAİNER_HORİZONTAL

  },
});