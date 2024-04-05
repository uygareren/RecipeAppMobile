import { ActivityIndicator, StyleSheet, View } from "react-native"
import { WHITE } from "../utils/utils"


export const Loading = () => {
    return(
        <View style={{flex:1,alignItems:"center", justifyContent:"center"}}>
            <ActivityIndicator size={32}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: WHITE,
        alignItems: "center",
        justifyContent:"center"
    }
})
