import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "native-base";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";
import { TopHeader } from "../components/Header";
import { Loading } from "../components/Loading";
import useI18n from "../hooks/useI18n";
import { getCategoryDetail, getInterestedData } from "../services/ApiService";
import { BLACK_COLOR, BORDER_RADIUS_1, BORDER_RADIUS_2, CONTAİNER_HORİZONTAL, GRAY_2, LIGHT_GRAY_2, MAIN_COLOR_2, WHITE } from "../utils/utils";

export default function CategoryDetail({ route }: any) {
    const API = process.env.API;

    const { id, name } = route.params;

    const navigation = useNavigation<any>();
    
    const {t} = useI18n("CategoryDetail")

    const {width, height} = Dimensions.get("screen");
    
    const {data, isLoading} = useQuery(
        ["recipe-by-category", id],
        () => getCategoryDetail(id)
    );

    const {data:worldCuisinesData} = useQuery({
        queryKey : ["get-all-world-cuisines"],
        queryFn: getInterestedData
    });
    
    const category_detail_data = data?.data?.data

    const NoAvaliableData = () => {
        return(
            <View style={{height:"100%",alignItems:"center", justifyContent:"center", backgroundColor:WHITE}}>
                <View style={{ alignItems:'center', justifyContent:'center'}}>
                    <Image source={require('../assets/images/cooking.jpg')} 
                    style={{width:width*0.35, height:width*0.35, borderRadius:BORDER_RADIUS_1, resizeMode:'cover', 
                    
                    }}/>
                    <View style={{ marginTop:24, alignItems:'center'}}>
                        <Text style={{fontSize:20, fontWeight:'600', color:BLACK_COLOR, textAlign:'center'}}>
                            Bu Kategoriye Ait Hiç Tarif Yok...
                        </Text>
                        <Text style={{marginTop:5, fontSize:16, fontWeight:'500', color:GRAY_2, textAlign:'center'}}>
                            Diğer kategorileri keşfetmeye devam edebilirsin
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function getWorldCuisinesTag(worldCuisinesId:string) {
        const worldCuisinesName = worldCuisinesData?.data[0]?.cuisines_name.filter((item:any) => item?._id == worldCuisinesId)[0]?.type;
        return worldCuisinesName;

    }

    const RenderItem = ({ navigation, item }: { navigation: any; item: RecipeItem | any }) => {

        const worldCuisinesName = getWorldCuisinesTag(item?.worldCuisinesTagId);
        console.log("worldCuisinesName",worldCuisinesName)
       
        return (
            <Pressable onPress={() => navigation.push("RecipeDetail", {id:item?._id})} 
            style={{ marginBottom: 20, borderRadius: BORDER_RADIUS_1, overflow: 'hidden' }}>
                <View style={{ position: 'relative', height: 150, width:width }}>
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
                        <View >
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
    

    if(isLoading){
        return(
          <Loading/>
        )
      }

      return (
        <View style={styles.container}>
          <View style={{ flex: 1, backgroundColor: WHITE }}>
            <View style={{ marginTop: 50 }}>
              <TopHeader title={name} />
              <View style={{ backgroundColor: LIGHT_GRAY_2, height: 1, width: width * 8 / 10, alignSelf: "center", marginTop: 5 }} />
            </View>
      
            <View style={{ alignItems: "center", justifyContent: "center", height: Dimensions.get("screen").height - 120 }}>
              {category_detail_data?.length === 0 ? (
                <NoAvaliableData />
              ) : (
                <View style={{marginTop:30}}>
                    <FlatList
                    data={category_detail_data}
                    keyExtractor={(item:any) => item._id.toString()}
                    renderItem={({ item }) => <RenderItem item={item} navigation={navigation} />}
                    showsVerticalScrollIndicator={false}
                    />
                </View>

                )}
            </View>
          </View>
        </View>
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
        right: 40,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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