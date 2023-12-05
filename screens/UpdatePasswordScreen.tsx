import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { LIGHT_GRAY, MAIN_COLOR, WHITE } from "../utils/utils";
import { TextInputPassword } from "../components/Inputs";
import { RegularHeader } from "../components/Header";


export default function UpdatePasswordScreen({}){

    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [Password2, setPassword2] = useState("");



    return(
        <View style={styles.container}>

            <View style={{backgroundColor:MAIN_COLOR, paddingBottom: 60, borderBottomLeftRadius:25, borderBottomRightRadius:25  }}>
                <RegularHeader title="Update Password"/>

                <View>
                    <TextInputPassword value={currentPassword} onchangeValue={setCurrentPassword} placeholder="Mevcut Şifrenizi Girin" 
                    label="Mevcut Şifre"  styleContainer={styles.TextInputPassword} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                    <TextInputPassword value={password} onchangeValue={setPassword} placeholder="Yeni Şifrenizi Girin" label="Yeni Şifre"
                    styleContainer={styles.TextInputPassword} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                    <TextInputPassword value={Password2} onchangeValue={setPassword2} placeholder="Şifreyi Tekrar Girin" 
                    label="Şifre Tekrarı"  styleContainer={styles.TextInputPassword} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                </View>
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
})