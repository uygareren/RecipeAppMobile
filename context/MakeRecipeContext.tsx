import { createContext, useState } from "react";

export const MakeRecipeContext = createContext<any>(null);

export default function MakeRecipeProvider({children}:any){

    const [recipe, setRecipe] = useState<any[]>([]);

    return (
        <MakeRecipeContext.Provider value={{recipe, setRecipe}}>
            {children}
        </MakeRecipeContext.Provider>
    )
}