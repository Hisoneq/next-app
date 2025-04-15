import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client"
import { useEffect, useState } from "react";
import { useSet } from "react-use";

interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
    selectedIds: Set<string>;
    onAddId: (id: string) => void
}

export const useListIngredients = (values: string[] = []): ReturnProps => {

    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [loading, setLoading] = useState(true);

    const [selectedIds, { toggle }] = useSet(new Set<string>(values));

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

    const setSelectedIngredients = (ids: string[]) => {
        ids.forEach(selectedIds.add)
    }

    return { ingredients, loading, onAddId: toggle, selectedIds };
}