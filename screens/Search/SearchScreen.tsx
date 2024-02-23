import React, { useState, useEffect } from "react";
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { TopHeader } from "../../components/Header";
import { TextInputComp } from "../../components/Inputs";
import { ButtonComp } from "../../components/Button";
import { LIGHT_GRAY, MAIN_COLOR } from "../../utils/utils";
import components from "../../assets/datas/components.json";

export default function SearchScreen({}) {
  const width = Dimensions.get("screen").width;

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
      <ScrollView style={{ marginTop: 10, alignSelf:"center", width: width * 6 / 10, paddingVertical: 12, borderRadius: 12, 
      backgroundColor: "#f2f0f0" }}
    contentContainerStyle={{alignItems:"center"}}>
        <Text onPress={() => selectComponent(item.component_name)} style={{paddingHorizontal:60, paddingVertical:10}}>{item.component_name}</Text>
      </ScrollView>
    );
  };

  
  const showSavedComponents = ({ item, index }: any) => {

    return (
      <Pressable onLongPress={() => removeComponentItem(index)} style={{ marginTop: 10, marginHorizontal:10, height:75, justifyContent:"center", alignItems: "center", paddingVertical: 5, borderRadius: 12, backgroundColor: "#f2f0f0" }}>
        <Text style={{paddingHorizontal:40  }}>{item}</Text>
      </Pressable>
    );
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

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <TopHeader title="Tarif Ara"/>
        <View style={{backgroundColor:LIGHT_GRAY, height:1, width:width*8/10, alignSelf:"center", marginTop:5}}/>
      </View>

      <View style={{ alignItems: "center" }}>
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
          label="Malzeme ara"
          placeholder="Malzeme ara"
          onchangeValue={handleSearch}
          value={componentValue}
        />

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
      </View>

      <View style={{ marginTop: -50, alignItems: "center", maxHeight: 300, backgroundColor:"#a9abaa", }}>
        <ScrollView
          style={{ width: width * 8 / 10 }}
          contentContainerStyle={{ alignItems: "center" }}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            data={filteredComponents}
            keyExtractor={(item, index) => index.toString()}
            renderItem={showComponents}
          />
        </ScrollView>
      </View>

      <View style={{ marginTop: 70, alignItems: "center", height: 100 }}>
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

      <ButtonComp
        title="Ara!"
        onPress={() => console.log("sds")}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});