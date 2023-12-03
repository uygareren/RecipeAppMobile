import { Dimensions, Modal, Text, TouchableOpacity, View } from "react-native"
import { useEffect } from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import { LANG_STORE, LIGHT_GRAY } from "../../utils/utils";
import { Image } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../store/store";
import { userSliceActions } from "../../store/reducer/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useI18n from "../../hooks/useI18n";
import { useTranslation } from "react-i18next";


type ChangeLanguageParams = {
    isModalVisible: boolean,
    setIsModalVisible: (isModalVisible: boolean) => void;
}

export const ChangeLanguage = ({isModalVisible, setIsModalVisible}: ChangeLanguageParams) => {
    
    
    const dispatch = useDispatch();
    const userLang = useSelector<RootStateType, string>((state) => state.user.lang)

    const {t, i18n} = useI18n("SettingsScreen")


    const languages = [
        { name: "Türkçe", value: "tr", image: require("../../assets/country_flags/tr.png") },
        { name: "English", value: "en", image: require("../../assets/country_flags/en.png") },
        
    ]
    

    function handleChangeLanguage(lang: string) {
        i18n.changeLanguage(lang);
        dispatch(userSliceActions.setLang(lang));
        AsyncStorage.setItem(LANG_STORE, lang)
        
    }
    

    return(
        <Modal visible={isModalVisible} animationType="slide">
            <View>

                <TouchableOpacity style={{alignSelf: "flex-end", marginRight: 25, marginTop: 25}} onPress={() => setIsModalVisible(false)}>
                    <FontAwesome5 name="chevron-down" size={24} color="black" />
                </TouchableOpacity>

                <View style={{marginTop: 20, alignItems: "center"}}>
                    <Text style={{fontSize: 24, fontWeight: "500"}}>Change Language</Text>
                </View>

                <View style={{backgroundColor: LIGHT_GRAY, height:1, width: "90%", alignSelf: "center", marginTop: 5}}/>

                <View style={{marginTop:20}}>
                {languages.map((v, i) => (
                        <TouchableOpacity key={i} onPress={() => handleChangeLanguage(v.value)}>
                            <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image source={v.image} />
                                    <Text style={{ fontSize: 17.5, fontWeight: "300", marginLeft: 10 }}>
                                        {v.name}
                                    </Text>
                                    {v.value == userLang ? (
                                        <View style={{position: "absolute", right: 25}}>
                                            <AntDesign name="check" size={24} color="black" />
                                        </View>
                                    ) : null}
                                </View>
                                <View style={{ width: Dimensions.get("screen").width - 30, 
                            alignSelf: "center", height: 1, backgroundColor: "#dfdfdf", marginTop: 10 }} />
                            </View>  
                        </TouchableOpacity>
                    ))}
                </View>

                

            </View>
        </Modal>
    )
}