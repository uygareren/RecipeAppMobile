import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import category_data from "../assets/datas/category_data.json";

export default function CategoryDetail({ route }: any) {
    const { id } = route.params;

    const [detailData, setdetailData] = useState<any[]>([])

    useEffect(() => {
        
        const data = category_data.filter((item) => item.id === id);
        setdetailData(data);

        console.log("data", data)

    }, [id]);

    return(
        <View style={{flex:1,alignItems:"center", justifyContent:"center", backgroundColor:"pink"}}>
            <Text style={{fontSize:40, alignSelf:"center"}}>{id}</Text>
        </View>
    );
}
