import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { LIGHT_GRAY, MAIN_COLOR, PINK, WHITE } from "../utils/utils";
import { TextInputPassword } from "../components/Inputs";
import { RegularHeader, TopHeader } from "../components/Header";
import { AuthServices } from "../services/AuthServices";
import { ButtonComp } from "../components/Button";
import { useSelector } from "react-redux";
import { Alert } from "native-base";


export default function UpdatePasswordScreen({}){
    
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

            console.log("response", response)

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
                <TopHeader title="Update Password"/>
                <View style={{backgroundColor:LIGHT_GRAY, height:1, width:Dimensions.get("screen").width*8/10, alignSelf:"center", marginTop:5}}/>
                

                <View>
                    <TextInputPassword value={currentPassword} onchangeValue={setCurrentPassword} placeholder="Mevcut Şifrenizi Girin" 
                    label="Mevcut Şifre"  styleContainer={styles.TextInputPassword} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                    <TextInputPassword value={password} onchangeValue={setPassword} placeholder="Yeni Şifrenizi Girin" label="Yeni Şifre"
                    styleContainer={styles.TextInputPassword} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                    <TextInputPassword value={password2} onchangeValue={setPassword2} placeholder="Şifreyi Tekrar Girin" 
                    label="Şifre Tekrarı"  styleContainer={styles.TextInputPassword} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                </View>
            </View>

            <View>
                <ButtonComp loading={loading} title="Update Password" onPress={() => handleUpdatePassord()} styleContainer={styles.buttonContainer}
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
        width: "90%",
        alignSelf: "center",
        borderRadius: 19,
        backgroundColor: "#faf8f7",
    },
    TextInputPassword:{
        marginVertical:10,
        marginTop: 20,
    },
    TextInput:{
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: "83%",
        backgroundColor: "#faf8f7",
        borderRadius: 18,
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