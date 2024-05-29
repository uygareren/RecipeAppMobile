import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { useMutation } from "react-query";
import { ButtonComp } from "../components/Button";
import { ToastError, ToastSuccess } from "../components/Toast";
import useI18n from "../hooks/useI18n";
import { postCodeConfirmation, postEmailConfirmation } from "../services/ApiService";
import { authButtonContainer, authTextButton } from "../styles/styles";
import { BLACK_COLOR, BORDER_RADIUS_2, CONTAİNER_HORİZONTAL, GRAY_2, MAIN_COLOR_2, MAIN_COLOR_GREEN, SOFT_BLUE, WHITE } from "../utils/utils";

export default function CodeConfirmationScreen({route}:any) {

    const email = route.params.email;

    const { t } = useI18n("LoginScreen");
    const navigation = useNavigation<any>();

    const toast = useToast();

    // const [loading, setLoading] = useState(false);
    const [counter, setCounter] = useState(90);
    const counterRef = useRef(counter);
    counterRef.current = counter;


    useEffect(() => {
        const timer = setInterval(() => {
            if (counterRef.current > 0) {
                setCounter(counterRef.current - 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const CELL_COUNT = 6;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });


    const emailConfirmationMutation = useMutation({
        mutationKey: ["email-confirmation"],
        mutationFn: postEmailConfirmation,
        onError(error, variables, context) {
            console.log("error",error);
            toast.show(ToastError("Hata"));
            
        },
        onSuccess(data, variables, context) {
            toast.show(ToastSuccess("Kod Tekrar Gönderildi"));
            setCounter(90);
        },
    });

    const {mutate:codeConfirmationMutation, isLoading} = useMutation({
        mutationKey: ["code-confirmation"],
        mutationFn: postCodeConfirmation,
        onError(error, variables, context) {
            console.log("error",error);
            toast.show(ToastError("Kod Hatalı!"));
            
        },
        onSuccess(data, variables, context) {
            navigation.push("ResetPassword", {email:email});
            setCounter(0);

        },
    });

    function handleTryAgain(){

        if(email){
            emailConfirmationMutation.mutate({email:email});

        }else{
            toast.show(ToastError("Hata!"))
        }
        setCounter(90);
    }

    

    function handleSendCode(){
        if(value.length != 6){
            toast.show(ToastError("Kodu Eksiksiz Girin!"));
        }else{
            codeConfirmationMutation({email:email, code:value});
        }
       
    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: 95 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        borderRadius: BORDER_RADIUS_2, width: 35, height: 35, alignItems: "center", justifyContent: "center",
                        backgroundColor: MAIN_COLOR_GREEN
                    }}>
                    <FontAwesome5 name="chevron-left" size={24} color={WHITE} />
                </TouchableOpacity>

                <Text style={{ color: BLACK_COLOR, fontSize: 16, fontWeight: "300", marginTop: 35 }}>
                    Şifre sıfırlama kodunu gir!
                </Text>
            </View>
            <View style={{ alignSelf: "center" }}>
                <View style={{ marginTop: 30 }}>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={{ width: "100%", alignItems: "center" }}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' }) as any}  // Adjusted type
                        testID="my-code-input"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                </View>
                <View style={{marginTop:15, flexDirection:"row", alignItems:"center", borderWidth:0, justifyContent:"flex-end"}}>
                        <Text style={{fontSize:13, fontWeight:"500", color:MAIN_COLOR_2}}>Sorun mu yaşıyorsun? </Text>
                        <TouchableOpacity onPress={handleTryAgain}>
                            <Text style={{fontSize:13, fontWeight:"700", color:MAIN_COLOR_GREEN}}>Tekrar kod gönder</Text>
                        </TouchableOpacity>
                </View>

                <View>
                    <ButtonComp onPress={() => handleSendCode()} loading={isLoading} title={"Kodu Gönder"}
                        styleContainer={{ ...authButtonContainer, marginTop:30,borderRadius: 10, width: "100%", paddingVertical: 18, backgroundColor: MAIN_COLOR_GREEN }}
                        styleText={{ ...authTextButton, fontWeight: "700", fontSize: 18 }} />
                </View>
                <View style={{ marginTop: 25 }}>
                    {counter > 0 ? (
                        <Text style={styles.timerText}>{counter} saniye</Text>
                    ) : (
                        <TouchableOpacity onPress={handleTryAgain} 
                        style={{ alignSelf: 'center', borderWidth: 1.5, borderColor:MAIN_COLOR_2, 
                        paddingVertical:6, paddingHorizontal:16, borderRadius: 5, }}>
                            <Text style={styles.tryAgainText}>Tekrar Dene</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        paddingHorizontal: CONTAİNER_HORİZONTAL
    },
    cell: {
        width: Dimensions.get("screen").width * 0.115,
        height: Dimensions.get("screen").width * 0.115,
        lineHeight: 38,
        fontSize: 24,
        borderColor: 'gray',
        textAlign: 'center',
        margin: 5,
        borderRadius: 8,
        backgroundColor: SOFT_BLUE,
        color: GRAY_2,
        fontWeight: "700",
    },
    focusCell: {
        backgroundColor: MAIN_COLOR_2,
        color: WHITE,
        fontWeight: "700",
        fontSize: 24,
    },
    timerText: {
        textAlign: 'center',
        color: GRAY_2,
        fontSize: 14,
        fontWeight: "700",
    },
    tryAgainText: {
        textAlign: 'center',
        color: MAIN_COLOR_2,
        fontSize: 16,
        fontWeight: "600",
    }
});
