import { View, Text, StyleSheet } from "react-native"
import { WHITE } from "../utils/utils"


export const Loading = () => {
    return(
        <View style={styles.container}>
            <Text>LOADİNG...</Text>
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
