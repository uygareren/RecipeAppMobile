import { api } from "./api";

const API = process.env.API;
console.log("apiiii: ", API);


// INTEREST QUERİES

export const getInterestedData = async() => {
    const response = await api.get(`${API}/get-all-world-cuisines`);
    const data = response.data;

    return data;
}

export const postUserInterest = async(payload:PostUserInterestType) => {
    
    const response = await api.post( `${API}/post_user_interests`, payload);
    return response
}

// CATEGORY QUERİES

export const getCategories = async () => {
    const response = await api.get(`${API}/categories`);
    return response.data;
}

export const getCategoryDetail = async (category_id:String) => {
    const response = await api.get(`${API}/recipe-by-category/${category_id}`);
    return response.data;
}

// USER DETAİL 

export const getUserDetail = async (id:String) => {
    const response = await api.get(`${API}/get_user_detail/${id}`)
    return response.data
}

export const getFollowing = async (userId: String) => {
    const response = await api.post(`${API}/get_following`, { user_id: userId });
    return response.data;
}


export const addFollowed = async (payload:AddFollowedType) => {
    try {
        const response = await api.post(`${API}/add_followed`, payload);
        return response.data;
    } catch (error) {
        console.error("addFollowed error", error);
        throw error; // rethrow the error for better error handling
    }
};

export const removeFollowed = async(payload:any) => {
    const response = await api.post(`${API}/remove_followed`, payload);
    return response.data;
}


export const getRecipeByUserId = async(user_id:any) => {
    const response = await api.post(`${API}/get_recipe_by_userid`, user_id);
    return response.data;
}

export const updateUser = async(payload:UpdateUserType) => {
    const response = await api.post(`${API}/update_user`, payload);
    return response.data;
}

export const updateProfileImage = async (user_id: string, payload: any) => {
    console.log("id", user_id);
    console.log(`${API}/update_profile_image/${user_id}`);
  
    const response = await api.post(`${API}/update_profile_image/${user_id}`, payload, {
      headers: {
        Accept: 'application/json',
        "Content-Type": "multipart/form-data"
      }
    });
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

export const postRecipe = async(payload:any) => {
    const response = await api.post(`${API}/post-recipe`, payload);
    return response.data;
}

export const postRecipeImage = async(recipe_id:string,payload:any) => {
    console.log("recipe id : ", recipe_id);
    console.log(`${API}/post-recipe-image/${recipe_id}`);

    const response = await api.post(`${API}/post-recipe-image/${recipe_id}`, payload, {
        headers: {
          Accept: 'application/json',
          "Content-Type": "multipart/form-data"
        }
      }
        
    );
    return response.data;
}


// RECİPE QUERİES

export const getRecipeById = async(id:String) => {
    const response = await api.get(`${API}/recipe-detail/${id}`);

    return response.data;
}



export const getRecipeSearch = async(value:string) => {
    console.log(`${API}/recipe-search?searchQuery=${value}`);
    const response = await api.get(`${API}/recipe-search?searchQuery=${value}`);
    return response.data;

}

export const getRecipeByInterests = async (payload: any) => {
    const response = await api.post(`${API}/recipe-by-interests`, payload);
  
    return response.data;
};

export const getRecipeByInterestId = async (payload: any) => {
    console.log("payload, ", payload);
    const response = await api.post(`${API}/recipe-by-interest`, payload);
    console.log("response", response);
    return response.data;
};


export const getFollowerRecipe = async (payload: any) => {
    const response = await api.post(`${API}/recipe-by-follower`, payload);
    return response.data;
};

export const deleteRecipeById = async (recipe_id:string) => {
    console.log("recipe_id", recipe_id);
    const response = await api.post(`${API}/delete-recipe/${recipe_id}`);
    return response.data;
}

// MEASUREMENT QUERİES

export const getAllMeasurements = async() => {
    const response = await api.get(`${API}/get_measurements`);
    return response.data;
}

// LIKE QUERİES

export const postLike = async(payload:LikeType) => {
    console.log("payload post like", payload);
    const response = await api.post(`${API}/post_like`, payload);
    return response.data
}
export const removeLike = async(payload:LikeType) => {
    console.log("payload remove like", payload);

    const response = await api.post(`${API}/remove_like`, payload);
    return response.data
}

// COMMENT QUERİES

export const postComment = async(payload:CommentType) => {
    const response = await api.post(`${API}/post_comment`, payload);
    return response.data;
}

export const deleteComment = async(payload:any) => {
    console.log("payload", payload);
    console.log("delete debug");
    const response = await api.post(`${API}/delete_comment`, payload);
    return response.data;
}

// USER SEARCH QUERİES

export const getUserSearch = async(value:string) => {
    console.log(`${API}/recipe-search?searchQuery=${value}`);

    const response = await api.get(`${API}/user-search?userQuery=${value}`);

    return response.data;
}

// LİKED RECİPES

export const getLikedRecipes = async(user_id:string) => {
    const response = await api.get(`${API}/liked-recipes?user_id=${user_id}`);
    return response.data;
}


// MADE MEALS

export const getMadeMeals = async(userId:String) => {
    const response = await api.get(`${API}/get-made-meals-by-user/${userId}`);
    return response.data;
}
export const postMadeMeals = async(payload:IPostMadeMeals) => {
    const response = await api.post(`${API}/post-made-meals-by-user`, payload);
    return response.data;
}

export const deleteMadeMeals = async(payload:any) => {
    const response = await api.post(`${API}/delete-made-meals-by-user`, payload);
    return response.data;
}

export const doneMadeMeals = async(payload:any) => {
    const response = await api.post(`${API}/post-done-made-meals`, payload);
    return response.data;
}

export const lengthMadeMeals = async(recipe_id:string) => {
    const response = await api.get(`${API}/get-length-made-meals/${recipe_id}`);
    return response.data;
}

export const getMadeMealsDetail = async(recipe_id:string) => {
    const response = await api.get(`${API}/get-made-meals/${recipe_id}`);
    return response.data;
}



