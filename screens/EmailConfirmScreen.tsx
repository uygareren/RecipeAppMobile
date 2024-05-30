import { FontAwesome5 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useToast } from "native-base"
import { useState } from "react"
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useMutation } from "react-query"
import { ButtonComp } from "../components/Button"
import { TextInputComp } from "../components/Inputs"
import { ToastError } from "../components/Toast"
import useI18n from "../hooks/useI18n"
import { postEmailConfirmation } from "../services/ApiService"
import { authButtonContainer, authTextButton } from "../styles/styles"
import { BLACK_COLOR, BORDER_RADIUS_2, CONTAİNER_HORİZONTAL, LIGHT_GRAY, MAIN_COLOR_GREEN, WHITE } from "../utils/utils"

export default function EmailConfirmScreen(){

    const {t} = useI18n("LoginScreen");

    const [email, setEmail] = useState("");

    const navigation = useNavigation<any>();

    const toast = useToast();

    const {mutate:emailConfirmationMutation, isLoading} = useMutation({
        mutationKey: ["email-confirmation"],
        mutationFn: postEmailConfirmation,
        onError(error, variables, context) {
            console.log("error",error);
            toast.show(ToastError("Hata"));
            
        },
        onSuccess(data, variables, context) {
            navigation.push("CodeConfirmation", {email:email});
        },
    });

    console.log(isLoading);

    function handlePostEmailConfirmation(){

        if(email){
            emailConfirmationMutation({email:email});

        }else{
            toast.show(ToastError("Email Alanını Doldurun!"))
        }
    }

    return(
        <SafeAreaView style={styles.container}>
             <View style={{ marginTop:95}}>

                <TouchableOpacity
                onPress={() => navigation.goBack()}
                    style={{borderRadius:BORDER_RADIUS_2, width:35, height:35, alignItems:"center", justifyContent:"center",
                        backgroundColor:MAIN_COLOR_GREEN}}>
                    <FontAwesome5 name="chevron-left" size={24} color={WHITE} />
                </TouchableOpacity>
 
                 <Text style={{color:BLACK_COLOR, fontSize:16, fontWeight:"300", marginTop:35}}>
                     Şifre sıfırlama kodunu almak için e-mailini gir! 
                 </Text>
             </View>
             <View style={{alignSelf:"center"}}>

 
             <View style={{marginTop:30}}>
                     <TextInputComp value={email} onchangeValue={setEmail} label={t("email")} placeholder={t("email_placeholder")} 
                     styleContainer={styles.TextInputComp} styleLabel={{marginLeft:5}} 
                     styleInputContainer={{...styles.InputContainer, borderWidth:2, borderRadius:10, borderColor:LIGHT_GRAY}} 
                     styleInput={styles.TextInput}/>
                     
             </View>
 
             <View>
                 <ButtonComp loading={isLoading} title={"Gönder"} onPress={() => handlePostEmailConfirmation()} 
                 styleContainer={{...authButtonContainer, borderRadius:10, width:"100%", paddingVertical:18, backgroundColor:MAIN_COLOR_GREEN}}
                 styleText={{...authTextButton, fontWeight:"700", fontSize:18}}/>
             </View>
 
             </View>
         
 
        </SafeAreaView>
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
    TextInputPassword:{
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
})