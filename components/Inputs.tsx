import { FormControl, useTheme } from "native-base"
import { useState } from "react";
import { KeyboardTypeOptions, Pressable, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

type TextInputParams = {
    value: string,
    onchangeValue: (e: string) => void,
    requiredError?: boolean,
    label?: string,
    placeholder: string,
    styleContainer?: ViewStyle,
    styleInputContainer?: ViewStyle,
    styleInput?: TextStyle,
    isTextArea?: boolean,
    type?: string; // Change the type to string
}


type TextInputPasswordParams = {
    value: string,
    onchangeValue: (e:string) => void,
    requiredError?: boolean,
    label?: string,
    placeholder: string,
    styleContainer?: ViewStyle,
    styleInputContainer?: ViewStyle,
    styleInput?: TextStyle,
    isTextArea?: string,
}


export const TextInputComp = ({ value, onchangeValue, requiredError = false, label, placeholder = "", styleContainer, 
    styleInputContainer, styleInput, isTextArea, type="default" }: TextInputParams) => {
    const theme = useTheme();

    return (
        <FormControl style={{ ...styleContainer }}>
            
            <FormControl.Label style={{marginLeft: 20}}>{label}</FormControl.Label>
            
            <View style={{ ...styleInputContainer }}>
                {isTextArea ? (
                    <TextInput
                        keyboardType={type as KeyboardTypeOptions}
                        value={value}
                        onChangeText={onchangeValue}
                        placeholder={placeholder}
                        style={{minHeight:100, ...styleInput }} // Adjust height as needed
                        multiline={true}
                    />
                ) : (
                    <TextInput
                        keyboardType={type as KeyboardTypeOptions}
                        value={value}
                        onChangeText={onchangeValue}
                        placeholder={placeholder}
                        style={{ ...styleInput}}
                    />
                )}
            </View>

           
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
                
            </FormControl>
        )
    }