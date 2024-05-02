import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Dimensions, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useMutation } from "react-query";
import { ButtonComp } from "../../components/Button";
import useI18n from "../../hooks/useI18n";
import { deleteRecipe, postRecipeImage } from "../../services/ApiService";
import { ingredientPostButtonContainer, ingredientPostButtonText, ingredientSaveButtonContainer, ingredientSaveButtonText } from "../../styles/styles";
import { LIGHT_GRAY, WHITE } from "../../utils/utils";



export default function AddFoodScreenTwo({route}:any){

    const id = route.params?.id;

    console.log("id", id);

    const navigation = useNavigation<any>();

    const {width, height} = Dimensions.get("screen");

    console.log("idd", id);
    const {t} = useI18n("AddFoodScreen");

    const [image, setImage] = useState("");

    const mutateAsync = useMutation(
        ["post-recipe-image"],
        async (params: { recipe_id: string, formData: FormData }) => {
          try {
            const result = await postRecipeImage(params.recipe_id, params.formData);
            console.log("resultt", result);
            return result;
          } catch (error) {
            throw new Error(`Failed to update profile image: ${error}`);
          }
        },
        {
          onSuccess: (data) => {
            console.log("data", data);
            
          }
        }
      );

    const removeRecipeMutation = useMutation(
      ["delete-recipe"],
      (id:string) => deleteRecipe(id),
      {onSuccess(data) {
        console.log("dataa", data);

          if(data?.success){
            navigation.navigate("Home");
          }
      },}
    )


    
    async function handlePickImage() {
        let resultImage: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          base64:true,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
      });
    
      if (!resultImage.canceled) {
          let localUri = resultImage.assets[0].uri;
          let filename = localUri.split('/').pop();
    
    
          let match = /\.(\w+)$/.exec(filename as string);
          let type = match ? `image/${match[1]}` : `image`;
    
          const formData = new FormData();
          
          formData.append('recipe', {
              uri: localUri,
              name: filename,
              type: type
          } as any);
                          
    
          setImage(resultImage.assets[0].uri);
          mutateAsync.mutate({recipe_id:id, formData: formData});

    
      }
    
      }  

    function handleNavigate() {
      navigation.navigate("HomeNavigation");      
    }

    function handleCancel(){
      Alert.alert("Tarif Kaydını İptal Et", "Tarifi İptal Etmek İstediğinizden Emin Misiniz?", 
      [
          { style: "default", text: "Sil", onPress: () => handleRemoveRecipe() },
          { style: "default", text: "İptal", onPress: () => console.log("iptal") }
      ])
    }

    
    
    function handleRemoveRecipe(){
      removeRecipeMutation.mutate(id);
      navigation.push("Home");

    }
    


    return(
        <SafeAreaView style={{flex:1, alignItems:"center", justifyContent:"center", backgroundColor:WHITE }}>
            

            <View style={{ marginTop:0, alignItems:"center", justifyContent:"center", width:width, height:"100%",}}>

              <View style={{ width:width, position:'absolute', top:50, flexDirection:'row', justifyContent:'flex-end',
                paddingHorizontal:20
              }}>
                

                <TouchableOpacity onPress={handleCancel} style={{ backgroundColor:LIGHT_GRAY, paddingHorizontal:12, paddingVertical:4, borderRadius:12}}>
                  <Text style={{fontSize:13, fontWeight:'500'}}>İptal Et</Text>
                </TouchableOpacity>


              </View>
              


              {image ? (
                <Image source={{uri: image}} style={{width:width*0.7, height:width*0.7, borderRadius:15}}/>

              ): (
                <Image source={require("../../assets/images/default_profile.jpg")} style={{width:width*0.7, height:width*0.7, borderRadius:15}}/>

              )}

              <ButtonComp title={t("recipe_image")} onPress={handlePickImage} styleContainer={{...ingredientSaveButtonContainer}} 
              styleText={{...ingredientSaveButtonText}}/>
            <ButtonComp title="Kaydet!" onPress={handleNavigate} 
                styleContainer={{...ingredientPostButtonContainer, position:"absolute", bottom:50 }}
                  styleText={{...ingredientPostButtonText}}
                  isActive={image ? true : false}
                  
            />
            </View>

            

                
            
        </SafeAreaView>
    )
}