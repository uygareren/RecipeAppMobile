import { View } from "react-native"
import { Double } from "react-native/Libraries/Types/CodegenTypes"
import { LIGHT_GRAY } from "../utils/utils"

type DividerType = {
    height: number | Double,
    width: any
}

export const Divider: React.FC<DividerType> = ({height, width}) => {
    return(
        <View style={{height:height, backgroundColor:LIGHT_GRAY, width: width, alignSelf: "center", marginTop:10}}/>
    )
}