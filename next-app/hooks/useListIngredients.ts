import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client"
import { useEffect, useState } from "react";

interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
}

export const useListIngredients = (): ReturnProps => {

    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchIngredients() {
            try{
                setLoading(true)
                const ingredients = await Api.ingredients.getAll();
                setIngredients(ingredients)
            }catch(e) {
                console.error(e);
            }finally{
                setLoading(false)
            }
        }

        fetchIngredients();
    }, [])

    return { ingredients, loading };
}