import { Feather } from '@expo/vector-icons';
import { IToastProps, useTheme } from "native-base";
import { Dimensions, Text, View } from "react-native";
import { TOAST_COLOR } from '../utils/utils';

const ToastErrorRender = ({ message="" }: any) => {
    const width = Dimensions.get("screen").width;
    const theme = useTheme();

    return (
        <View style={{ backgroundColor: TOAST_COLOR, width:width*0.8, bottom: 0, paddingVertical:15, borderRadius:8}}>
            <View style={{ flexDirection: "row", width: '100%', alignSelf: "center", alignItems:"center", justifyContent:"center" }}>
                <Feather name="info" color={"#fff"} size={20} />
                <Text style={{ color: "#fff", marginLeft: 15, textAlign: "center", fontWeight:'500' }}>{message}</Text>
            </View>
        </View>
    )
}

const ToastSuccessRender = ({ message="" }: any) => {
    const width = Dimensions.get("screen").width;
    const theme = useTheme();

    return (
        <View style={{ backgroundColor: TOAST_COLOR, width:width*0.8, bottom: 0, paddingVertical:15, borderRadius:8 }}>
            <View style={{ flexDirection: "row", width: '100%', alignSelf: "center", alignItems:"center", justifyContent:"center" }}>
                <Feather name="info" color={"#fff"} size={20} />
                <Text style={{ color: "#fff", marginLeft: 15, textAlign: "center",fontWeight:'500' }}>{message}</Text>
            </View>
        </View>
    )
}

export function ToastError(message: string): IToastProps {
    return {
        placement: "bottom",
        render: () => <ToastErrorRender message={message} />
    }
}
export function ToastSuccess(message: string): IToastProps {
    return {
        placement: "bottom",
        render: () => <ToastSuccessRender message={message} />
    }
}