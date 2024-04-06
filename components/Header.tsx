import { AntDesign, EvilIcons, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BLACK_COLOR, LIGHT_GRAY_2 } from "../utils/utils";
import { Divider } from './Divider';

type TopHeaderParams={
    title: string
}

type SearchHeaderParams={
    name: String,
    value: string,
    onChangeValue: (text: string) => void,
    placeholder: string,
    onPress : () => void,
    openModal : () => void,
    id: any
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


export const TopHeader = ({title}:any) => {
    return(
        <View style={{...styles.topHeaderContainer, alignItems:"center"}}>
            <Text style={{fontSize:18, fontWeight:"300"}}>{title}</Text>
        </View>
    )
}

export const SearchHeader = ({ value, onChangeValue, placeholder, name, onPress, openModal, id }: SearchHeaderParams) => {



    return (
      <View style={{ ...styles.topHeaderContainer}}>
        {id != null ? (
          <Text>{`Merhaba, ${name}`}</Text>

        ): (
          null
        )}
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
          <Text style={{fontSize:19, fontWeight:"700", marginTop:5}}>Bugün ne pişirmek istersiniz?</Text>
          {
            name.length > 0 ? (
              <TouchableOpacity onPress={onPress} style={{width:Dimensions.get("screen").width/9, height:Dimensions.get("screen").width/9, borderRadius:180, borderWidth:1,
              borderColor:"black", alignItems:"center", justifyContent:"center" }}>
                  <Image style={{width:Dimensions.get("screen").width/10, height:Dimensions.get("screen").width/10, borderRadius:180,  }}
                  source={require("../assets/images/default_profile.jpg")}/>
              </TouchableOpacity>
            ):null
          }
          
        </View>
  
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.textInput} onPress={openModal}>
            <Text style={{fontWeight:'300' }}>{placeholder}</Text>
          </TouchableOpacity>

          <View style={styles.searchIcon}>
            {value ? (<TouchableOpacity onPress={() => onChangeValue("")}> 
                <EvilIcons name="close-o" size={26} color="black" />
            </TouchableOpacity>) : 
            (<EvilIcons name="search" size={26} color="black" /> )
            }
            
          </View>

        </View>
      </View>
    );
};


export const SettingsHeader = () => {

  const navigation = useNavigation<any>();

  return(
      <View style={{...styles.topHeaderContainer, marginTop:30}}>
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
            <Divider height={1} width="90%"/>
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
      width:"100%", 
      paddingHorizontal:20, 
      justifyContent:"center",
      // borderWidth:1,
      // borderColor:"black"
      
    },
    searchContainer: {
      marginTop:18,
      alignSelf:"center",
      width: "95%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    textInput: {
      flex: 1,
      paddingVertical: 13,
      paddingHorizontal: 7,
      backgroundColor: LIGHT_GRAY_2,
      borderRadius: 15,
      
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