import { ActivityIndicator, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { WHITE } from "../utils/utils";

type ButtonCompParams = {
    loading?: boolean, 
    title: string,
    onPress: () => void,
    styleContainer?: ViewStyle,
    styleText?: TextStyle,
    isActive ?: boolean;
}

export const ButtonComp = ({loading, title, onPress, styleContainer, styleText, isActive=true }: ButtonCompParams) => {
    return (
        <TouchableOpacity disabled={!isActive} onPress={onPress} style={{...styleContainer, opacity: isActive ? 1 : 0.7}}>
            {
                loading ? (<ActivityIndicator color={WHITE}/>) : (<Text style={{...styleText}}>{title}</Text>)
            }
        </TouchableOpacity>
    );
};
