import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import { ButtonComp } from "../../components/Button";
import { Divider } from '../../components/Divider';
import { TopHeader } from "../../components/Header";
import { TextInputComp } from "../../components/Inputs";
import useI18n from "../../hooks/useI18n";
import { getAllIngredients } from "../../services/ApiService";
import { ingredientSaveButtonContainer, ingredientSaveButtonText } from '../../styles/styles';
import { BLACK_COLOR, GRAY, LIGHT_GRAY, LIGHT_GRAY_2, MAIN_COLOR } from "../../utils/utils";

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



    const {data} = useQuery({
      queryKey:["get_all_ingredients"],
      queryFn: getAllIngredients
    })


  const saveComponent = (id:any, name:any) => {

      setComponentId(id);
      setComponentValue(name);
      setIsModalVisible(false)

  }

  const handleSaveComponents = () => {
      const checkIngeriendts = selectedComponentValue.includes(componentValue)
      console.log("index", checkIngeriendts);
      
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


  const RenderItem = ({ item }: any) => {
    return (
      <View>
        <Text style={{ fontSize: 21, fontWeight:"700",alignSelf:"center", marginTop:8 }}>{item?.IngredientsName}</Text>
        <View style={{ alignItems:"center",marginTop:10 }}>
            {item?.IngredientsData?.map((value: any, index: number) => (
            <Pressable onPress={() => saveComponent(value?._id, value?.type)} style={{paddingVertical:12, width:width*0.7, alignSelf:"center",
            marginVertical:5, borderRadius:10, alignItems:"center", justifyContent:"center", backgroundColor:LIGHT_GRAY_2}}>
              <Text key={index} style={{fontWeight:"500"}}>{value?.type}</Text>
            </Pressable>

            ))}
        </View>
      </View>
    );
  };

  const RenderSelectedItem = ({item}:any) => {

    console.log("item", item);
    return(
      <Pressable style={{backgroundColor:LIGHT_GRAY,marginHorizontal:10, 
      paddingVertical:10, paddingHorizontal:10, borderRadius:10, flexDirection:"row", alignItems:"center"}}>
        <Text style={{fontWeight:"500",}}>{item}</Text>
        <TouchableOpacity onPress={() => handleRemoveItem(item)}>
          <Ionicons name="close-circle-outline" size={20} color={BLACK_COLOR} style={{marginLeft:5}}/>
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
          borderWidth: 1,
          borderColor: BLACK_COLOR,
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 5,
          width: width * 8 / 10,
          alignItems: "center",
          marginTop: 25
        }}>
          <Text style={{color : componentValue ? BLACK_COLOR : GRAY}}>
            {componentValue ? componentValue: t("select_ingredient")}
            </Text>
        </TouchableOpacity>
        

        <ButtonComp
          title={t("save_ingredient")}
          onPress={() => handleSaveComponents()}
          styleContainer={{
            ...ingredientSaveButtonContainer
          }}
          styleText={{...ingredientSaveButtonText}}
        />
      </View>
      
      <View style={{paddingVertical:15,justifyContent:"center", marginTop:20}}>

        <FlatList
          data={selectedComponentValue}
          keyExtractor={(item, index) => index.toString()}
          renderItem={RenderSelectedItem}
          horizontal
        />
      </View>

      

      <ButtonComp
        isActive={isActive}
        title={t("search")}
        onPress={() => handleSearchRecipe()}
        styleContainer={{
          borderWidth: 1,
          borderColor: BLACK_COLOR,
          marginTop: 25,
          width: width * 4 / 10,
          alignSelf: "center",
          alignItems: "center",
          paddingVertical: 12,
          borderRadius: 10,
          backgroundColor: BLACK_COLOR,
        }}
        styleText={{ color: MAIN_COLOR, fontWeight: "bold", fontSize: 16 }}
      />

      <Modal style={{}} visible={isModalVisible} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
          <View style={{}}>

              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <AntDesign name="left" size={26} color={BLACK_COLOR} style={{marginLeft:10, marginTop:5}}/>
              </TouchableOpacity>

              <TextInputComp 
                placeholder={t("search")}
                value={searchComponent}
                onchangeValue={setSearchComponent}
                styleContainer={{
                  borderWidth: 1,
                  borderColor: LIGHT_GRAY,
                  borderRadius: 10,
                  paddingVertical: 5,
                  alignSelf:"center",
                  justifyContent:"center",
                  paddingHorizontal: 5,
                  paddingLeft:10,
                  width: width * 8 / 10,
                  marginTop: 25
                }}
              />

              <View style={{marginTop:20, marginBottom:100}}>
                <FlatList 
                  data={data?.data[0]?.Ingredients_id}
                  keyExtractor={(item) => item?._id.toString()}
                  renderItem={RenderItem}
                />

              </View>

          </View>
      </Modal>
    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});