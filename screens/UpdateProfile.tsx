import { Dimensions, StyleSheet } from "react-native";
import { View } from "react-native";
import { MAIN_COLOR, WHITE } from "../utils/utils";
import { TextInputComp } from "../components/Inputs";
import { useState } from "react";
import { ButtonComp } from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { updateUser } from "../services/ApiService";
import { userSliceActions } from "../store/reducer/userSlice";


export default function UpdateProfileScreen(){

    const {width, height} = Dimensions.get("screen");

    const dispatch = useDispatch<any>();
    const userInfo = useSelector((state:any) => state.user.userInfo);

    const [loading, setLoading] = useState(false)

    console.log("userınfoo", userInfo);

    const [name, setName] = useState(userInfo?.name ?? "");
    const [surname, setSurname] = useState(userInfo?.surname ?? "");
    const [email, setEmail] = useState(userInfo?.email ?? "");
    const [phone, setPhone] = useState(userInfo?.phone ?? "");
    const [country, setCountry] = useState(userInfo?.country ?? "");
    const [city, setCity] = useState(userInfo?.city ?? "");
    const [biography, setBiography] = useState(userInfo?.biography ?? "");

    const updateUserMutation = useMutation({
        mutationKey:["update_user"],
        mutationFn:updateUser,
        onSuccess:(data: any)=>{
            console.log("data",data);
            dispatch(userSliceActions.setUser(data))
        }
    })

    async function handleSave() {

        setLoading(true);

        const payload = {
            "user_id":userInfo?.userId,
            "name":name,
            "surname": surname,
            "email":email,
            "phone": phone,
            "country":country,
            "city":city,
            "biography":biography
        };

        updateUserMutation.mutate(payload);

        setLoading(false)

        
    }

    const isActive = (!name || ! surname || !email || !phone) ? false: true;


    return(
        <View style={styles.container}>
            <View style={{paddingHorizontal:20, marginTop:50, alignItems:"center"}}>
                <TextInputComp placeholder="Name" value={name} onchangeValue={setName} 
                styleContainer={{width:width*0.8, height:40, marginVertical:15,  borderRadius:12, justifyContent:"center", alignItems:"center"}}
                styleInputContainer={{width:width*0.8, height:40,alignSelf:"center", borderWidth:1, borderColor:"black",marginBottom:5, borderRadius:12}}
                styleInput={{paddingVertical:4, paddingHorizontal:18,fontWeight:"500", fontSize:15}}
                />
                <TextInputComp placeholder="Surname" value={surname} onchangeValue={setSurname} 
                styleContainer={{width:width*0.8, height:40, marginVertical:15, borderRadius:12, justifyContent:"center", alignItems:"center"}}
                styleInputContainer={{width:width*0.8, height:40,alignSelf:"center", borderWidth:1, borderColor:"black",marginBottom:5, borderRadius:12}}
                styleInput={{paddingVertical:4, paddingHorizontal:18, fontWeight:"500", fontSize:15}}
                />
                <TextInputComp placeholder="Email" value={email} onchangeValue={setEmail} 
                styleContainer={{width:width*0.8, height:40, marginVertical:15,  borderRadius:12, justifyContent:"center", alignItems:"center"}}
                styleInputContainer={{width:width*0.8, height:40,alignSelf:"center", borderWidth:1, borderColor:"black",marginBottom:5, borderRadius:12}}
                styleInput={{paddingVertical:4, paddingHorizontal:18,fontWeight:"500", fontSize:15}}
                />
                <TextInputComp placeholder="Phone" value={phone} onchangeValue={setPhone} type="number" 
                styleContainer={{width:width*0.8, height:40, marginVertical:15, borderRadius:12, justifyContent:"center", alignItems:"center"}}
                styleInputContainer={{width:width*0.8, height:40,alignSelf:"center", borderWidth:1, borderColor:"black",marginBottom:5, borderRadius:12}}
                styleInput={{paddingVertical:4, paddingHorizontal:18,fontWeight:"500", fontSize:15}}
                />
                <TextInputComp placeholder="Country" value={country} onchangeValue={setCountry} 
                styleContainer={{width:width*0.8, height:40, marginVertical:15, borderRadius:12, justifyContent:"center", alignItems:"center"}}
                styleInputContainer={{width:width*0.8, height:40,alignSelf:"center", borderWidth:1, borderColor:"black",marginBottom:5, borderRadius:12}}
                styleInput={{paddingVertical:4, paddingHorizontal:18,fontWeight:"500", fontSize:15}}
                />
                <TextInputComp placeholder="City" value={city} onchangeValue={setCity} 
                styleContainer={{width:width*0.8, height:40, marginVertical:15, borderRadius:12, justifyContent:"center", alignItems:"center"}}
                styleInputContainer={{width:width*0.8, height:40,alignSelf:"center", borderWidth:1, borderColor:"black",marginBottom:5, borderRadius:12}}
                styleInput={{paddingVertical:4, paddingHorizontal:18,fontWeight:"500", fontSize:15}}
                />
                <TextInputComp placeholder="Biography" value={biography} onchangeValue={setBiography} isTextArea={true} 
                styleContainer={{width:width*0.8, marginVertical:15,borderRadius:12, justifyContent:"center", alignItems:"center", }}
                styleInputContainer={{width:width*0.8,alignSelf:"center", borderWidth:1, borderColor:"black",marginBottom:5, borderRadius:12}}
                styleInput={{paddingVertical:4, paddingHorizontal:18}}
                />
                
                <ButtonComp title="Kaydet!" isActive={isActive} loading={loading} onPress={() => handleSave()} 
                styleContainer={{
                    marginTop: 25,
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
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:WHITE
    }
})