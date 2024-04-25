import { Alert } from "native-base";
import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { ButtonComp } from "../components/Button";
import { Divider } from "../components/Divider";
import { TopHeader } from "../components/Header";
import { TextInputPassword } from "../components/Inputs";
import useI18n from "../hooks/useI18n";
import { AuthServices } from "../services/AuthServices";
import { PINK, WHITE } from "../utils/utils";


export default function UpdatePasswordScreen({}){

    const {t} = useI18n("UpdatePasswordScreen");

    const width = Dimensions.get("screen").width;
    
    const [currentPassword, setCurrentPassword] = useState("Uygareren111ue.");
    const [password, setPassword] = useState("parola111.");
    const [password2, setPassword2] = useState("parola111.");

    const [loading, setLoading] = useState(false)

    const userInfo = useSelector((state:any) => state.user.userInfo);

    const updatePasswordMutation = AuthServices.useUpdatePassword();
    
    async function handleUpdatePassord() {
        setLoading(true)
        try {
            const response = await updatePasswordMutation.mutateAsync({userId:userInfo.userId, 
                currentPassword:currentPassword, 
                newPassword1: password,
                newPassword2: password2,
            })


            if(response.data.success){
                Alert("Başarılı!")
            }else{
                Alert("Hata!")
            }

        } catch (error) {
            console.error("Login Failed:", error);
    
            // Log more details about the Axios error
            if (error) {
                console.error("Axios Error Details:", error);
            }
        }
        setLoading(false);
    }

    return(
        <View style={styles.container}>

            <View style={{backgroundColor:WHITE, paddingBottom: 60, borderBottomLeftRadius:25, borderBottomRightRadius:25, marginTop:50  }}>
                <TopHeader title={t("update_password")}/>
                <Divider height={1} width={width*0.8} style={{alignSelf:"center", marginTop:5}}/>

                <View>
                    <TextInputPassword value={currentPassword} onchangeValue={setCurrentPassword} placeholder={t("enter_current_password_placeholder")}
                    label={t("enter_current_password")}  styleContainer={styles.TextInputPassword} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                    <TextInputPassword value={password} onchangeValue={setPassword} placeholder={t("enter_new_password_placeholder")} label={t("enter_new_password")}
                    styleContainer={styles.TextInputPassword} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                    <TextInputPassword value={password2} onchangeValue={setPassword2} placeholder={t("enter_new_confirm_password_placeholder")}
                    label={t("enter_new_confirm_password")}  styleContainer={styles.TextInputPassword} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                </View>
            </View>

            <View>
                <ButtonComp loading={loading} title={t("update_btn")} onPress={() => handleUpdatePassord()} styleContainer={styles.buttonContainer}
                styleText={styles.textButton}/>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:WHITE
    },
    InputContainer:{
        flexDirection: "row",
        backgroundColor: WHITE,
        width: Dimensions.get('screen').width*0.89,
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
        backgroundColor: "#faf8f7",
        borderRadius: 18
    },
    buttonContainer:{
        alignSelf: "center",
        alignItems: "center",
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