import { api } from "./api"

const API = process.env.API;

// INTEREST QUERİES

export const getInterestedData = async() => {
    const response = await api.get(`${API}/get-all-world-cuisines`);
    const data = response.data;

    return data;
}

export const postUserInterest = async(payload:any) => {

    
    const response = await api.post( `${API}/post_user_interests`, payload);
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
    const response = await api.get(`${API}/get_user_detail/${id}`)
    return response.data
}

export const getFollowing = async (userId: any) => {
    const response = await api.post(`${API}/get_following`, { user_id: userId });
    return response.data;
}


export const addFollowed = async (payload:any) => {
    try {
        const response = await api.post(`${API}/add_followed`, payload);
        return response.data;
    } catch (error) {
        console.error("addFollowed error", error);
        throw error; // rethrow the error for better error handling
    }
};


export const getRecipeByUserId = async(payload:any) => {
    console.log("payload", payload)
    const response = await api.post(`${API}/get_recipe_by_userid`, payload);
    console.log("response", response);
    return response.data;
}

export const updateUser = async(payload:any) => {
    const response = await api.post(`${API}/update_user`, payload);
    return response.data;
}


// INGREDİENTS

export const getAllIngredients = async()=> {
    const response = await api.get(`${API}/get_all_ingredients`);
    return response.data;
}

export const getRecipeByIngredients = async(payload:any) => {

    const response = await api.post(`${API}/recipe-by-ingredients`, payload);

    return response.data;
}


// RECİPE QUERİES

export const getRecipeById = async(id:any) => {
    const response = await api.get(`${API}/recipe-detail/${id}`);
    return response.data;
}

// MEASUREMENT QUERİES

export const getAllMeasurements = async() => {
    const response = await api.get(`${API}/get_measurements`);
    return response.data;
}

// LIKE QUERİES

export const postLike = async(payload:any) => {
    console.log("payload post like", payload);
    const response = await api.post(`${API}/post_like`, payload);
    return response.data
}
export const removeLike = async(payload:any) => {
    console.log("payload remove like", payload);

    const response = await api.post(`${API}/remove_like`, payload);
    return response.data
}

// COMMENT QUERİES

export const postComment = async(payload:any) => {
    const response = await api.post(`${API}/post_comment`, payload);
    return response.data;
}
