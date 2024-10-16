import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useToast } from 'native-base';
import { useRef, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import PhoneInput from 'react-native-phone-number-input';
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { ButtonComp } from "../components/Button";
import { PhoneInputComp, TextInputComp } from "../components/Inputs";
import { ToastSuccess } from '../components/Toast';
import useI18n from "../hooks/useI18n";
import { updateProfileImage, updateUser } from "../services/ApiService";
import { userSliceActions } from "../store/reducer/userSlice";
import { authButtonContainer, authTextButton, ingredientSaveButtonContainer, ingredientSaveButtonText } from '../styles/styles';
import { BLACK_COLOR, BORDER_RADIUS_1, BORDER_RADIUS_2, CONTAİNER_HORİZONTAL, LIGHT_GRAY, MAIN_COLOR_2, MAIN_COLOR_GREEN, WHITE } from "../utils/utils";



export default function UpdateProfileScreen(){

    const API = process.env.API;
    const navigation = useNavigation();

    const {t} = useI18n("UpdateProfileScreen");

    const toast = useToast();

    const {width, height} = Dimensions.get("screen");

    const dispatch = useDispatch<any>();
    const user = useSelector((state:any) => state.user);

    // console.log("userinfo", userInfo);

    const [loading, setLoading] = useState(false);

    const phoneInput = useRef<PhoneInput>(null);
    const [formattedValue, setFormattedValue] = useState("");

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
            <TouchableOpacity onPress={() => navigation.goBack()} 
                         style={{alignSelf:'flex-start',marginTop:50,
                            borderRadius: BORDER_RADIUS_2, width: 32, height: 32, alignItems: "center", justifyContent: "center",
                            backgroundColor: MAIN_COLOR_GREEN
                        }}>
                            <FontAwesome5 name="chevron-left" size={22} color={WHITE} />
                        </TouchableOpacity>

            <View style={{ marginTop:20, alignItems:"center", width:150, height:150, alignSelf:"center",}}>
                

                {image != null ? (
                    <Image source={{uri: `${API}/images/${image}`}} style={{width:150, height:150, borderRadius:15, resizeMode:'cover'}}/>
                ) : (
                    <Image source={require("../assets/images/default_profile.jpg")} style={{width:150, height:150, borderRadius:15}}/>

                )}
                <ButtonComp title="Update Photo" onPress={updatePhoto} 
                styleContainer={{...ingredientSaveButtonContainer, borderRadius:BORDER_RADIUS_1, backgroundColor:MAIN_COLOR_2, width:150, alignItems:'center', justifyContent:'center'}} 
                styleText={{...ingredientSaveButtonText, fontWeight:'600', fontSize:15, color:BLACK_COLOR}}/>
            </View>

            <View style={{paddingHorizontal:CONTAİNER_HORİZONTAL, marginTop:70, alignItems:"center",}}>
                
                <TextInputComp value={name} onchangeValue={setName} label={t("name")} placeholder={t("name")} 
                    styleContainer={styles.TextInputComp} 
                    styleInputContainer={{...styles.InputContainer, borderWidth:2, borderRadius:10, borderColor:LIGHT_GRAY}}
                     styleInput={styles.TextInput}/>
                <TextInputComp value={surname} onchangeValue={setSurname} label={t("surname")} placeholder={t("surname")}
                    styleContainer={styles.TextInputComp} styleInputContainer={{...styles.InputContainer, borderWidth:2, borderRadius:10, borderColor:LIGHT_GRAY}}
                    styleInput={styles.TextInput}/>
                <TextInputComp value={email} onchangeValue={setEmail} label={t("email")} placeholder={t("email")}
                    styleContainer={styles.TextInputComp} styleInputContainer={{...styles.InputContainer, borderWidth:2, borderRadius:10, borderColor:LIGHT_GRAY}}
                    styleInput={styles.TextInput}/>
                {/* <TextInputComp value={phone} onchangeValue={setPhone} label={t("phone")} placeholder={t("phone")} 
                    styleContainer={styles.TextInputComp} styleInputContainer={{...styles.InputContainer, borderWidth:2, borderRadius:10, borderColor:LIGHT_GRAY}}
                    styleInput={styles.TextInput}/> */}
                <PhoneInputComp styleContainer={styles.TextInputComp} label={t("phone")} 
                phoneInput={phoneInput} placeHolder={t("phone")} phone={phone} setPhone={setPhone} 
                setFormattedValue={setFormattedValue} width={width}/>
                <TextInputComp value={country} onchangeValue={setCountry} label={t("country")} placeholder={t("country")} 
                    styleContainer={styles.TextInputComp} styleInputContainer={{...styles.InputContainer, borderWidth:2, borderRadius:10, borderColor:LIGHT_GRAY}}
                    styleInput={styles.TextInput}/>
                <TextInputComp value={city} onchangeValue={setCity} label={t("city")} placeholder={t("city")} 
                    styleContainer={styles.TextInputComp} styleInputContainer={{...styles.InputContainer, borderWidth:2, borderRadius:10, borderColor:LIGHT_GRAY}}
                    styleInput={styles.TextInput}/>
                <TextInputComp isTextArea={true} value={biography} onchangeValue={setBiography} label={t("biography")} placeholder={t("biography")} 
                    styleContainer={styles.TextInputComp} styleInputContainer={{...styles.InputContainer, borderWidth:2, borderRadius:10, borderColor:LIGHT_GRAY}}
                    styleInput={styles.TextInput}/>
                
                <ButtonComp title={t("save")} isActive={isActive} loading={loading} onPress={() => handleSave()} 
                styleContainer={{...authButtonContainer, borderRadius:10, width:"100%", paddingVertical:18, backgroundColor:MAIN_COLOR_GREEN, 
                    marginBottom:25
                }}
                styleText={{...authTextButton, fontWeight:"700", fontSize:18}}
                />
                
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:WHITE,
        paddingHorizontal:CONTAİNER_HORİZONTAL
        
    },
    TextInputComp:{
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
    TextInputPassword:{
        marginVertical:10,
        marginTop: 20,
    },
    TextInput:{
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: "83%",
        borderRadius: 18
    },
})