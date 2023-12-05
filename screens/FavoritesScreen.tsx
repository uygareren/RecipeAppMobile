import { StyleSheet, Text, View } from "react-native";
import { LIGHT_GRAY, MAIN_COLOR, WHITE } from "../utils/utils";
import { RegularHeader } from "../components/Header";



export default function FavoritesScreen(){



    return(
        <View style={styles.container}>

            <View style={{backgroundColor:MAIN_COLOR, paddingBottom: 60, borderBottomLeftRadius:25, borderBottomRightRadius:25  }}>
                <RegularHeader title="Favorites"/>

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