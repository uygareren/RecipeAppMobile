import { AntDesign, EvilIcons, Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from 'react-redux';
import { RootStateType } from '../store/store';
import { BLACK_COLOR, BORDER_RADIUS_2, GRAY, GRAY_2, SOFT_BLUE } from "../utils/utils";
import { Divider } from './Divider';

type TopHeaderParams={
    title: string,
}

type SearchHeaderParams={
    name: String,
    value: string,
    onChangeValue: (text: string) => void,
    placeholder: string,
    onPress : () => void,
    openModal : () => void,
    id: any,
    greeting: string,
    title: string
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

const API = process.env.API;


export const TopHeader:React.FC<TopHeaderParams> = ({title}) => {

  const navigation = useNavigation<any>();

    return(
        <View style={{...styles.topHeaderContainer, alignItems:"center", minHeight:50,
          flexDirection:'row'
        }}>

        <TouchableOpacity onPress={() => navigation.goBack()} style={{position:'absolute', left:0}}>
        <FontAwesome5 name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

          <View style={{flex:0, maxWidth:"85%", alignItems:'center'}}>
            <Text style={{fontSize:20, fontWeight:"700", color:BLACK_COLOR}}>{title}</Text>
          </View>
        </View>
    )
}

export const SearchHeader = ({ value, onChangeValue, placeholder, name, onPress, openModal, id, greeting, title }: SearchHeaderParams) => {

    const user_image = useSelector((state:RootStateType) => state.user.userInfo.image);
    
    return (
      <View style={{ ...styles.topHeaderContainer}}>
        {id != null ? (
          <View style={{flexDirection:"row", alignItems:'center'}}>
            <Text style={{color:GRAY}}>{`Merhaba, `}</Text>
            <Text style={{color:BLACK_COLOR, fontWeight:'700'}}>{name}</Text>
          </View>
          

        ): (
          null
        )}
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
          <Text style={{fontSize:19, fontWeight:"700", marginTop:5}}>Bugün ne pişirmek istersiniz?</Text>
          {
            name.length > 0 ? (
              <TouchableOpacity onPress={onPress} style={{width:Dimensions.get("screen").width/9, 
              height:Dimensions.get("screen").width/9, borderRadius:180,
              borderColor:BLACK_COLOR, alignItems:"center", justifyContent:"center" }}>
                  {user_image != undefined ? (
                    <Image style={{width:Dimensions.get("screen").width/10, height:Dimensions.get("screen").width/10, borderRadius:180,  }}
                  source={{uri: `${API}/images/${user_image}`}}/>
                  ) : (
                    <Image style={{width:Dimensions.get("screen").width/10, height:Dimensions.get("screen").width/10, borderRadius:180,  }}
                  source={require("../assets/images/default_profile.jpg")}/>
                  )}
                  
              </TouchableOpacity>
            ):null
          }
          
        </View>
  
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.textInput} onPress={openModal}>
            <Text style={{fontWeight:'300', fontSize:14, color:GRAY_2, marginLeft:8 }}>{placeholder}</Text>
          </TouchableOpacity>

          <View style={styles.searchIcon}>
            {value ? (<TouchableOpacity onPress={() => onChangeValue("")}> 
                <EvilIcons name="close-o" size={26} color={GRAY_2} />
            </TouchableOpacity>) : 
            (<EvilIcons name="search" size={26} color={GRAY_2} /> )
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
          <Ionicons name="settings-outline" size={28} color={BLACK_COLOR} />
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
          <AntDesign name="arrowleft" size={32} color={BLACK_COLOR} />
        </TouchableOpacity>
        <Text style={{fontStyle: "italic", fontSize: 28, color: "#7224a3"}}>Foody</Text>
        <TouchableOpacity style={{position: "absolute", top: 20, right: 20}} onPress={() => setIsLike(!isLike)}>
          {isLike ? (<MaterialIcons name="favorite" size={32} color={BLACK_COLOR} />) : (<MaterialIcons name="favorite-border" size={32} color={BLACK_COLOR} />)}
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
      backgroundColor: SOFT_BLUE,
      borderRadius: BORDER_RADIUS_2,
      
    },
    searchIcon: {
      position: "absolute",
      right: 10,
      alignSelf:'center'
    },
    titleText:{
      fontSize:24,
      fontWeight:"500"
  },
});