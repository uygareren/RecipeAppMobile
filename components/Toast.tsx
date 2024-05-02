import { Feather } from '@expo/vector-icons';
import { IToastProps, useTheme } from "native-base";
import { Dimensions, Text, View } from "react-native";
import { GREEN, LIGHT_RED } from '../utils/utils';

const ToastErrorRender = ({ message="" }: any) => {
    const width = Dimensions.get("screen").width;
    const theme = useTheme();

    return (
        <View style={{ backgroundColor: LIGHT_RED, width, top: 0, paddingVertical:50}}>
            <View style={{ flexDirection: "row", width: '100%', alignSelf: "center", alignItems:"center", justifyContent:"center" }}>
                <Feather name="info" color={"#fff"} size={20} />
                <Text style={{ color: "#fff", marginLeft: 15, textAlign: "center" }}>{message}</Text>
            </View>
        </View>
    )
}

const ToastSuccessRender = ({ message="" }: any) => {
    const width = Dimensions.get("screen").width;
    const theme = useTheme();

    return (
        <View style={{ backgroundColor: GREEN, width, top: 0, paddingVertical:50 }}>
            <View style={{ flexDirection: "row", width: '100%', alignSelf: "center", alignItems:"center", justifyContent:"center" }}>
                <Feather name="info" color={"#fff"} size={20} />
                <Text style={{ color: "#fff", marginLeft: 15, textAlign: "center" }}>{message}</Text>
            </View>
        </View>
    )
}

export function ToastError(message: string): IToastProps {
    return {
        placement: "top",
        render: () => <ToastErrorRender message={message} />
    }
}
export function ToastSuccess(message: string): IToastProps {
    return {
        placement: "top",
        render: () => <ToastSuccessRender message={message} />
    }
}