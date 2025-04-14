'use client';

import React, { useState } from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

type Item = FilterChecboxProps;

interface Props{
    className?: string;
    title: string;
    items: Item[];
    defaultItems: Item[]; 
    limit?: number;
    loading?: boolean;
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
    loading,
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

    if (loading) {
        return <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {
                ...Array(limit).fill(0).map((_,index) => (
                    <Skeleton key={index} className="h-6 mb-5"/>
                )) 
            }
        </div>
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