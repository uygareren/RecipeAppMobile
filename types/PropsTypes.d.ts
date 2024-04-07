interface IngredientWithMeasurement {
    ingredients_id: string;
    measurement_id: string;
    measurement: string;
    _id: string;
}

interface Recipe {
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
