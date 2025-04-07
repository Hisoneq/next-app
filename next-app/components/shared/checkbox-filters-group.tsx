'use client';

import React, { useState } from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";

type Item = FilterChecboxProps;

interface Props{
    className?: string;
    title: string;
    items: Item[];
    defaultItems: Item[]; 
    limit?: number;
    searchInputPlacehoolder?: string;
    onChange?: (values: string[]) => void;
    defaultValue?: string[];
}

export const CheckboxFiltersGroup: React.FC<Props> = ({ 
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlacehoolder= "Найти... ",
    className,
    onChange,
    defaultValue,
 }) => {

    const [showAll, setShowAll] = useState(false)

    const [searchValue, setSearchValue] = useState('')

    const list = showAll 
    ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) 
    : defaultItems?.slice(0, limit);

    const onChangeInput = (value: string) => {
        setSearchValue(value)
    }

    return(
        <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {
                showAll && (
                    <div className="mb-5">
                        <Input onChange={e => onChangeInput(e.target.value)} placeholder={searchInputPlacehoolder} className="bg-gray-50 border-none" />
                    </div>
                )
            }

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {
                    list.map((item, index ) => (
                        <FilterCheckbox 
                        onCheckedChange={(i) => console.log(i)}
                        checked = {false}
                        key={String(item.value)}
                        value={item.value}
                        text={item.text}
                        endAdornment={item.endAdornment}
                        />
                    ))
                }
            </div>

            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4': ''}>
                    <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                        {
                            showAll ? 'Скрыть' : 'Показать все'
                        }
                    </button>
                </div>
            )}
        </div>
    );
}