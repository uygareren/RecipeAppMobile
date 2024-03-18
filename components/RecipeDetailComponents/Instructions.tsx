import { Text, View } from "react-native";


export function Instructions({item}:any){
    return(
        <View style={{width:"100%"}}>
            <Text>{item}</Text>
        </View>
    )
}