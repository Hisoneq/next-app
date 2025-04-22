'use client';

import { cn } from "@/lib/utils";
import React from "react";
import { Title } from "./title";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useIngredients } from "@/hooks/useIngredients";
import { useFilters } from "@/hooks/useFilters";
import { useQueryFilters } from "@/hooks/useQueryFilters";

interface Props{
    className?: string;
}

export const Filters: React.FC<Props> = ({className}) => {
    const {ingredients, loading} = useIngredients();
    const filters = useFilters()

    useQueryFilters(filters)


    const items = ingredients.map((item) => ({value: String(item.id), text: item.name}));

    const updatePrices = (prices: number[]) => {
        filters.setPrices('priceFrom', prices[0]);
        filters.setPrices('priceTo', prices[1]);
    }

    return(
        <div className={cn('',className)}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold"/>

            <CheckboxFiltersGroup 
                name="pizzaTypes"
                className="mb-5"
                title="Тип теста"
                selectedIds={filters.pizzaTypes}
                OnClickCheckbox={filters.setPizzaTypes}
                items={[
                    { text: 'Тонкое', value: '1'},
                    { text: 'Традиционное', value: '2'}
                ]}
            />

            <CheckboxFiltersGroup 
                name="sizes"
                className="mb-5"
                title="Размеры"
                selectedIds={filters.sizes}
                OnClickCheckbox={filters.setSizes}
                items={[
                    { text: '20 см', value: '20'},
                    { text: '30 см', value: '30'},
                    { text: '40 см', value: '40'},
                ]}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена:</p>
                <div className="flex gap-3 mb-5">
                    <Input type="number" placeholder="от 0" min={0} max={50} value={String(filters.prices.priceFrom)} onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}/>
                    <Input type="number" min={5} max={100} placeholder="до 100" value={String(filters.prices.priceTo)} onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}/>
                </div>

                <RangeSlider min={0} max={100} step={5} value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 100]}
                    onValueChange={updatePrices}
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
                OnClickCheckbox={filters.setSelectedIngredients}
                selectedIds={filters.selectedIds}
            />
        </div>
    );
}