import { FormControl, useTheme } from "native-base"
import { useState } from "react";
import { Pressable, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { Feather } from '@expo/vector-icons';

type TextInputParams = {
    value: string,
    onchangeValue: (e: string) => void,
    requiredError?: boolean,
    label: string,
    placeholder: string,
    styleContainer?: ViewStyle,
    styleInputContainer?: ViewStyle,
    styleInput?: TextStyle,
    isTextArea?: boolean, // New prop
}

type TextInputPasswordParams = {
    value: string,
    onchangeValue: (e:string) => void,
    requiredError?: boolean,
    label: string,
    placeholder: string,
    styleContainer?: ViewStyle,
    styleInputContainer?: ViewStyle,
    styleInput?: TextStyle,
}


export const TextInputComp = ({ value, onchangeValue, requiredError = false, label = "", placeholder = "", styleContainer, styleInputContainer, styleInput, isTextArea }: TextInputParams) => {
    const theme = useTheme();

    return (
        <FormControl style={{ ...styleContainer }}>
            <FormControl.Label style={{ marginLeft: 20 }}>{label}</FormControl.Label>
            <View style={{ ...styleInputContainer }}>
                {isTextArea ? (
                    <TextInput
                        value={value}
                        onChangeText={onchangeValue}
                        placeholder={placeholder}
                        style={{ ...styleInput, width: "100%", height: 100 }} // Adjust height as needed
                        multiline={true}
                    />
                ) : (
                    <TextInput
                        value={value}
                        onChangeText={onchangeValue}
                        placeholder={placeholder}
                        style={{ ...styleInput, width: "100%" }}
                    />
                )}
            </View>

            <FormControl.ErrorMessage leftIcon={<Feather name="info" size={24} color={theme.colors.error[500]} />}>
                {/* Error message content */}
            </FormControl.ErrorMessage>
        </FormControl>
    );
};

export const TextInputPassword = ({
    value, 
    onchangeValue, 
    requiredError=false, 
    label="", 
    placeholder="", 
    styleContainer,
    styleInputContainer, 
    styleInput}:TextInputPasswordParams) => {

        const theme = useTheme();
        const [isShow, setisShow] = useState(true)

        return(
            <FormControl style={{...styleContainer}}>
                <FormControl.Label style={{marginLeft: 20}}>{label}</FormControl.Label>
                <View style={{...styleInputContainer}}>
                    <TextInput value={value} onChangeText={onchangeValue} placeholder={placeholder} secureTextEntry={isShow} style={{...styleInput}}/>

                    <Pressable onPress={() => setisShow(!isShow)} style={{marginLeft: 20, justifyContent: "center"}}>
                        {isShow ? (<Feather name="eye-off" size={24} color="black" />) : (<Feather name="eye" size={24} color="black" />)}
                    </Pressable>
                </View>
                

                <FormControl.ErrorMessage leftIcon={<Feather name="info" size={24} color={theme.colors.error[500]} />}>

                </FormControl.ErrorMessage>
            </FormControl>
        )
    }