import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import category_data from "../assets/datas/category_data.json";
import { TopHeader } from "../components/Header";
import useI18n from "../hooks/useI18n";
import { WHITE } from "../utils/utils";

export default function CategoryScreen({}) {

    const {t} = useI18n("CategoryScreen");

    const navigation = useNavigation<any>();

    const renderItem = ({ item }:any) => {
        
        return (
        <Pressable style={styles.categoryItem} onPress={() => navigation.navigate("CategoryDetail", {id:item.id})} >
            <Image
            source={{ uri: item.image_url }}
            style={{ width: "100%", height: 150, resizeMode: "cover", borderRadius: 10 }}
            />
            <Text style={styles.categoryName}>{item.category_name}</Text>
            <Text style={styles.categoryName}>{item.id}</Text>
        </Pressable>
        );
    };

    return (
        <View style={styles.container}>
        <View style={{ marginTop: 40 }}>
            <TopHeader />
        </View>

        <ScrollView>
            <Text style={{ alignSelf: "center", fontSize: 28, fontWeight: "600", marginVertical: 20 }}>{t("category")}</Text>

            <View style={{marginBottom:50}}>
            <FlatList
                data={category_data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
            />
            </View>
        </ScrollView>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  categoryItem: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor:"#f5f5f5"
  },
  categoryName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
