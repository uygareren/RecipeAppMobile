import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BLACK_COLOR, BORDER_RADIUS_1, BORDER_RADIUS_3, CONTAİNER_HORİZONTAL, getTimeFromNow, GRAY, GRAY_2, handleNavigation, MAIN_COLOR_2, WHITE } from "../../utils/utils";

interface Props {
    item: RecipeItem;
    navigation: any;
    userId: string;
}

export const HomeRecipeRenderComponent = ({ item, navigation, userId }: Props) => {
    console.log("itemmmm", item);
    const { width, height } = Dimensions.get('screen');
    const API = process.env.API;

    const time = getTimeFromNow(moment(item?.createdAt).toISOString());
    return (
        <Pressable onPress={() => navigation.push("RecipeDetail", { id: item?._id })} 
        style={{ marginBottom: 20, borderRadius: BORDER_RADIUS_1, overflow: 'hidden' }}>
            <View style={{minHeight:150}}>
                <Image 
                    source={{ uri: `${API}/recipes/${item?.image}` }} 
                    style={{ height: 150, width: '100%', resizeMode: "cover" }} 
                />            
                <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.1)']}
                    style={StyleSheet.absoluteFillObject}
                />
                <View style={{
                    position: "absolute",
                    top: 5,
                    left: 5,
                    borderRadius: BORDER_RADIUS_3,
                    overflow: 'hidden',
                    maxWidth: width * 0.6,
                    backgroundColor: MAIN_COLOR_2, // Hafif opak arka plan
                    paddingVertical: 5,
                    paddingHorizontal: 8,
                }}>
                    <Text style={styles.title}>{item?.recipeName}</Text>
                </View>
                <View style={{ position: "absolute", bottom: 5, left: 5, flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity 
                        onPress={() => handleNavigation({ navigation, routeString: "OtherProfile", id_1: userId, id_2: item?.user?.userId })} 
                        style={{
                            width: width * 0.1, 
                            height: width * 0.1, 
                            borderRadius: 360, 
                            alignItems: "center", 
                            justifyContent: "center", 
                            borderWidth: 1, 
                            borderColor: GRAY
                        }}
                    >
                        {item?.user?.image ? (
                            <Image 
                                source={{ uri: `${API}/images/${item?.user?.image}` }} 
                                style={{ width: width * 0.09, height: width * 0.09, borderRadius: 180 }} 
                            />
                        ) : (
                            <Image 
                                source={require("../../assets/images/default_profile.jpg")} 
                                style={{ width: width * 0.09, height: width * 0.09, borderRadius: 180 }} 
                            />
                        )}
                    </TouchableOpacity>
                    <Text style={{ fontWeight: "700", fontSize: 10, marginLeft: 10, color: WHITE }}>
                        {`${item?.user?.name} ${item?.user?.surname}`}
                    </Text>
                </View>
                <View style={{position: "absolute", right:10, bottom:10, backgroundColor:MAIN_COLOR_2, borderRadius:4, paddingHorizontal:6, paddingVertical:1 }}>
                    <Text style={{fontSize:10, fontWeight:"700", color:BLACK_COLOR}}>{time}</Text>
                </View>
            </View>
        </Pressable>
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
        fontSize: 12,
        fontWeight: "700",
        color: GRAY_2,
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
