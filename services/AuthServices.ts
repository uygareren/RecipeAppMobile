import { useMutation } from "react-query";
import { LoginTypes, RegisterTypes } from "../types/AuthTypes";
import { api } from "./api";

const API = process.env.API;
console.log("apiii: ", API);


export const AuthServices = {
    
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

export const register = async(payload: RegisterTypes) => {
    const response = await api.post(`${API}/register`, payload);
    return response.data;
}

export const login = async (payload: LoginTypes) => {
    try {
        const response = await api.post(`${API}/login`, payload);
        return response;
    } catch (error) {
        throw error;
    }
};
