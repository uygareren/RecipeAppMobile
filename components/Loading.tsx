import { ActivityIndicator, StyleSheet, View } from "react-native"
import { WHITE } from "../utils/utils"


export const Loading = () => {
    return(
        <View style={styles.container}>
            <ActivityIndicator size={48}/>
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
