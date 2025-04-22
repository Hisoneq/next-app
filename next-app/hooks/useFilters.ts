import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useState } from "react";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}
interface QueryFilters extends PriceProps{
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export interface Filters {
    sizes: Set<string>
    pizzaTypes: Set<string>
    selectedIds: Set<string>
    prices: PriceProps
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void
    setPizzaTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
    // const router = useRouter();
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    {/*Ingredients*/}
    const [selectedIds, { toggle: toggleIngredients }] = useSet(
        new Set<string>(searchParams.get('ingredients')?.split(',')));

    {/*Sizes*/}
    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []));

    {/*Pizza types*/}
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
        new Set<string>(searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []));

    {/*Cost*/}
    const [prices, setPrices] = useState<PriceProps>({
            priceFrom: Number(searchParams.get('priceFrom')) || undefined,
            priceTo: Number(searchParams.get('priceTo')) || undefined,
        })

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices(prev => ({
            ...prev,
            [name]: value,
        }))
    }
    

    return {
        sizes,
        pizzaTypes,
        selectedIds,
        prices,
        setPrices: updatePrice,
        setPizzaTypes: togglePizzaTypes,
        setSizes: toggleSizes,
        setSelectedIngredients: toggleIngredients
    }
}