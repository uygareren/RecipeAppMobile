import { Skeleton } from "native-base";
import { View } from "react-native";
import { WHITE } from "../utils/utils";


export default function SkeletonComp(){

    const HeaderSkeletonComp = () => {
        return(
            <View style={{marginTop:50, paddingHorizontal:20}}>
                <Skeleton height={8} width={"80%"} style={{borderRadius:10}}/>
                <Skeleton height={10} width={"90%"} style={{marginTop:20, alignSelf:"center", borderRadius:15}}/>
            </View>
        )
    }

    const CategorySkeletonComp = () => {
        return(
            <View style={{marginTop:50, paddingHorizontal:20}}>
                <Skeleton height={8} width={"35%"} style={{borderRadius:10}}/>
                <View style={{marginTop:15, flexDirection:"row", justifyContent:"space-between", }}>
                    <View style={{alignItems:"center", width:"30%"}}>
                        <Skeleton height={100} width={"100%"}/>
                        <Skeleton height={3} width={10} style={{marginTop:5}}/>
                    </View>
                    <View style={{alignItems:"center", width:"30%"}}>
                        <Skeleton height={100} width={"100%"}/>
                        <Skeleton height={3} width={10} style={{marginTop:5}}/>
                    </View>
                    <View style={{alignItems:"center", width:"30%"}}>
                        <Skeleton height={100} width={"100%"}/>
                        <Skeleton height={3} width={10} style={{marginTop:5}}/>
                    </View>
                </View>

            </View>
        )
    }
    const PopularSkeletonComp = () => {
        return(
            <View style={{marginTop:50, paddingHorizontal:20}}>
                <Skeleton height={8} width={"45%"} style={{borderRadius:10}}/>
                <View style={{marginTop:15, flexDirection:"row", justifyContent:"space-between", }}>
                    <View style={{alignItems:"center", width:"30%"}}>
                        <Skeleton height={100} width={"100%"}/>
                        <Skeleton height={3} width={10} style={{marginTop:5}}/>
                    </View>
                    <View style={{alignItems:"center", width:"30%"}}>
                        <Skeleton height={100} width={"100%"}/>
                        <Skeleton height={3} width={10} style={{marginTop:5}}/>
                    </View>
                    <View style={{alignItems:"center", width:"30%"}}>
                        <Skeleton height={100} width={"100%"}/>
                        <Skeleton height={3} width={10} style={{marginTop:5}}/>
                    </View>
                </View>

            </View>
        )
    }

    const InterestSkeletonComp = () => {
        return(
            <View style={{marginTop:50, paddingHorizontal:20}}>
                <Skeleton height={8} width={"55%"} style={{borderRadius:10}}/>
                <Skeleton height={100} width={"100%"} style={{marginTop:10}}/>
                
            </View>
        )
    }



    return(
        <View style={{flex:1, backgroundColor:WHITE}}>
            <HeaderSkeletonComp/>
            <CategorySkeletonComp/>
            <PopularSkeletonComp/>
            <InterestSkeletonComp/>
        </View>
    )
}