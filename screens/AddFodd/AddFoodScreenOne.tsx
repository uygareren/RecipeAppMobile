import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import levelData from "../../assets/datas/level.json";
import { ButtonComp } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { TopHeader } from "../../components/Header";
import { TextInputComp } from "../../components/Inputs";
import useI18n from "../../hooks/useI18n";
import { getAllIngredients, getAllMeasurements, getCategories, getInterestedData, postRecipe } from "../../services/ApiService";
import { RootStateType } from "../../store/store";
import { ingredientPostButtonContainer, ingredientPostButtonText } from '../../styles/styles';
import { CONTAİNER_HORİZONTAL, LIGHT_GRAY_2, MAIN_COLOR } from "../../utils/utils";

 

export default function AddFoodScreen(){

  const {t} = useI18n("AddFoodScreen");

  const {width, height} = Dimensions.get("screen");

  const userInfo = useSelector((state:RootStateType) => state.user.userInfo);

  const navigation = useNavigation<any>();

  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("app test denem description");
  const [enterMeasurement, setEnterMeasurement] = useState("5");
  const [enterCalory, setEnterCalory] = useState("33");
  const [enterCookingTime, setEnterCookingTime] = useState("66");

  const [ingredientsData, setIngredientsData] = useState([])
  const [measurementData, setMeasurementData] = useState([])
  const [interestData, setInterestData] = useState([])
  const [categoriesData, setCategoriesData] = useState([])

  const [selectedIngredient, setSelectedIngredient] = useState("")
  const [selectedMeasurement, setSelectedMeasurement] = useState("")
  const [selectedInterest, setSelectedInterest] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")


  const [savedComponents, setSavedComponents] = useState<any>([{}]);

  const isButtonActive = (selectedIngredient != null && selectedMeasurement != null && enterMeasurement.length > 0);

 
  const { mutate: postRecipeMutation, isLoading:buttonLoading } = useMutation(
    "post-recipe",
    postRecipe,
    {
      onSuccess: (data) => {
        if(data?.success){
          navigation.push("AddFoodScreenTwo", {id:data?._id})
        }
      },
    }
  );

  

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
  
    // Clear the inputs
    setEnterMeasurement("");
  }
  

  async function handlePostRecipe(){
    const payload = {
      recipeName: recipeName,
      image: "Base64_encoded_image_data",
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
      userId: userInfo.userId,
      calory: enterCalory,
      level: levelData.filter(item => item.key == selectedLevel)[0].value,
      cooking_time: enterCookingTime
    }

    postRecipeMutation(payload);
    
  }

  function handleRemoveSavedComponents(id:String) {
      setSavedComponents((prev:any) => prev.filter((item:any) => item.componentId !== id));

  }

  const RenderItem = ({ item, index }: { item: any; index: number }) => {
    if (index === 0) {
      return null;
    }

    // console.log("item", item);


    return (
          <Pressable style={{paddingVertical:12, paddingHorizontal:0, alignSelf:"center", minWidth:width*0.35,
          marginRight:10, borderRadius:10, alignItems:"center", justifyContent:"center", backgroundColor:LIGHT_GRAY_2,}}>
                  <Pressable style={{position: 'absolute', top: 8, right:5,}} onPress={() => handleRemoveSavedComponents(item?.componentId)}>
                      <EvilIcons name="close-o" size={24} color="black" />
                    </Pressable>
                    <Text key={index} style={{fontWeight:"500", marginTop:10}}>{item?.componentName}</Text>

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
                <Divider height={1} width={width*0.8} style={{alignSelf:"center", marginTop:5}}/>
            </View>
    
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
            setSelected={(val:any) => setSelectedIngredient(val)}
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
          <View style={{ width:"100%", height:100, paddingHorizontal:10, display: savedComponents.length > 1 ? "flex":"none"}}>
          <FlatList
            data={savedComponents}
            keyExtractor={(index:number) => index.toString()}
            renderItem={RenderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        
      
          

        <ButtonComp
          isActive={isButtonActive}
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
          ...ingredientPostButtonContainer
        }}
        styleText={{ ...ingredientPostButtonText }}
        loading={buttonLoading}
      />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        paddingHorizontal:CONTAİNER_HORİZONTAL
    }
})