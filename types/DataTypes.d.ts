interface UserData {
    user_name: string;
    user_surname: string;
    userId: string;
    user_image: string | null; 
}

interface CommentData {
    _id?: string;
    postId: string;
    comment: string;
    createdAt: string;
    userdata: UserData;
}

interface PostUserInterestType {
    user_id: String,
    interests_data: String[]
}

interface AddFollowedType {
    user_id: String,
    followed_id: String
}

interface UpdateUserType{
    user_id: String;
    name: String;
    surname: String;
    email: String;
    phone: String;
    country: String;
    city: String;
    biography: String;
}

interface LikeType{
    recipeId: String,
    userId: String,
    isLike?: boolean
}

interface CommentType{
    userId: String,
    recipeId: String,
    comment: String
}

interface IPostMadeMeals {
    userId?: string;
    userName?: string;
    userSurname?: string;
    userImage?: string;
    recipeId?: string;
    recipeName?: string;
    recipeImage?: string;
    status: number;
};
