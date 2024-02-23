import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Image, Text, FlatList, Pressable } from "react-native";
import { SearchHeader, TopHeader } from "../../components/Header";
import { MAIN_COLOR, WHITE, keyGenerator } from "../../utils/utils";
import { TabAccountScreenProps } from "../../navigations/AddFoodNavigation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";
import { getCategories, getUserDetail } from "../../services/ApiService";
import { userSliceActions } from "../../store/reducer/userSlice";

export default function HomeScreen({ route }: any) {

    const [text, setText] = useState("");

    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>()

    const userInfo = useSelector((state:any) => state.user.userInfo);
    const userId = userInfo?.userId;
    console.log(userInfo)

    const {data, isLoading} = useQuery({
      queryKey: ["categories"],
      queryFn: getCategories
    })

    const user_detail = useQuery(
      ['get_user_detail', userId],
      () => getUserDetail(userId),
    );

    if(user_detail.isSuccess){
      dispatch(userSliceActions.setUser(user_detail?.data?.user))

    }


    const Card = ({ item }: any) => {
      return (
        <Pressable onPress={() => navigation.navigate("CategoryDetail", { id: item?._id, name: item?.categoryName })}
        style={{ marginTop: 10, marginHorizontal: 10, width: 100, alignItems: "center" }}>
          <Image source={{ uri: "http://dummyimage.com/118x100.png/ff4444/ffffff" }} style={{ width: 90, height: 90, resizeMode:"cover" }} />
          <Text>{item.categoryName}</Text>
        </Pressable>
      );
    };

    if(isLoading){
      return(
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
            <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 50 }}>
          <SearchHeader value={text} onChangeValue={setText} placeholder="Search Recipes..." name={userInfo.name ?? ""}
          onPress={() => navigation.navigate("Profile")}/>
        </View>

        <View style={{ marginTop: 20, marginLeft: 20, }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 10 }}>Categories</Text>

          {/* CARD */}
          {
            data && 
            <FlatList
            data={data?.data}
            keyExtractor={(item) => item._id.toString()}
            renderItem={Card}
            horizontal
            showsHorizontalScrollIndicator={false} 
          />
          }
          
        </View>

        <View style={{ marginTop: 50, marginLeft: 20, }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 10 }}>Popular Foods</Text>

          {/* CARD */}
          {/* <FlatList
            data={category_data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={Card}
            horizontal
            showsHorizontalScrollIndicator={false} 
          /> */}
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
