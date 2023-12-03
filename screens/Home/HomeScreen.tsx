import React from "react";
import { StyleSheet, View } from "react-native";
import { TopHeader } from "../../components/Header";
import { WHITE } from "../../utils/utils";
import { TabAccountScreenProps } from "../../navigations/AddFoodNavigation";

export default function HomeScreen({navigation,route}: TabAccountScreenProps<"Home">) {
  return (
    <View style={styles.container}>
      <TopHeader/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
