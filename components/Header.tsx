import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { MAIN_COLOR, WHITE } from "../utils/utils"
import { TextInput } from "react-native"
import { EvilIcons } from '@expo/vector-icons';

type TopHeaderParams={
    title: string
}

type SearchHeaderParams={
    value: string,
    onChangeValue: (text: string) => void,
    placeholder: string
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
  });