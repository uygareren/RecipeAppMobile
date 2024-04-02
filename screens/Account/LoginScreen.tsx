import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { ButtonComp } from "../../components/Button";
import { TextInputComp, TextInputPassword } from "../../components/Inputs";
import useI18n from "../../hooks/useI18n";
import { TabAccountScreenProps } from "../../navigations/ProfileNavigation";
import { login } from "../../services/AuthServices";
import { userSliceActions } from "../../store/reducer/userSlice";
import { MAIN_COLOR, PINK, WHITE } from "../../utils/utils";


export default function LoginScreen({ route }: TabAccountScreenProps<"Login">) {

    const {t} = useI18n("LoginScreen");

    const [email, setEmail] = useState("uygarerenx@gmail.com");
    const [password, setPassword] = useState("Uygareren111ue.");

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();
    const navigation = useNavigation<any>()

    const loginMutation = useMutation({
        mutationKey:["login"],
        mutationFn: login,
        onSuccess: (data) => {
            dispatch(userSliceActions.setUser(data?.data?.data));
            navigation.navigate("HomeNavigation");
        }
    })

    const handleLogin = async () => {
        setLoading(true)
        loginMutation.mutate({email,password});
        setLoading(false)

    };


    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.body_container}>

                <View style={{alignItems: "center", position:"absolute", top: 0, justifyContent: "center"}}>
                </View>

                <View>
                    <Text style={{fontSize: 25, fontWeight:"500", alignSelf:"center"}}>{t("sign_in")}</Text>
                </View>

                <View>
                    <TextInputComp value={email} onchangeValue={setEmail} label={t("email")} placeholder={t("email_placeholder")} 
                    styleContainer={styles.TextInputComp} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                    <TextInputPassword value={password} onchangeValue={setPassword} label={t("password")} placeholder={t("password_placeholder")}
                    styleContainer={styles.TextInputPassword} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                </View>

                <View>
                    <ButtonComp loading={loading} title={t("btn_title")} onPress={() => handleLogin()} styleContainer={styles.buttonContainer}
                    styleText={styles.textButton}/>
                </View>

                <View style={{marginTop: 30, flexDirection: "row", 
                justifyContent: "flex-end", alignItems: "center", paddingRight: 40}}>
                    <Text style={{fontWeight:"500", color:WHITE,marginRight: 5}}>{t("no_account")}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={{fontWeight:"600", fontSize:16, color:PINK,marginRight: 10}}>{t("get_register")}</Text>
                    </TouchableOpacity>
                </View>

            </View>
       
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: WHITE,
    },
    body_container:{
        height: "70%",
        justifyContent: "center",
        backgroundColor: MAIN_COLOR,
        marginTop: 50,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40
    },
    TextInputComp:{
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
