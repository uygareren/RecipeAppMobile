import { useMutation } from "react-query"
import { LoginTypes, RegisterTypes } from "../types/AuthTypes"
import { api } from "./api"

const API = process.env.API;


export const AuthServices = {
   
    useRegister: () => {
        return useMutation({
            mutationKey: ["register"],
            mutationFn: async (payload: RegisterTypes) => {

                console.log("paylaod register", `${API}/register`);

                try {
                    const registerResp = await api.post(`${API}/register`, payload);
                    return registerResp;
                } catch (error) {
                    throw error
                }
            }
        })
    },
    
    useUpdatePassword: () => {
        return useMutation({
            mutationKey: ["update-password"],
            mutationFn: async (payload: any) => {
                // console.log(payload)

                try {
                    const response = await api.post(`${API}/update-password`, payload);
                    return response
                } catch (error) {
                    throw error
                }
            }
        })
    }
}

export const login = async (payload: any) => {
    console.log("Login payload", payload);

    try {
        const response = await api.post(`${API}/login`, payload);

        console.log("Login response", response.data);
        return response;
    } catch (error) {
        console.error("Login error", error);
        throw error;
    }
};
