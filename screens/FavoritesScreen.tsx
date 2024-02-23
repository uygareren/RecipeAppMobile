import { StyleSheet, Text, View } from "react-native";
import { LIGHT_GRAY, MAIN_COLOR, WHITE } from "../utils/utils";
import { RegularHeader, TopHeader } from "../components/Header";



export default function FavoritesScreen(){



    return(
        <View style={styles.container}>

            <View style={{marginTop:50}}>
                <TopHeader title="Favorites"/>
                <View style={{backgroundColor: LIGHT_GRAY, height:1, width: "90%", alignSelf: "center", marginTop: 5}}/>

            </View>



            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:WHITE
    },
   
})