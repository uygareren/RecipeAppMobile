import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { TopHeader } from "../components/Header";
import { Loading } from '../components/Loading';
import { getInterestedData, getMadeMeals } from "../services/ApiService";
import { RootStateType } from "../store/store";
import { BLACK_COLOR, BORDER_RADIUS_1, BORDER_RADIUS_3, CONTAİNER_HORİZONTAL, MAIN_COLOR_2, WHITE } from "../utils/utils";


export default function DoneMealsScreen(){


    const API = process.env.API;
    const width = Dimensions.get("screen").width
    const navigation = useNavigation<any>();

    const userInfo = useSelector((state:RootStateType) => state.user.userInfo);

    const {data ,isLoading} = useQuery(
        ["get-made-meals-by-user"],
        () => getMadeMeals(userInfo?.userId)
    );

    const {data:worldCuisinesData, isLoading:isWorldCuisinesLoading} = useQuery({
        queryKey : ["get-all-world-cuisines"],
        queryFn: getInterestedData
    });


    const RenderItem = ({ navigation, item }: { navigation: any; item: RecipeItem | any }) => {

        console.log("item", item);


        return (
            <Pressable onPress={() => navigation.push("RecipeDetail", {id:item?._id})} style={{ marginBottom: 20, borderRadius: BORDER_RADIUS_1, overflow: 'hidden' }}>
                <View style={{ position: 'relative', height: 150 }}>
                    <Image 
                        source={{ uri: `${API}/recipes/${item?.recipeImage}` }} 
                        style={{ height: '100%', width: '100%', resizeMode: "cover" }} 
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <View style={styles.textContainer}>
                        <View style={{maxWidth:width*0.6}}>
                            <Text style={styles.title}>{item?.recipeName}</Text>
                            <Text style={{...styles.subtitle, marginTop:5}}>By Chef {item?.chefName}</Text>
                        </View>
                        <View>
                            <View style={{ marginBottom:8, backgroundColor:MAIN_COLOR_2, paddingHorizontal:2, paddingVertical:2,
                                borderRadius:BORDER_RADIUS_3, alignItems:'center', justifyContent:'center'
                            }}>
                                <Text style={{fontSize:9, fontWeight:'700', color:BLACK_COLOR}}>{item?.worldCuisineName}</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
                                <Feather name="clock" size={20} color="white" />
                                <Text style={{...styles.duration, marginLeft:5}}>{item?.recipeCookingTime} min</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>
            </Pressable>
        );
    };

    if(isLoading || isWorldCuisinesLoading){
        return(
            <Loading/>
        )
    }


    return(
        <ScrollView style={styles.container}>

            <View style={{marginTop:50}}>
                <TopHeader title="Yaptığım Tarifler"/>
            </View>

            <View style={{marginTop:20, paddingHorizontal:1}}>
                <FlatList
                    data={data?.data[0]?.recipes}
                    keyExtractor={(item) => item?.recipeId?.toString()}
                    renderItem={({ item }) => <RenderItem item={item} navigation={navigation} />}
                    showsVerticalScrollIndicator={false}

                />
            </View>




        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        paddingHorizontal: CONTAİNER_HORİZONTAL,
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: WHITE,
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "300",
        color: WHITE,
    },
    duration: {
        color: WHITE,
    },
});