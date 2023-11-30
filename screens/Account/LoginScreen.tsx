import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { TabAccountScreenProps } from "../../navigations/ProfileNavigation";
import { TextInputComp, TextInputPassword } from "../../components/Inputs";
import { useState } from "react";
import { MAIN_COLOR, PINK, WHITE } from "../../utils/utils";
import { ButtonComp } from "../../components/Button";


export default function LoginScreen({ navigation, route }: TabAccountScreenProps<"Login">) {

    const [email, setEmail] = useState("uygareren@gmail.com")
    const [password, setPassword] = useState("password")

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.body_container}>

                <View style={{alignItems: "center", position:"absolute", top: 0, justifyContent: "center"}}>
                    <Text style={{fontStyle: "italic", fontSize: 28, color: "#7224a3"}}>Foody</Text>
                </View>

                <View>
                    <Text style={{fontSize: 25, fontWeight:"500", alignSelf:"center"}}>Sıgn In</Text>
                </View>

                <View>
                    <TextInputComp value={email} onchangeValue={setEmail} label="Email" placeholder="Email Girin" 
                    styleContainer={styles.TextInputComp} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                    <TextInputPassword value={password} onchangeValue={setPassword} label="Password" placeholder="Parola Girin" 
                    styleContainer={styles.TextInputPassword} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                </View>

                <View>
                    <ButtonComp title="Login" onPress={() => console.log("Login Tıklandı")} styleContainer={styles.buttonContainer}
                    styleText={styles.textButton}/>
                </View>

                <View style={{marginTop: 30, flexDirection: "row", 
                justifyContent: "flex-end", alignItems: "center", paddingRight: 40}}>
                    <Text style={{fontWeight:"500", color:WHITE,marginRight: 5}}>Hesabım Yok!</Text>
                    <TouchableOpacity>
                        <Text style={{fontWeight:"600", fontSize:16, color:PINK,marginRight: 10}}>Kayıt Ol</Text>
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
