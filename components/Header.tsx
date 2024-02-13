import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { BLACK_COLOR, LIGHT_GRAY, MAIN_COLOR, WHITE } from "../utils/utils"
import { TextInput } from "react-native"
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

type TopHeaderParams={
    title: string
}

type SearchHeaderParams={
    value: string,
    onChangeValue: (text: string) => void,
    placeholder: string
}

type RegularHeaderParams={
  title:string
}
type RecipeDetailHeaderParams={
  isLike:boolean,
  setIsLike(isLike:boolean) : void,
}

type GoBackHeaderParams={
  goBackPress: ()=>void
}


export const TopHeader = () => {
    return(
        <View style={styles.topHeaderContainer}>
            <Text style={{fontStyle: "italic", fontSize: 28, color: "#7224a3"}}>Foody</Text>
        </View>
    )
}

export const SearchHeader = ({ value, onChangeValue, placeholder }: SearchHeaderParams) => {



    return (
      <View style={{ ...styles.topHeaderContainer, height: 110 }}>
        <Text style={{ fontStyle: "italic", fontSize: 28, color: "#7224a3", marginBottom: 10 }}>Foody</Text>
  
        <View style={styles.searchContainer}>
          <TextInput value={value} onChangeText={onChangeValue} placeholder={placeholder} style={styles.textInput} />
  
          <View style={styles.searchIcon}>
            {value ? (<TouchableOpacity onPress={() => onChangeValue("")}> 
                <EvilIcons name="close-o" size={24} color="black" />
            </TouchableOpacity>) : 
            (<EvilIcons name="search" size={24} color="black" /> )
            }
            
          </View>

        </View>
      </View>
    );
};


export const SettingsHeader = () => {

  const navigation = useNavigation<any>();

  return(
      <View style={styles.topHeaderContainer}>
        <Text style={{fontStyle: "italic", fontSize: 28, color: "#7224a3"}}>Foody</Text>
        <TouchableOpacity style={{position: "absolute", top: 20, right: 20}} onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
  )
}

export const RegularHeader = ({title}:RegularHeaderParams) => {
    return(
        <View style={{marginTop: 50, alignItems: "center"}}>
            <Text style={styles.titleText}>{title}</Text>
            <View style={{height:1, backgroundColor:LIGHT_GRAY, width:"90%", alignSelf: "center", marginTop:10}}/>
        </View>
    )
    
}

export const RecipeDetailHeader = ({isLıke}: any) => {

  const [isLike, setIsLike] = useState(isLıke)

 
  return(
      <View style={styles.topHeaderContainer}>
        <TouchableOpacity style={{position: "absolute", left:20, top:20}}>
          <AntDesign name="arrowleft" size={32} color="black" />
        </TouchableOpacity>
        <Text style={{fontStyle: "italic", fontSize: 28, color: "#7224a3"}}>Foody</Text>
        <TouchableOpacity style={{position: "absolute", top: 20, right: 20}} onPress={() => setIsLike(!isLike)}>
          {isLike ? (<MaterialIcons name="favorite" size={32} color="black" />) : (<MaterialIcons name="favorite-border" size={32} color="black" />)}
        </TouchableOpacity>
      </View>
  )
}

export const GoBackHeader = ({goBackPress}:GoBackHeaderParams) => {
    const width = Dimensions.get("screen").width;

    return(
      <View style={{height:width/6, width:"100%", marginTop:40, paddingHorizontal:20, 
        justifyContent:"center"}}>
          <TouchableOpacity onPress={goBackPress} style={{width:width/10, }}>
              <Feather name="arrow-left" size={32} color={BLACK_COLOR}/>
          </TouchableOpacity>
      </View>
    )
}

  const styles = StyleSheet.create({
    topHeaderContainer: {
      width: "100%",
      height: 110,
      backgroundColor: MAIN_COLOR,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      alignItems: "center",
      justifyContent: "center",
    },
    searchContainer: {
      width: "88%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    textInput: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 7,
      backgroundColor: WHITE,
      borderRadius: 25,
    },
    searchIcon: {
      position: "absolute",
      right: 10,
    },
    titleText:{
      fontSize:24,
      fontWeight:"500"
  },
});