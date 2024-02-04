import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Image, Text, FlatList } from "react-native";
import { SearchHeader, TopHeader } from "../../components/Header";
import { MAIN_COLOR, WHITE } from "../../utils/utils";
import { TabAccountScreenProps } from "../../navigations/AddFoodNavigation";
import category_data from "../../assets/datas/category_data.json";

export default function HomeScreen({ navigation, route }: any) {
  const [text, setText] = useState("");

  const Card = ({ item }: any) => {
    return (
      <View style={{ marginTop: 10, marginHorizontal: 10, width: 100, alignItems: "center" }}>
        {/* Use require to specify the correct image source */}
        <Image source={{ uri: item.image_url }} style={{ width: 90, height: 90, resizeMode:"cover" }} />
        <Text>{item.category_name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 40 }}>
        <SearchHeader value={text} onChangeValue={setText} placeholder="Search Recipes..." />
      </View>

      <View style={{ marginTop: 20, marginLeft: 20, }}>
        <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 10 }}>Categories</Text>

        {/* CARD */}
        <FlatList
          data={category_data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={Card}
          horizontal
          showsHorizontalScrollIndicator={false} 
        />
      </View>

      <View style={{ marginTop: 50, marginLeft: 20, }}>
        <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 10 }}>Popular Foods</Text>

        {/* CARD */}
        <FlatList
          data={category_data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={Card}
          horizontal
          showsHorizontalScrollIndicator={false} 
        />
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
