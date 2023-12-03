import { View, Text, StyleSheet } from "react-native"
import { MAIN_COLOR } from "../utils/utils"

type TopHeaderParams={
    title: string
}

export const TopHeader = () => {
    return(
        <View style={styles.topHedarContainer}>
            <Text>Foody</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    topHedarContainer:{
        width: "100%",
        height: 80,
        backgroundColor: MAIN_COLOR
    }
})