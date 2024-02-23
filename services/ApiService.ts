import { api } from "./api"

const API = process.env.API;

// INTEREST QUERİES

export const getInterestedData = async() => {
    const response = await api.get(`${API}/get-all-world-cuisines`);
    const data = response.data;

    return data;
}

export const postUserInterest = async(payload:any) => {

    console.log("payload", payload);
    
    const response = await api.post( `${API}/post_user_interests`, payload);
    console.log("response", response);
    return response
}

// CATEGORY QUERİES

export const getCategories = async () => {
    const response = await api.get(`${API}/categories`);
    return response.data;
}

export const getCategoryDetail = async (category_id:any) => {
    const response = await api.get(`${API}/recipe-by-category/${category_id}`);
    return response.data;
}

// USER DETAİL 

export const getUserDetail = async (id:any) => {
    console.log("api", `${API}/get_user_detail/${id}`)
    const response = await api.get(`${API}/get_user_detail/${id}`)
    console.log("responsee", response);
    return response.data
}