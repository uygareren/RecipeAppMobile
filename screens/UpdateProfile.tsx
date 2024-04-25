import * as ImagePicker from 'expo-image-picker';
import { useToast } from 'native-base';
import { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { ButtonComp } from "../components/Button";
import { TextInputComp } from "../components/Inputs";
import { ToastSuccess } from '../components/Toast';
import useI18n from "../hooks/useI18n";
import { updateProfileImage, updateUser } from "../services/ApiService";
import { userSliceActions } from "../store/reducer/userSlice";
import { LIGHT_GRAY_2, MAIN_COLOR, WHITE } from "../utils/utils";



export default function UpdateProfileScreen(){

    const API = process.env.API;

    const {t} = useI18n("UpdateProfileScreen");

    const toast = useToast();

    const {width, height} = Dimensions.get("screen");

    const dispatch = useDispatch<any>();
    const user = useSelector((state:any) => state.user);

    console.log("user", user);

    // console.log("userinfo", userInfo);

    const [loading, setLoading] = useState(false)
    

    const [name, setName] = useState(user?.userInfo?.name ?? "");
    const [surname, setSurname] = useState(user?.userInfo?.surname ?? "");
    const [email, setEmail] = useState(user?.userInfo?.email ?? "");
    const [phone, setPhone] = useState(user?.userInfo?.phone ?? "");
    const [country, setCountry] = useState(user?.userInfo?.country ?? "");
    const [city, setCity] = useState(user?.userInfo?.city ?? "");
    const [biography, setBiography] = useState(user?.userInfo?.biography ?? "");

    const [image, setImage] = useState(user?.userInfo?.image);
    const [loadingImage, setLoadingImage] = useState(false);

    const updateUserMutation = useMutation({
        mutationKey:["update_user"],
        mutationFn:updateUser,
        onSuccess:(data: any)=>{
            toast.show(ToastSuccess("Profil Başarıyla Güncellendi!"));
        }
    });

    // const {updateUserProfileMutation} = useMutation(() => updateProfileImage, {
    //     onSuccess: (data: any) => {
    //       console.log("Image uploaded successfully", data);
    //       dispatch(userSliceActions.setUserImage(image)); // Assuming `image` is the new image URI
    //       setLoadingImage(false);
    //     },
    //   });

    const mutateAsync = useMutation(
        ["update_profile_image"],
        async (params: { userId: string, formData: FormData }) => {
          try {
            const result = await updateProfileImage(params.userId, params.formData);
            return result;
          } catch (error) {
            throw new Error(`Failed to update profile image: ${error}`);
          }
        },
        {
          onSuccess: (data) => {
            console.log("data", data);
            if(data?.success){
                dispatch(userSliceActions.setUserImage(data?.data));
            }
          }
        }
      );
      
      
    console.log("id", user?.userInfo?.userId);
      

    async function updatePhoto() {
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
            
            formData.append('image', {
                uri: localUri,
                name: filename,
                type: type
            } as any);
                            
            mutateAsync.mutate({ userId: user?.userInfo?.userId, formData: formData });

            setImage(resultImage.assets[0].uri);
            setLoadingImage(false);

        }
    }

    async function handleSave() {

        setLoading(true);

        const payload = {
            user_id:user?.userInfo?.userId,
            name:name,
            surname: surname,
            email:email,
            phone: phone,
            country:country,
            city:city,
            biography:biography
        };

        console.log("payload", payload);

        dispatch(userSliceActions.updateUser(payload));
        

        updateUserMutation.mutate(payload);

        setLoading(false)

        
    }

    const isActive = (!name || ! surname || !email || !phone) ? false: true;


    return(
        <ScrollView style={styles.container}>

            <View style={{ marginTop:50, alignItems:"center", width:150, height:150, alignSelf:"center",}}>
                {image != null ? (
                    <Image source={{uri: `${API}/images/${image}`}} style={{width:150, height:150, borderRadius:15, resizeMode:'cover'}}/>
                ) : (
                    <Image source={require("../assets/images/default_profile.jpg")} style={{width:150, height:150, borderRadius:15}}/>

                )}
                <ButtonComp title="Update Photo" onPress={updatePhoto} styleContainer={{marginTop:20,paddingVertical:10, 
            width:150, alignSelf:"center", alignItems:"center", borderRadius:12, backgroundColor:MAIN_COLOR}} styleText={{fontWeight:"600"
            }}/>
            </View>

            <View style={{paddingHorizontal:20, marginTop:70, alignItems:"center"}}>
                
                <TextInputComp value={name} onchangeValue={setName} label={t("name")} placeholder={t("name")} 
                    styleContainer={styles.TextInputComp} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                <TextInputComp value={surname} onchangeValue={setSurname} label={t("surname")} placeholder={t("surname")}
                    styleContainer={styles.TextInputComp} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                <TextInputComp value={email} onchangeValue={setEmail} label={t("email")} placeholder={t("email")}
                    styleContainer={styles.TextInputComp} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                <TextInputComp value={phone} onchangeValue={setPhone} label={t("phone")} placeholder={t("phone")} 
                    styleContainer={styles.TextInputComp} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                <TextInputComp value={country} onchangeValue={setCountry} label={t("country")} placeholder={t("country")} 
                    styleContainer={styles.TextInputComp} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                <TextInputComp value={city} onchangeValue={setCity} label={t("city")} placeholder={t("city")} 
                    styleContainer={styles.TextInputComp} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                <TextInputComp isTextArea={true} value={biography} onchangeValue={setBiography} label={t("biography")} placeholder={t("biography")} 
                    styleContainer={styles.TextInputComp} styleInputContainer={styles.InputContainer} styleInput={styles.TextInput}/>
                
                <ButtonComp title={t("save")} isActive={isActive} loading={loading} onPress={() => handleSave()} 
                styleContainer={{
                    marginVertical:25,
                    paddingHorizontal:25,
                    alignSelf: "center",
                    alignItems: "center",
                    paddingVertical: 12,
                    borderRadius: 10,
                    backgroundColor: "black",
                  }}
                styleText={{ color: MAIN_COLOR, fontWeight: "bold", fontSize: 16 }}
                />
                
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:WHITE,
        
    },
    TextInputComp:{
        paddingHorizontal:10,
        marginVertical:10,
        marginTop: 20,
    },
    InputContainer:{
        flexDirection: "row",
        backgroundColor: WHITE,
        width: Dimensions.get('screen').width*0.89,
        alignSelf: "center",
        borderRadius: 19

    },
    TextInput:{
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: "100%",
        backgroundColor: LIGHT_GRAY_2,
        borderRadius: 18
    },
})