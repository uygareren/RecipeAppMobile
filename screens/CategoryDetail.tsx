import { Text, View } from "react-native";
import { useEffect } from "react";

export default function CategoryDetail({ route }: any) {
    const { id } = route.params;

    useEffect(() => {
        console.log("id:", id);
    }, [id]);

    return(
        <View style={{flex:1,alignItems:"center", justifyContent:"center", backgroundColor:"pink"}}>
            <Text style={{fontSize:40, alignSelf:"center"}}>{id}</Text>
        </View>
    );
}
