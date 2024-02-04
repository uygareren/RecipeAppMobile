import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TopHeader } from "../../components/Header";
import { ButtonComp } from "../../components/Button";
import { MAIN_COLOR } from "../../utils/utils";
import { TextInputComp } from "../../components/Inputs";
import { useState } from "react";
import components from "../../assets/datas/components.json";
import { Pressable } from "react-native";
import { TextArea } from "native-base";
import { SelectList } from 'react-native-dropdown-select-list';
import category_data from "../../assets/datas/category_for_select.json";



export default function AddFoodScreen(){

  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;

  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");

  const [categorySelected, setCategorySelected] = useState("");

  
  const [componentValue, setComponentValue] = useState("");
  const [allComponents, setAllComponents] = useState<string[]>([]);
  const [filteredComponents, setFilteredComponents] = useState<any[]>([]);


  const saveComponent = () => {
    if (componentValue === "") {
      return false;
    } else {
      setAllComponents((prevComponents) => [...prevComponents, componentValue]);
      setComponentValue("");
    }
  };

  const handleSearch = (text: string) => {
    setComponentValue(text);

    if (text === "") {
      setFilteredComponents([]);
    } else {
      const filtered = components.filter(
        (comp) => comp.component_name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredComponents(filtered);
    }
  };

  const selectComponent = (selectedComponent: string) => {
    setComponentValue(selectedComponent);
    setFilteredComponents([]);
  };

  const removeComponentItem = ({id}:any) => {
    setAllComponents((prevComponents) => {
        const updatedComponents = [...prevComponents];
        updatedComponents.splice(id, 1);
        return updatedComponents;
    }) 
  }

  const showComponents = ({ item }: any) => {
    return (
      <View style={{ marginTop: 10, alignItems:"center", alignSelf:"center", width: width * 6 / 10, paddingVertical: 12, borderRadius: 12, 
      backgroundColor: "#f2f0f0" }}>
        <Text onPress={() => selectComponent(item.component_name)} style={{paddingHorizontal:60, paddingVertical:10}}>{item.component_name}</Text>
      </View>
    );
  };


  const showSavedComponents = ({ item, index }: any) => {

    return (
      <Pressable onLongPress={() => removeComponentItem(index)} style={{ marginTop: 10, marginHorizontal:10, height:75, justifyContent:"center", alignItems: "center", paddingVertical: 5, borderRadius: 12, backgroundColor: "#f2f0f0" }}>
        <Text style={{paddingHorizontal:40  }}>{item}</Text>
      </Pressable>
    );
  };

  const updateRecipeImage = () => {

  }
    
    return(
        <ScrollView style={styles.container}>

            <View>
                <TopHeader/>
            </View>

            <View style={{ marginTop:20, alignItems:"center", width:150, height:150, alignSelf:"center",}}>
                <Image source={require("../../assets/images/default_profile.jpg")} 
                style={{width:150, height:150, borderRadius:15}}/>
            </View>

                
            <ButtonComp title="Fotoğraf Seç" onPress={updateRecipeImage} styleContainer={{marginTop:20,paddingVertical:10, 
            width:150, alignSelf:"center", alignItems:"center", borderRadius:12, backgroundColor:MAIN_COLOR}} styleText={{fontWeight:"600"
            }}/>

            
      <View style={{ alignItems: "center" }}>
        
        <TextInputComp styleInputContainer={{
            borderWidth: 1,
            borderColor: "black",
            marginTop: 10,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 5,
            width: width * 8 / 10,
          }}
          styleContainer={{ alignItems: "center", marginTop: 25 }}

           label="Tarif Adı" placeholder="Tarif Adı Gir.." value={recipeName} onchangeValue={setRecipeName}/>


        <TextInputComp
          styleInputContainer={{
            borderWidth: 1,
            borderColor: "black",
            marginTop: 10,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 5,
            width: width * 8 / 10,
          }}
          styleContainer={{ alignItems: "center", marginTop: 25 }}
          label="Malzemeler"
          placeholder="Malzeme"
          onchangeValue={handleSearch}
          value={componentValue}
        />

        <View style={{marginTop: 10, maxHeight: 250, backgroundColor:"#a9abaa", }}>
          <ScrollView
            style={{ width: width * 8 / 10, display: filteredComponents.length > 0 ? "flex": "none" }}
          >
            <FlatList
              data={filteredComponents}
              keyExtractor={(item, index) => index.toString()}
              renderItem={showComponents}
            />
          </ScrollView>
        </View>

        <ButtonComp
          title="Malzeme Kaydet!"
          onPress={saveComponent}
          styleContainer={{
            marginTop: 15,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 15,
            backgroundColor: MAIN_COLOR,
          }}
          styleText={{ fontWeight: "bold", color: "#292828" }}
        />

        <View style={{display:allComponents.length > 0 ? "flex": "none", marginTop: 30, alignItems: "center", height: 100 }}>
          <ScrollView
            horizontal
            style={{ width: width * 8 / 10 }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <FlatList
              data={allComponents}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={showSavedComponents}
            />
          </ScrollView>
        </View>

        <TextInputComp isTextArea={true} label="Tarif Açıklaması" placeholder="Tarif Açıklaması" value={recipeDescription} 
        onchangeValue={setRecipeDescription}
        styleInputContainer={{
          borderWidth: 1,
          borderColor: "black",
          marginTop: 10,
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 5,
          width: width * 8 / 10,
        }}
        styleContainer={{ alignItems: "center", marginTop: 25 }}

        />

        
      </View>


      <ButtonComp
        title="Tarifi Kaydet!"
        onPress={() => console.log("sds")}
        styleContainer={{
          borderWidth: 1,
          borderColor: "black",
          marginTop: 25,
          paddingHorizontal:25,
          alignSelf: "center",
          alignItems: "center",
          paddingVertical: 12,
          borderRadius: 10,
          backgroundColor: "black",
        }}
        styleText={{ color: MAIN_COLOR, fontWeight: "bold", fontSize: 16 }}
      />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    }
})