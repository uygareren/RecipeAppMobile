import { TextStyle, TouchableOpacity, ViewStyle, Text, ActivityIndicator } from "react-native";

type ButtonCompParams = {
    loading?: boolean, 
    title: string,
    onPress: () => void,
    styleContainer?: ViewStyle,
    styleText?: TextStyle
}

export const ButtonComp = ({loading, title, onPress, styleContainer, styleText }: ButtonCompParams) => {
    return (
        <TouchableOpacity onPress={onPress} style={{...styleContainer}}>
            {
                loading ? (<ActivityIndicator/>) : (<Text style={{...styleText}}>{title}</Text>)
            }
            
        </TouchableOpacity>
    );
};
