import React, { useState, useEffect } from "react";
import { Dimensions, FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TopHeader } from "../../components/Header";
import { TextInputComp } from "../../components/Inputs";
import { ButtonComp } from "../../components/Button";
import { BLACK_COLOR, GRAY, LIGHT_GRAY, LIGHT_GRAY_2, MAIN_COLOR } from "../../utils/utils";
import components from "../../assets/datas/components.json";
import { useMutation, useQuery } from "react-query";
import { getAllIngredients, getRecipeByIngredients } from "../../services/ApiService";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function SearchScreen({}) {
  const {width, height} = Dimensions.get("screen");

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

  // console.log("selectedid", selectedComponentsId);
  console.log("İDDDD", componentId);
  console.log("collected ids", selectedComponentsId);
  console.log("collected value", selectedComponentValue);


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
          <Ionicons name="close-circle-outline" size={20} color="black" style={{marginLeft:5}}/>
        </TouchableOpacity>
      </Pressable>
    )
  }

  
  
  const isActive = selectedComponentValue.length > 0 ? true : false;

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <TopHeader title="Tarif Ara"/>
        <View style={{backgroundColor:LIGHT_GRAY, height:1, width:width*8/10, alignSelf:"center", marginTop:5}}/>
      </View>

      <View style={{ alignItems: "center" }}>
      

        <TouchableOpacity onPress={() => setIsModalVisible(true)} style={{
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 5,
          width: width * 8 / 10,
          alignItems: "center",
          marginTop: 25
        }}>
          <Text style={{color : componentValue ? BLACK_COLOR : GRAY}}>
            {componentValue ? componentValue: "Malzeme Seç"}
            </Text>
        </TouchableOpacity>
        

        <ButtonComp
          title="Malzeme Kaydet!"
          onPress={() => handleSaveComponents()}
          styleContainer={{
            marginTop: 15,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 15,
            backgroundColor: MAIN_COLOR,
          }}
          styleText={{ fontWeight: "bold", color: "#292828" }}
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
        title="Ara!"
        onPress={() => handleSearchRecipe()}
        styleContainer={{
          borderWidth: 1,
          borderColor: "black",
          marginTop: 25,
          width: width * 4 / 10,
          alignSelf: "center",
          alignItems: "center",
          paddingVertical: 12,
          borderRadius: 10,
          backgroundColor: "black",
        }}
        styleText={{ color: MAIN_COLOR, fontWeight: "bold", fontSize: 16 }}
      />

      <Modal style={{}} visible={isModalVisible} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
          <View style={{}}>

              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <AntDesign name="left" size={26} color="black" style={{marginLeft:10, marginTop:5}}/>
              </TouchableOpacity>

              <TextInputComp 
                placeholder="Ara..."
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