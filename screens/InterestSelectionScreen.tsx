import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Button } from "react-native";
import { BLACK_COLOR, LIGHT_GRAY_2, MAIN_COLOR, WHITE, keyGenerator } from "../utils/utils";
import { TopHeader } from "../components/Header";
import { FlatList } from "react-native";
import { ButtonComp } from "../components/Button";
import { useMutation, useQuery } from "react-query";
import { getInterestedData, postUserInterest } from "../services/ApiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { CommonActions, useNavigation } from "@react-navigation/native";

export default function InterestSelectionScreen() {
  const {width, height} = Dimensions.get("screen");

  const navigation = useNavigation<any>()

  const [interestedId, setinterestedId] = useState<any[]>([])

  const userInfo = useSelector((state:any) => state.user.userInfo);


    const {isError, isSuccess, isLoading, data, error} = useQuery(
      ["get-all-world-cuisines"],
      getInterestedData,
      {staleTime:2000}
    )

    const postInterestMutation = useMutation({
      mutationKey:["post_user_interests"],
      mutationFn:postUserInterest,
      onSuccess: async() => {
        const key = keyGenerator(userInfo?.userId);
        await AsyncStorage.setItem(key,"true");
        console.log("doneee")
        navigation.dispatch(
          CommonActions.reset({
              index: 1,
              routes: [
                  { name: "Tab" }
              ]
          })
      );
      }
    })


    function handleChecked(id: any) {
        const isAlreadyChecked = interestedId.includes(id);

        if (isAlreadyChecked) {
          setinterestedId((prevIds) => prevIds.filter((prevId) => prevId !== id));
        } else {
          setinterestedId((prevIds) => [...prevIds, id]);
        }
      }

    async function handleSave (){
        postInterestMutation.mutate({"user_id":userInfo?.userId, "interests_data":[...interestedId]})
    }

    const InterestItem = ({ item }: any) => {
      let isChecked = interestedId.includes(item?._id);

      return (
        <TouchableOpacity
          onPress={() => handleChecked(item?._id)}
          style={{
            paddingVertical: 14,
            width: width * 3.5 / 10,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal:15,
            marginVertical:8,
            borderRadius: 12,
            backgroundColor: isChecked ? MAIN_COLOR : LIGHT_GRAY_2,
          }}>
          <Text style={{fontWeight:"500"}}>{item?.type}</Text>
        </TouchableOpacity>
      );
  };

    console.log("idd", interestedId)

    if(isLoading){
      return(
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
            <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
          
        <View style={{ marginTop: 50 }}>
          <TopHeader title="Select Interest" />
          <View style={{ backgroundColor: LIGHT_GRAY_2, height: 1, width: width * 8 / 10, alignSelf: "center", marginTop: 5 }} />
        </View>

        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>
            Hangi mutfaklar ilgini çekiyor?
          </Text>

          <View style={{marginTop: 20, marginBottom:0, alignItems:"center", height:height*6.5/10, }}>
            <FlatList
              data={data?.data[0]?.cuisines_name}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => <InterestItem item={item} />}
              numColumns={2}
              showsVerticalScrollIndicator={false}
            />

          </View>

          <ButtonComp title="Kaydet!" onPress={() => handleSave()} 
          styleContainer={{marginTop:20, paddingVertical:12, width:width*5/10, alignItems:"center",
          justifyContent:"center", alignSelf:"center", borderRadius:12, backgroundColor: MAIN_COLOR,}}
          styleText={{fontWeight:"600", color:BLACK_COLOR}}/>

        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
