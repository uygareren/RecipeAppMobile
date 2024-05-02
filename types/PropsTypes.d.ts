interface IngredientWithMeasurement {
    ingredients_id: string;
    measurement_id: string;
    measurement: string;
    _id: string;
}

interface RecipeType {
    user: {
        userId: string;
        name: string;
        surname: string;
        image: string | null;
    };
    _id: string;
    recipeName: string;
    image: {
        type: string;
        data: number[];
    };
    ingredients: string[];
    ingredients_with_measurements: IngredientWithMeasurement[];
    worldCuisinesTagId: string;
    recipeDescription: string;
    categoryId: string;
    userId: string;
    calory: string;
    level: string;
    cooking_time: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


interface IngredientWithMeasurement {
    _id: string;
    ingredients_id: string;
    measurement: string;
    measurement_id: string;
}

interface User {
    image: string;
    name: string;
    surname: string;
    userId: string;
}

interface RecipeItem {
    __v: number;
    _id: string;
    calory: string;
    categoryId: string;
    cooking_time: string;
    createdAt: string;
    image: string;
    ingredients: string[];
    ingredients_with_measurements: IngredientWithMeasurement[];
    level: string;
    recipeDescription: string;
    recipeName: string;
    updatedAt: string;
    user: User;
    userId: string;
    worldCuisinesTagId: string;
    navigation:any
}