import { View, Text } from "react-native";
import { useEffect } from "react";
import useI18n from "../hooks/useI18n";
import { useSelector } from "react-redux";
import { RootStateType } from "../store/store";
import { WHITE } from "../utils/utils";


export default function AuthProvider({children}: any){

    const {t} = useI18n("AuthProvider");
    const userId = useSelector<RootStateType, any>((state:any) => state.user.userInfo.id);

    useEffect(() => {
      console.log("userıd", userId)
    
    }, [])
    
    if(userId == undefined){
        return(
            <View style={{flex:1, backgroundColor: WHITE, justifyContent:"center", alignItems:"center"}}>
                <Text>Oturum Açmanız Gerekmektedi</Text>
            </View>
        )
    }

    return children;
    
}