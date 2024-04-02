import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { ButtonComp } from "../components/Button";
import useI18n from "../hooks/useI18n";
import { RootStateType } from "../store/store";
import { PINK, WHITE } from "../utils/utils";


export default function AuthProvider({children}: any){

    const navigation = useNavigation<any>();

    const {t} = useI18n("AuthProvider");
    const userId = useSelector<RootStateType, any>((state:any) => state.user.userInfo.userId);

    if(userId == undefined){
        return(
            <SafeAreaView style={{flex:1, backgroundColor: WHITE, alignItems:"center", justifyContent:"center"}}>
                
                <View style={{width:"100%", alignItems:"center"}}>
                    <Text style={{fontWeight:"600", fontSize:14}}>Oturum Açmanız Gerekmektedir!</Text>
                    <ButtonComp title="Giriş Yap!" onPress={() => navigation.navigate("Profile")} styleContainer={{
                        alignSelf: "center",
                        alignItems: "center",
                        marginTop: 20,
                        backgroundColor: PINK,
                        borderRadius: 25,
                        paddingVertical: 12,
                        width:"50%"
                    }}
                    styleText={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: WHITE
                    }}/>
                </View>
            </SafeAreaView>
        )
    }

    return children;
    
}