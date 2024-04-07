import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { ButtonComp } from "../components/Button";
import { TopHeader } from "../components/Header";
import { Loading } from "../components/Loading";
import useI18n from "../hooks/useI18n";
import { getInterestedData, postUserInterest } from "../services/ApiService";
import { BLACK_COLOR, LIGHT_GRAY_2, MAIN_COLOR, WHITE, keyGenerator } from "../utils/utils";

export default function InterestSelectionScreen() {
  const {t} = useI18n("InterestSelectionScreen");

  const {width, height} = Dimensions.get("screen");

  const navigation = useNavigation<any>()

  const [interestedId, setinterestedId] = useState<any[]>([])

  const userInfo = useSelector((state:any) => state.user.userInfo);

  console.log("userınfı", userInfo);


    const {isError, isSuccess, isLoading, data, error} = useQuery(
      ["get-all-world-cuisines"],
      getInterestedData,
      {staleTime:2000}
    )

    const postInterestMutation = useMutation({
      mutationKey:["post_user_interests"],
      mutationFn:postUserInterest,
      onSuccess: async() => {
        const key = keyGenerator("interest",userInfo?.userId);
        await AsyncStorage.setItem(key,"true");
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

    if(isLoading){
      return(
        <Loading/>
      )
    }

    return (
      <View style={styles.container}>
          
        <View style={{ marginTop: 50 }}>
          <TopHeader title={t("select_interest")}/>
          <View style={{ backgroundColor: LIGHT_GRAY_2, height: 1, width: width * 8 / 10, alignSelf: "center", marginTop: 5 }} />
        </View>

        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>
          {t("question_interest")}
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
