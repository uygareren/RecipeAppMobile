import { StyleSheet, View } from "react-native";
import { TabAccountScreenProps } from "../../navigations/ProfileNavigation";
import { WHITE } from "../../utils/utils";
import { SettingsHeader } from "../../components/Header";


export default function ProfileScreen({navigation, route}: TabAccountScreenProps<"Profile">){
    return(
        <View style={styles.container}>

            <View style={{marginTop: 40}}>
                <SettingsHeader/>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: WHITE
    }
})