import React, {useState} from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { SearchHeader, TopHeader } from "../../components/Header";
import { MAIN_COLOR, WHITE } from "../../utils/utils";
import { TabAccountScreenProps } from "../../navigations/AddFoodNavigation";

export default function HomeScreen({navigation,route}: TabAccountScreenProps<"Home">) {

    const [text, setText] = useState("")

    return (
      <SafeAreaView style={styles.container}>

        <View style={{marginTop: 40}}>
          <SearchHeader value={text} onChangeValue={setText} placeholder="Search Recipes..."/>
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
