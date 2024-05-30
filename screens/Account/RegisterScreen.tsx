import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { useToast } from "native-base";
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMutation } from "react-query";
import { ButtonComp } from "../../components/Button";
import { TextInputComp, TextInputPassword } from "../../components/Inputs";
import { ToastError } from "../../components/Toast";
import useI18n from "../../hooks/useI18n";
import { TabAccountScreenProps } from "../../navigations/ProfileNavigation";
import { register } from "../../services/AuthServices";
import { authButtonContainer, authTextButton } from "../../styles/styles";
import { BLACK_COLOR, CONTAİNER_HORİZONTAL, LANG_STORE, LIGHT_GRAY, MAIN_COLOR_2, MAIN_COLOR_GREEN, PINK, WHITE } from "../../utils/utils";


export default function RegisterScreen({navigation, route}: TabAccountScreenProps<"Register">){

    const {t} = useI18n("RegisterScreen");

    const {width, height} = Dimensions.get("screen");

    const toast = useToast();

    const [name, setName] = useState("uygar")
    const [surname, setSurname] = useState("erenn")
    const [email, setEmail] = useState("uygarerenx@gmail.com")
    const [password_1, setPassword1] = useState("Uygareren111ue.")
    const [password_2, setPassword2] = useState("Uygareren111ue.")
    const [checkBox, setCheckBox] = useState<boolean>(false);

    const [loading, setLoading] = useState(false);

    let lang_data: string | null;

    async function fetchData() {
        lang_data = await AsyncStorage.getItem(LANG_STORE);
    }

    fetchData();

    const registerMutation = useMutation({
        mutationKey: ["register"],
        mutationFn: register,
        onSuccess(data, variables, context) {
            if(data?.data.success){
                navigation.navigate("Login");
            }
        },
        onError: async(error: any) => {
            console.log("error", error?.response?.data);
            if (lang_data) {
                toast.show(ToastError(error?.response?.data[`message_${lang_data}`]));
            } else {
                toast.show(ToastError("An error occurred"));
            }

            setLoading(false);
        }
    })

    const handleRegister = async () => {
        setLoading(true);
        if(checkBox == true){
            await registerMutation.mutateAsync({name, surname, email, password_1, password_2});        
        }else{
            toast.show(ToastError("Sözleşmeyi onaylamanız Gerekiyor!"))
        }

        setLoading(false);
    }

    return(
        <ScrollView style={styles.container}>

                {/* <View style={{alignItems: "center", position:"absolute", top: 0, justifyContent: "center"}}>
                    <Text style={{fontStyle: "italic", fontSize: 28, color: "#7224a3"}}>Foody</Text>
                </View> */}

                <View style={{ marginTop:95}}>
                    <Text style={{fontSize: 22, fontWeight:"500", }}>Create an account</Text>
                    <View style={{width:width*0.6, marginTop:5}}>
                        <Text style={{color:BLACK_COLOR, fontSize:13, fontWeight:"300"}}>Open your account now and start using</Text>
                    </View>
                </View>

                <View>
                    <TextInputComp value={name} onchangeValue={setName} label={t("name")} placeholder={t("name_placeholder")} 
                    styleContainer={styles.TextInputComp} styleLabel={{marginLeft:5}} 
                    styleInputContainer={{...styles.InputContainer, borderWidth:2, borderRadius:10, borderColor:LIGHT_GRAY}} 
                    styleInput={styles.TextInput}/>
                    <TextInputComp value={surname} onchangeValue={setSurname} label={t("surname")} placeholder={t("surname_placeholder")} 
                    styleContainer={styles.TextInputComp} styleLabel={{marginLeft:5}} 
                    styleInputContainer={{...styles.InputContainer, borderWidth:2, borderRadius:10, borderColor:LIGHT_GRAY}} 
                    styleInput={styles.TextInput}/>
                    <TextInputComp value={name} onchangeValue={setName} label={t("email")} placeholder={t("email_placeholder")} 
                    styleContainer={styles.TextInputComp} styleLabel={{marginLeft:5}} 
                    styleInputContainer={{...styles.InputContainer, borderWidth:2, borderRadius:10, borderColor:LIGHT_GRAY}} 
                    styleInput={styles.TextInput}/>
                    <TextInputPassword value={password_1} onchangeValue={setPassword1} label={t("password")} placeholder={t("password_placeholder")}
                    styleContainer={styles.TextInputPassword} styleLabel={{marginLeft:5}} 
                    styleInputContainer={{...styles.InputContainer, borderWidth:2, borderRadius:10, borderColor:LIGHT_GRAY}} 
                    styleInput={styles.TextInput}/>
                    <TextInputPassword value={password_2} onchangeValue={setPassword2} label={t("confirm_password")} placeholder={t("confirm_password_placeholder")} 
                    styleContainer={styles.TextInputPassword} styleLabel={{marginLeft:5}} 
                    styleInputContainer={{...styles.InputContainer, borderWidth:2, borderRadius:10, borderColor:LIGHT_GRAY}} 
                    styleInput={styles.TextInput}/>
                </View>

                <View style={{marginTop:12, flexDirection:"row", alignItems:"center", paddingHorizontal:5}}>
                    <Checkbox 
                        value={checkBox}
                        onValueChange={() => setCheckBox(!checkBox)}
                        color={MAIN_COLOR_2}
                    />

                    <Text style={{marginLeft:10, fontSize:13, fontWeight:"500", color:MAIN_COLOR_2}}>Accept Terms</Text>
                </View>

                <View style={{marginTop:12}}>
                    <ButtonComp loading={loading} title={t("register_btn")} onPress={() => handleRegister()} 
                    styleContainer={{...authButtonContainer, borderRadius:10, width:"100%", paddingVertical:18, backgroundColor:MAIN_COLOR_GREEN}}
                    styleText={{...authTextButton, fontWeight:"700", fontSize:18}}/>
                </View>

                <View style={{marginTop:15, marginBottom:40,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                <Text style={{fontSize:13, fontWeight:"600"}}>{t("already_have_account")}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={{fontSize:13, fontWeight:"600", marginLeft:4, color:MAIN_COLOR_2}}>{t("sign_in")}</Text>
                </TouchableOpacity>

            </View>

                
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: WHITE,
        paddingHorizontal:CONTAİNER_HORİZONTAL
    },
   
    TextInputComp:{
        marginVertical:10,
        marginTop: 20
    },
    InputContainer:{
        flexDirection: "row",
        backgroundColor: WHITE,
        width: "100%",
        alignSelf: "center",
        borderRadius: 19

    },
    TextInputPassword:{
        marginVertical:10,
        marginTop: 20,
    },
    TextInput:{
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: "83%",
        backgroundColor: "white",
        borderRadius: 18
    },
    buttonContainer:{
        alignSelf: "center",
        alignItems: "center",
        marginTop: 20,
        backgroundColor: PINK,
        borderRadius: 25,
        paddingVertical: 12,
        width: "40%"
    },
    textButton:{
        fontSize: 16,
        fontWeight: "500",
        color: WHITE
    }
})