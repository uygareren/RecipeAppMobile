import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "native-base";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMutation } from "react-query";
import { ButtonComp } from "../../components/Button";
import { TextInputComp, TextInputPassword } from "../../components/Inputs";
import { ToastError } from "../../components/Toast";
import useI18n from "../../hooks/useI18n";
import { TabAccountScreenProps } from "../../navigations/ProfileNavigation";
import { register } from "../../services/AuthServices";
import { authButtonContainer, authTextButton } from "../../styles/styles";
import { BLACK_COLOR, LANG_STORE, MAIN_COLOR, PINK, WHITE } from "../../utils/utils";


export default function RegisterScreen({navigation, route}: TabAccountScreenProps<"Register">){

    const {t} = useI18n("RegisterScreen");

    const toast = useToast();

    const [name, setName] = useState("uygar")
    const [surname, setSurname] = useState("erenn")
    const [email, setEmail] = useState("uygarerenx@gmail.com")
    const [password_1, setPassword1] = useState("Uygareren111ue.")
    const [password_2, setPassword2] = useState("Uygareren111ue.")

    const [loading, setLoading] = useState(false);

    let lang_data: string | null;

    async function fetchData() {
        lang_data = await AsyncStorage.getItem(LANG_STORE);
        console.log("lang", lang_data);
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

        const registerResp = await registerMutation.mutateAsync({name, surname, email, password_1, password_2});        

        setLoading(false);
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.body_container}>

                {/* <View style={{alignItems: "center", position:"absolute", top: 0, justifyContent: "center"}}>
                    <Text style={{fontStyle: "italic", fontSize: 28, color: "#7224a3"}}>Foody</Text>
                </View> */}

                <View>
                    <Text style={{fontSize: 25, fontWeight:"500", alignSelf:"center", marginTop: 100}}>{t("sign_up")}</Text>
                </View>

                <View>
                    <TextInputComp value={name} onchangeValue={setName} label={t("name")} placeholder={t("name_placeholder")}
                    styleContainer={styles.TextInputComp} styleLabel={{marginLeft:20}} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                    <TextInputComp value={surname} onchangeValue={setSurname} label={t("surname")} placeholder={t("surname_placeholder")}
                    styleContainer={styles.TextInputComp} styleLabel={{marginLeft:20}} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                    <TextInputComp value={email} onchangeValue={setEmail} label={t("email")} placeholder={t("email_placeholder")}
                    styleContainer={styles.TextInputComp} styleLabel={{marginLeft:20}} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                    <TextInputPassword value={password_1} onchangeValue={setPassword1} label={t("password")} placeholder={t("password_placeholder")}
                    styleContainer={styles.TextInputPassword} styleLabel={{marginLeft:20}} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                    <TextInputPassword value={password_2} onchangeValue={setPassword2} label={t("confirm_password")} placeholder={t("confirm_password_placeholder")} 
                    styleContainer={styles.TextInputPassword} styleLabel={{marginLeft:20}} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                </View>

                <View style={{marginBottom: 70}}>
                    <ButtonComp loading={loading} title={t("register_btn")} onPress={() => handleRegister()} styleContainer={{...authButtonContainer}}
                    styleText={{...authTextButton}}/>

                    <View style={{marginTop: 30, flexDirection: "row", 
                        justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontWeight:"500", color:BLACK_COLOR,marginRight: 5}}>{t("already_have_account")}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={{fontWeight:"600", fontSize:17, color:PINK,marginRight: 10}}>{t("sign_in")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: WHITE,
    },
    body_container:{
        height: "90%",
        justifyContent: "center",
        backgroundColor: MAIN_COLOR,
        marginTop: 50,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40
    },
    TextInputComp:{
        paddingHorizontal:20,
        marginVertical:10,
        marginTop: 20
    },
    InputContainer:{
        flexDirection: "row",
        backgroundColor: WHITE,
        width: "90%",
        alignSelf: "center",
        borderRadius: 19

    },
    TextInputPassword:{
        paddingHorizontal:20,
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