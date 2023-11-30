import { TextStyle, TouchableOpacity, ViewStyle, Text } from "react-native";

type ButtonCompParams = {
    title: string,
    onPress: () => void,
    styleContainer?: ViewStyle,
    styleText?: TextStyle
}

export const ButtonComp = ({ title, onPress, styleContainer, styleText }: ButtonCompParams) => {
    return (
        <TouchableOpacity onPress={onPress} style={{...styleContainer}}>
            <Text style={{...styleText}}>{title}</Text>
        </TouchableOpacity>
    );
};
