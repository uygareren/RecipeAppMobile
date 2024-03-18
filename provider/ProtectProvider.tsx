import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react"
import { DEFAULT_LANGUAGE, LANG_STORE, setMomentLanguage } from "../utils/utils";
import { useDispatch } from "react-redux";
import { userSliceActions } from "../store/reducer/userSlice";
import { Loading } from "../components/Loading";
import { useTranslation } from "react-i18next";


export default function ProtectProvider({children}: any){
    
    const dispatch = useDispatch();
    const {i18n} = useTranslation();

    // HOOKS
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      Auth();  
    }, [])
    

    async function Auth() {

        const lang = await AsyncStorage.getItem(LANG_STORE);

        if(lang){
            dispatch(userSliceActions.setLang(lang));
            i18n.changeLanguage(lang);
            setMomentLanguage(lang);
            
        }else{
            await AsyncStorage.setItem(LANG_STORE,DEFAULT_LANGUAGE);
        }

    }

    if(loading){
        return <Loading/>
    }

    return children;

}