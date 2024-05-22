import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Divider } from "../components/Divider";
import { TopHeader } from "../components/Header";
import { getInterestedData, getLikedRecipes } from "../services/ApiService";
import { BLACK_COLOR, BORDER_RADIUS_1, BORDER_RADIUS_2, CONTAİNER_HORİZONTAL, LIGHT_GRAY, MAIN_COLOR_2, WHITE } from "../utils/utils";

export default function FavoritesScreen() {
    const API = process.env.API;
    const { height, width } = Dimensions.get("screen");
    const navigation = useNavigation<any>();
    const userInfo = useSelector((state: any) => state.user.userInfo);
    console.log("userınfoo", userInfo);

    const { data, isLoading } = useQuery(
        ["liked-recipes"],
        () => getLikedRecipes(userInfo.userId)
    );

    const {data:worldCuisinesData} = useQuery({
        queryKey : ["get-all-world-cuisines"],
        queryFn: getInterestedData
    });

    console.log("world data", worldCuisinesData?.data[0]?.cuisines_name);

    function getWorldCuisinesTag(worldCuisinesId:string) {
        const worldCuisinesName = worldCuisinesData?.data[0]?.cuisines_name.filter((item:any) => item?._id == worldCuisinesId)[0]?.type;
        return worldCuisinesName;

    }

    const RenderItem = ({ navigation, item }: { navigation: any; item: RecipeItem | any }) => {

        const worldCuisinesName = getWorldCuisinesTag(item?.worldCuisinesTagId);
        console.log("worldCuisinesName",worldCuisinesName)
       
        return (
            <Pressable onPress={() => navigation.push("RecipeDetail", {id:item?._id})} style={{ marginBottom: 20, borderRadius: BORDER_RADIUS_1, overflow: 'hidden' }}>
                <View style={{ position: 'relative', height: 150 }}>
                    <Image 
                        source={{ uri: `${API}/recipes/${item?.image}` }} 
                        style={{ height: '100%', width: '100%', resizeMode: "cover" }} 
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <View style={styles.textContainer}>
                        <View style={{maxWidth:width*0.6}}>
                            <Text style={styles.title}>{item?.recipeName}</Text>
                            <Text style={{...styles.subtitle, marginTop:5}}>By Chef {item?.user?.name} {item?.user?.surname}</Text>
                        </View>
                        <View>
                            <View style={{ marginBottom:8, backgroundColor:MAIN_COLOR_2, paddingHorizontal:2, paddingVertical:2,
                                borderRadius:BORDER_RADIUS_2, alignItems:'center', justifyContent:'center'
                            }}>
                                <Text style={{fontSize:9, fontWeight:'700', color:BLACK_COLOR}}>{worldCuisinesName}</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
                                <Feather name="clock" size={20} color="white" />
                                <Text style={{...styles.duration, marginLeft:5}}>{item?.cooking_time} min</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ marginTop: 50 }}>
                <TopHeader title="Beğendiklerim" />
                <Divider height={1} width={"90%"} style={{ backgroundColor: LIGHT_GRAY, alignSelf: "center", marginTop: 5 }} />
            </View>
            <View style={{ marginTop: 20 }}>
                <FlatList
                    data={data?.data}
                    keyExtractor={(item: RecipeType) => item._id.toString()}
                    renderItem={({ item }) => <RenderItem item={item} navigation={navigation} />}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </ScrollView>
    );
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
