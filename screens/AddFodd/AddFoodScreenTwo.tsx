import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Dimensions, Image, SafeAreaView, View } from "react-native";
import { useMutation } from "react-query";
import { ButtonComp } from "../../components/Button";
import useI18n from "../../hooks/useI18n";
import { postRecipeImage } from "../../services/ApiService";
import { MAIN_COLOR, WHITE } from "../../utils/utils";



export default function AddFoodScreenTwo({route}:any){

    const id = route.params.id;

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
        navigation.reset({
            index: 0, // Yeni ekranın indeksi
            routes: [{ name: 'HomeNavigation' }], // Ana sayfa stack navigator'ı
        });
    }
    


    return(
        <SafeAreaView style={{flex:1, alignItems:"center", justifyContent:"center", backgroundColor:WHITE }}>
            <TouchableOpacity style={{borderWidth:1}}>
                <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>

            <View style={{ marginTop:0, alignItems:"center", justifyContent:"center", width:width, height:"100%",}}>
              {image ? (
                <Image source={{uri: image}} style={{width:width*0.7, height:width*0.7, borderRadius:15}}/>

              ): (
                <Image source={require("../../assets/images/default_profile.jpg")} style={{width:width*0.7, height:width*0.7, borderRadius:15}}/>

              )}

              <ButtonComp title={t("recipe_image")} onPress={handlePickImage} styleContainer={{marginTop:20,paddingVertical:10, 
            width:150, alignSelf:"center", alignItems:"center", borderRadius:12, backgroundColor:MAIN_COLOR}} styleText={{fontWeight:"600"
            }}/>
            <ButtonComp title="Kaydet!" onPress={handleNavigate} 
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
                    position:"absolute",
                    bottom:0,
                  }}
                  styleText={{ color: MAIN_COLOR, fontWeight: "bold", fontSize: 16 }}
                  isActive={image ? true : false}
                  
            />
            </View>

            

                
            
        </SafeAreaView>
    )
}