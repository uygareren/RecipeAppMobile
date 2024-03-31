import { useState } from "react";
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useQuery } from "react-query";
import levelData from "../../assets/datas/level.json";
import { ButtonComp } from "../../components/Button";
import { TopHeader } from "../../components/Header";
import { TextInputComp } from "../../components/Inputs";
import useI18n from "../../hooks/useI18n";
import { getAllIngredients, getAllMeasurements, getCategories, getInterestedData } from "../../services/ApiService";
import { LIGHT_GRAY, LIGHT_GRAY_2, MAIN_COLOR } from "../../utils/utils";
 

export default function AddFoodScreen(){

  const {t} = useI18n("AddFoodScreen");

  const {width, height} = Dimensions.get("screen");

  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [enterMeasurement, setEnterMeasurement] = useState("");
  const [enterCalory, setEnterCalory] = useState("");
  const [enterCookingTime, setEnterCookingTime] = useState("");

  const [ingredientsData, setIngredientsData] = useState([])
  const [measurementData, setMeasurementData] = useState([])
  const [interestData, setInterestData] = useState([])
  const [categoriesData, setCategoriesData] = useState([])

  const [selectedIngredient, setSelectedIngredients] = useState("")
  const [selectedMeasurement, setSelectedMeasurement] = useState("")
  const [selectedInterest, setSelectedInterest] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")

  const [savedComponents, setSavedComponents] = useState<any>([{}])

  const {data, isLoading} = useQuery({
    queryKey: ["get_all_ingredients"],
    queryFn: getAllIngredients,
    onSuccess: (data) => {
      const newData = data?.data[0]?.Ingredients_id?.flatMap((item:any) =>
        item?.IngredientsData?.map((e:any) => ({
          key: e?._id,
          value: e?.type
        })) || []
      );
      setIngredientsData(newData);
    },
  });
  

  const { data: measurements_data } = useQuery({
    queryKey: ["get_measurements"],
    queryFn: getAllMeasurements,
    onSuccess: (data) => {
      console.log(data);
      const newData = data?.measurements_data[0]?.measurement_names?.map((item:any) => ({
        key: item?._id,
        value: item?.name
      }));
      setMeasurementData(newData || []);
    }
  });

  const {} = useQuery({
    queryKey:["get-all-world-cuisines"],
    queryFn: getInterestedData,
    onSuccess(data) {
      console.log("interested data", data);
      const newData = data?.data[0]?.cuisines_name?.map((item:any) => ({
        key:item?._id,
        value:item?.type
      }))

      setInterestData(newData || []);
    },

  });


  const {} = useQuery({
    queryKey:["categories"],
    queryFn: getCategories,
    onSuccess(data) {
      const newData = data?.data?.map((item:any) => ({
        key:item?._id,
        value:item?.categoryName
      }));

      setCategoriesData(newData || []);
    },
  });
 
  const handleSaveComponents = () => {
   
    const componentName = selectedIngredient ? ingredientsData?.filter((item:any) => item?.key == selectedIngredient)[0]["value"] : null;
    const measurementName = selectedMeasurement ? measurementData?.filter((item:any) => item?.key == selectedMeasurement)[0]["value"] : null; 
    
    setSavedComponents((prev:any) => [
      ...prev,
      {
        componentId: selectedIngredient,
        componentName: componentName,
        quantity: enterMeasurement,
        measurementId: selectedMeasurement,
        measurementName: measurementName,
      }
    ]);
    
  }

  const updateRecipeImage = () => {

  }

  async function handlePostRecipe(){
    const payload = {
      recipeName: recipeName,
      image: null,
      ingredients: savedComponents.length > 1 ? savedComponents.slice(1).map((item:any) => item?.componentId) : [],
      ingredients_with_measurements: 
      savedComponents.length > 1 ? 
        savedComponents.slice(1).map((item:any) => ({
          ingredients_id:item.componentId,
          measurement_id:item.measurementId,
          measurement:item.quantity
        })): []
      ,
      worldCuisinesTagId: selectedInterest,
      recipeDescription: recipeDescription,
      categoryId: selectedCategory,
      userId: "65d8a6e30bfdd040ec236e92",
      calory: enterCalory,
      level: levelData.filter(item => item.key == selectedLevel)[0].value,
      cooking_time: enterCookingTime
    }
    

    console.log("payloadd", payload)

  }


  const RenderItem = ({ item, index }: { item: any; index: number }) => {
    if (index === 0) {
      return null;
    }
  
    return (
          <Pressable style={{paddingVertical:12, paddingHorizontal:8, alignSelf:"center", minWidth:width*0.3,
          marginRight:10, borderRadius:10, alignItems:"center", justifyContent:"center", backgroundColor:LIGHT_GRAY_2,}}>
                <Text key={index} style={{fontWeight:"500"}}>{item?.componentName}</Text>
                <View style={{flexDirection:"row", alignItems:"center"}}> 

                  {item?.quantity ? (
                  <Text key={index}  style={{fontWeight:"300", fontSize:14, marginTop:4, marginRight:5}}>{item?.quantity}</Text>
                  ): 
                  <Text  style={{fontWeight:"300", fontSize:14, marginTop:4}}>{}</Text>
                  }
                  
                  <Text style={{fontWeight:"300", fontSize:14, marginTop:4}}>{item?.measurementName}</Text>
                </View>

          </Pressable>
    );
  }
  
    
    return(
        <ScrollView style={styles.container}>

            <View style={{marginTop:50}}>
                <TopHeader title={t("add_recipe")}/>
                <View style={{backgroundColor:LIGHT_GRAY, height:1, width:width*8/10, alignSelf:"center", marginTop:5}}/>
            </View>

            <View style={{ marginTop:20, alignItems:"center", width:150, height:150, alignSelf:"center",}}>
                <Image source={require("../../assets/images/default_profile.jpg")} 
                style={{width:150, height:150, borderRadius:15}}/>
            </View>

                
            <ButtonComp title={t("recipe_image")} onPress={updateRecipeImage} styleContainer={{marginTop:20,paddingVertical:10, 
            width:150, alignSelf:"center", alignItems:"center", borderRadius:12, backgroundColor:MAIN_COLOR}} styleText={{fontWeight:"600"
            }}/>

            
      <View style={{ alignItems: "center", paddingHorizontal:20}}>
        
        <TextInputComp styleInputContainer={{
            borderWidth: 1,
            borderColor: "black",
            marginTop: 10,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 5,
            width: width * 8 / 10,
          }}
          styleContainer={{ alignItems: "center", marginTop: 25, width:"100%" }}

           label={t("recipe_name")} placeholder={t("recipe_name_placeholder")}  value={recipeName} onchangeValue={setRecipeName}/>

          <SelectList
            data={ingredientsData}
            setSelected={(val:any) => setSelectedIngredients(val)}
            boxStyles={{width:width*0.8, marginTop:20}}
            dropdownStyles={{width:width*0.8}}
            searchPlaceholder={t("search")}  
            placeholder={t("select_ingredient")}
          />
          
          
          <View style={{flexDirection:"row", alignItems:"flex-start", justifyContent:"space-between", 
        marginTop:20, width:"90%",}}>

          <TextInputComp styleInputContainer={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 5,
            width: width * 0.35,
          }}
          styleContainer={{ alignItems: "flex-start",  width:width*0.35, justifyContent:"center", position:"relative", top:-8}}

          placeholder={t("enter_quantity")} value={enterMeasurement} onchangeValue={setEnterMeasurement}/>

            <SelectList
              data={measurementData}
              setSelected={(val:any) => setSelectedMeasurement(val)}
              boxStyles={{paddingVertical:14, width:width*0.35}}
              searchPlaceholder={t("search")}  
              placeholder={t("select_quantity")} 
            />
            
          </View>
          {/* FLATLİST INGREDİENTS WİTH MEASUREMENTS */}
          <View style={{height:100, width:width, paddingHorizontal:20, display: savedComponents.length > 1 ? "flex":"none"}}>
          <FlatList
            data={savedComponents}
            keyExtractor={(index:number) => index.toString()}
            renderItem={RenderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        
      
          

        <ButtonComp
          title={t("btn_save_ingredients")}
          onPress={() => handleSaveComponents()}
          styleContainer={{
            alignSelf:"center",
            marginTop: 20,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 15,
            backgroundColor: MAIN_COLOR,
          }}
          styleText={{ fontWeight: "bold", color: "#292828" }}
        />

        <SelectList
          data={interestData}
          setSelected={(val:any) => setSelectedInterest(val)}
          boxStyles={{marginTop:20, width:width*0.8}}
          searchPlaceholder={t("search")}
          placeholder={t("select_world_cuisines")}
        />

        <SelectList
          data={categoriesData}
          setSelected={(val:any) => setSelectedCategory(val)}
          boxStyles={{marginTop:20, width:width*0.8}}
          searchPlaceholder={t("search")}
          placeholder={t("select_category")}
        />

          <SelectList
            data={levelData}
            setSelected={(val:any) => setSelectedLevel(val)}
            dropdownStyles={{}}
            placeholder={t("select_level")}
            searchPlaceholder={t("search")}
            boxStyles={{marginTop:20, width:width*0.8}}
          />

        <View style={{flexDirection:"row", marginTop:20, width:"100%", alignItems:"center",justifyContent:"space-between", paddingHorizontal:20,  }}>

          <TextInputComp styleInputContainer={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 5,
              width: width * 0.35,
            }}
            styleContainer={{ alignItems: "center", width:width*0.35, justifyContent:"center",}}

            placeholder={t("enter_calory")} value={enterCalory} onchangeValue={setEnterCalory}/>

          <TextInputComp styleInputContainer={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 5,
              width: width * 0.35,
            }}
            styleContainer={{ alignItems: "center", width:width*0.35, justifyContent:"center",}}

            placeholder={t("enter_cooking_time")} value={enterCookingTime} onchangeValue={setEnterCookingTime}/>

          

        </View>

        <TextInputComp isTextArea={true} label={t("label_recipe_desc")} placeholder={t("recipe_desc_placeholder")} value={recipeDescription} 
        onchangeValue={setRecipeDescription}
        styleInputContainer={{
          borderWidth:1, borderColor:"black",
          marginTop: 10,
          borderRadius: 15,
          paddingVertical: 10,
          paddingHorizontal: 5,
          width:"100%",
        }}
        styleContainer={{ alignItems: "center", marginTop: 25,}}

        />

        
      </View>


      <ButtonComp
        title={t("btn_save_recipe")}
        onPress={() => handlePostRecipe()}
        styleContainer={{
          borderWidth: 1,
          borderColor: "black",
          marginVertical: 25,
          paddingHorizontal:25,
          alignSelf: "center",
          alignItems: "center",
          paddingVertical: 12,
          borderRadius: 10,
          backgroundColor: "black",
        }}
        styleText={{ color: MAIN_COLOR, fontWeight: "bold", fontSize: 16 }}
      />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    }
})