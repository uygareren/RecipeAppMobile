import { TabAccountScreenProps } from "../../navigations/ProfileNavigation";
import { SafeAreaView, StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { BLACK_COLOR, MAIN_COLOR, PINK, WHITE } from "../../utils/utils";
import { TextInputComp, TextInputPassword } from "../../components/Inputs";
import { ButtonComp } from "../../components/Button";
import { AuthServices } from "../../services/AuthServices";


export default function RegisterScreen({navigation, route}: TabAccountScreenProps<"Register">){

    const [name, setName] = useState("uygar")
    const [surname, setSurname] = useState("erenn")
    const [email, setEmail] = useState("uygarerenx@gmail.com")
    const [password_1, setPassword1] = useState("Uygareren111ue.")
    const [password_2, setPassword2] = useState("Uygareren111ue.")

    const [loading, setLoading] = useState(false)

    const registerMutation = AuthServices.useRegister();

    const handleRegister = async () => {
        setLoading(true)
        try {
            const registerResp = await registerMutation.mutateAsync({name, surname, email, password_1, password_2});

            if(registerResp.data.success){
                navigation.navigate("Login")
            }else{
                alert("Hata")
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
        <ScrollView style={styles.container}>
            <View style={styles.body_container}>

                <View style={{alignItems: "center", position:"absolute", top: 0, justifyContent: "center"}}>
                    <Text style={{fontStyle: "italic", fontSize: 28, color: "#7224a3"}}>Foody</Text>
                </View>

                <View>
                    <Text style={{fontSize: 25, fontWeight:"500", alignSelf:"center", marginTop: 100}}>Sign Up</Text>
                </View>

                <View>
                    <TextInputComp value={name} onchangeValue={setName} label="Name" placeholder="Adınızı Girin" 
                    styleContainer={styles.TextInputComp} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                    <TextInputComp value={surname} onchangeValue={setSurname} label="Surname" placeholder="Soyadınızı Girin" 
                    styleContainer={styles.TextInputComp} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                    <TextInputComp value={email} onchangeValue={setEmail} label="Email" placeholder="Email Girin" 
                    styleContainer={styles.TextInputComp} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                    <TextInputPassword value={password_1} onchangeValue={setPassword1} label="Password" placeholder="Parola Girin" 
                    styleContainer={styles.TextInputPassword} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                    <TextInputPassword value={password_2} onchangeValue={setPassword2} label="Confirm Password" placeholder="Tekrar Parolanızı Girin" 
                    styleContainer={styles.TextInputPassword} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                </View>

                <View style={{marginBottom: 70}}>
                    <ButtonComp loading={loading} title="Register" onPress={() => handleRegister()} styleContainer={styles.buttonContainer}
                    styleText={styles.textButton}/>

                    <View style={{marginTop: 30, flexDirection: "row", 
                        justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontWeight:"500", color:BLACK_COLOR,marginRight: 5}}>Zaten Bir Hesabım Var!</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={{fontWeight:"600", fontSize:17, color:PINK,marginRight: 10}}>Giriş Yap</Text>
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