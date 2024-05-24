import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { ButtonComp } from "../components/Button";
import useI18n from "../hooks/useI18n";
import { RootStateType } from "../store/store";
import { GRAY_2, MAIN_COLOR_2, MAIN_COLOR_GREEN, WHITE } from "../utils/utils";


export default function AuthProvider({children}: any){

    const navigation = useNavigation<any>();

    const {t} = useI18n("AuthProvider");
    const userId = useSelector<RootStateType, any>((state:any) => state.user.userInfo.userId);

    if(userId == undefined){
        return(
            <SafeAreaView style={{flex:1, backgroundColor: WHITE, alignItems:"center",justifyContent:"center",}}>

                    <View style={{flexDirection:"row"}}>
                        <Text style={{fontSize:44, fontWeight:"900", color:MAIN_COLOR_2}}>D</Text>
                        <Text style={{fontSize:44, fontWeight:"800", color:MAIN_COLOR_2}}>i</Text>
                        <Text style={{fontSize:44, fontWeight:"700", color:MAIN_COLOR_2}}>sh</Text>
                        <Text style={{fontSize:44, fontWeight:"600", color:MAIN_COLOR_GREEN}}>co</Text>
                        <Text style={{fontSize:44, fontWeight:"500", color:MAIN_COLOR_GREEN}}>ve</Text>
                        <Text style={{fontSize:44, fontWeight:"400", color:MAIN_COLOR_GREEN}}>ry</Text>
                    </View>
                    <View style={{position:"absolute", bottom:100, right:0, left:0, alignItems:"center"}}>
                        <View style={{marginTop:32}}>
                            <Text style={{fontWeight:"600", fontSize:14, color:GRAY_2}}>{t("message")}</Text>
                        </View>

                        <ButtonComp title={t("login")} onPress={() => navigation.navigate("ProfileNavigation")} styleContainer={{
                            alignSelf: "center",
                            alignItems: "center",
                            marginTop: 20,
                            backgroundColor: MAIN_COLOR_GREEN,
                            borderRadius: 6,
                            paddingVertical: 12,
                            width:"80%",
                            ...styles.shadow
                    }}
                    styleText={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: WHITE
                    }}/>
                    </View>
                    
                
                {/* <View style={{width:"100%", alignItems:"center"}}>
                    
                   
                </View> */}
            </SafeAreaView>
        )
    }

    return children;
    
}

const styles = StyleSheet.create({
    shadow:{
        shadowColor:MAIN_COLOR_GREEN,
        shadowOffset:{
            width:4,
            height:4
        },
        shadowOpacity:0.7,
        shadowRadius:3.84,
        elevation:9
    }
})