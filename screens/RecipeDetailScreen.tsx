import { Image, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { WHITE } from "../utils/utils";
import { RecipeDetailHeader, SettingsHeader } from "../components/Header";


export default function RecipeDetailScreen({}){

    const [isLıke, setIsLıke] = useState(false)


    return(
        <View style={styles.container}>

            <View style={{marginTop: 40}}>
                <RecipeDetailHeader isLıke={isLıke}/>
            </View>

            {/* BODY SECTION */}
            <View>
                {/* IMAGE AND RECİPE NAME SECTİON */}
                <View style={{alignItems:"center",justifyContent:"center",marginVertical:20}}>
                    <Image source={require("../assets/images/default_recipe.jpeg")} style={{borderRadius:20, width:"60%"}}/>
                    <Text style={{marginVertical:10, fontSize:17, fontWeight:"500"}}>Recipe Name</Text>
                </View>

                {/* INGREDİENTS SECTION */}
                <View>
                    <Text style={{marginLeft:15, fontSize:21, fontWeight:"600"}}>Ingredients</Text>
                    <View style={{marginTop:20, alignItems:"center"}}>
                        <Text>400 grams of spaghetti pasta</Text>
                        <Text>2 tablespoons of olive oil</Text>
                        <Text>3 cloves of garlic, chopped</Text>
                        <Text>400 grams of fresh tomatoes, grated</Text>
                        <Text>Half a tea glass of water</Text>
                        <Text>Salt and pepper (optional)</Text>
                    </View>
                </View>

                <View>
                    <Text style={{marginLeft:15, fontSize:21, fontWeight:"600", marginTop:35}}>Preparation</Text>
                    <View style={{marginTop:20, alignItems:"center", width:"70%", alignSelf:"center"}}>
                        <Text>Boil water in a pot and add a pinch of salt. Boil the spaghetti pasta in this water for the time 
                        specified on the package. Then drain and set aside.

                        Heat the olive oil in a large pan. Add the garlic and fry lightly.</Text>
                        
                    </View>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:WHITE
    }
})