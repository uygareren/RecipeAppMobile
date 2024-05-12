import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "native-base";
import { useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { ButtonComp } from "../../components/Button";
import { TextInputComp, TextInputPassword } from "../../components/Inputs";
import { ToastError } from "../../components/Toast";
import useI18n from "../../hooks/useI18n";
import { TabAccountScreenProps } from "../../navigations/ProfileNavigation";
import { login } from "../../services/AuthServices";
import { userSliceActions } from "../../store/reducer/userSlice";
import { authButtonContainer, authTextButton } from "../../styles/styles";
import { keyGenerator, LANG_STORE, MAIN_COLOR, PINK, WHITE } from "../../utils/utils";


export default function LoginScreen({ route }: TabAccountScreenProps<"Login">) {

    const {t} = useI18n("LoginScreen");

    const toast = useToast();

    const [email, setEmail] = useState("mehmeteren@gmail.com");
    const [password, setPassword] = useState("mehmet123456.");

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();
    const navigation = useNavigation<any>();

    let lang_data: string | null;

    async function fetchData() {
        lang_data = await AsyncStorage.getItem(LANG_STORE);
        console.log("lang", lang_data);
    }

    fetchData();

const loginMutation = useMutation({
    mutationKey:["login"],
    mutationFn: login,
    onSuccess: async (data) => {
        dispatch(userSliceActions.setUser(data?.data?.data));
        await handleNavigate(data?.data?.data?.userId);
        console.log("data",data);
    },
    onError: async(error: any) => {
        console.log("error", error?.response?.data);
        if (lang_data) {
            toast.show(ToastError(error?.response?.data[`message_${lang_data}`]));
        } else {
            toast.show(ToastError("An error occurred"));
        }
    }
});


    const handleLogin = async () => {
        setLoading(true)
        loginMutation.mutate({email,password});
        setLoading(false)

    };

    const handleNavigate = async (id:string) => {
        const key = keyGenerator("interest",id)
        let value :any;
        await AsyncStorage.getItem(key).then((storedValue) => value = storedValue);

        console.log("value?", value);

        if(value == undefined){
            navigation.navigate("InterestSelection");
        }else{
            navigation.navigate("HomeNavigation");
        }
    }


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
                    styleContainer={styles.TextInputComp} styleLabel={{marginLeft:20}} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                    <TextInputPassword value={password} onchangeValue={setPassword} label={t("password")} placeholder={t("password_placeholder")}
                    styleContainer={styles.TextInputPassword} styleLabel={{marginLeft:20}} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                </View>

                <View>
                    <ButtonComp loading={loading} title={t("btn_title")} onPress={() => handleLogin()} styleContainer={{...authButtonContainer}}
                    styleText={{...authTextButton}}/>
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
        justifyContent: "center",
        backgroundColor: MAIN_COLOR,
        marginTop: 50,
        paddingVertical:50,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40
    },
    TextInputComp:{
        marginVertical:10,
        paddingHorizontal:20,
        marginTop: 20
    },
    TextInputPassword:{
        paddingHorizontal:20,
        marginVertical:10,
        marginTop: 20,
    },
    InputContainer:{
        flexDirection: "row",
        backgroundColor: WHITE,
        width: Dimensions.get('screen').width*0.89,
        alignSelf: "center",
        borderRadius: 19

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
