'use client';

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Title } from "./title";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useListIngredients } from "@/hooks/useListIngredients";
import { useSet } from "react-use";
import qs from "qs"
import { useRouter, useSearchParams } from "next/navigation";

interface Props{
    className?: string;
}

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps{
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export const Filters: React.FC<Props> = ({className}) => {
    const router = useRouter();
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
    const { ingredients, loading, onAddId, selectedIds } = useListIngredients(
        searchParams.get('ingredients')?.split(','));
    
    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []));
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []));
    
    const [prices, setPrices] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    })

    const items = ingredients.map((item) => ({value: String(item.id), text: item.name}))

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices({
            ...prices,
            [name]: value,
        })
    }

    const filters = {
        ...prices,
        pizzaTypes: Array.from(pizzaTypes),
        sizes: Array.from(sizes),
        ingredients: Array.from(selectedIds)
    }

    useEffect(() => {
        const query = qs.stringify(filters, {arrayFormat: 'comma'});

        router.push(`?${query}`, {
            scroll: false
        })

    }, [filters])

    return(
        <div className={cn('',className)}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold"/>

            <CheckboxFiltersGroup 
                name="pizzaTypes"
                className="mb-5"
                title="Тип теста"
                selectedIds={pizzaTypes}
                OnClickCheckbox={togglePizzaTypes}
                items={[
                    { text: 'Тонкое', value: '1'},
                    { text: 'Традиционное', value: '2'}
                ]}
            />

            <CheckboxFiltersGroup 
                name="sizes"
                className="mb-5"
                title="Размеры"
                selectedIds={sizes}
                OnClickCheckbox={toggleSizes}
                items={[
                    { text: '20 см', value: '20'},
                    { text: '30 см', value: '30'},
                    { text: '40 см', value: '40'},
                ]}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена:</p>
                <div className="flex gap-3 mb-5">
                    <Input type="number" placeholder="от 0" min={0} max={50} value={String(prices.priceFrom)} onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}/>
                    <Input type="number" min={5} max={100} placeholder="до 100" value={String(prices.priceTo)} onChange={(e) => updatePrice('priceTo', Number(e.target.value))}/>
                </div>

                <RangeSlider min={0} max={100} step={5} value={[prices.priceFrom || 0, prices.priceTo || 100]}
                    onValueChange={([from, to]) => setPrices({ priceFrom: from, priceTo: to})}
                />
            </div>

            <CheckboxFiltersGroup 
                title="Ингридиенты"
                name="ingredients"
                className="mt-5"
                limit={4}
                defaultItems={items.slice(0,6)}
                items={items}
                loading={loading}
                OnClickCheckbox={onAddId}
                selectedIds={selectedIds}
            />
        </div>
    );
}