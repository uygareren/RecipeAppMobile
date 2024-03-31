import { useMutation } from "react-query";
import { RegisterTypes } from "../types/AuthTypes";
import { api } from "./api";

const API = process.env.API;
console.log("apiiii: ", API);


export const AuthServices = {
   
    useRegister: () => {
        return useMutation({
            mutationKey: ["register"],
            mutationFn: async (payload: RegisterTypes) => {


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
    try {
        const response = await api.post(`${API}/login`, payload);
        console.log("respnıse", response);

        return response;
    } catch (error) {
        throw error;
    }
};
