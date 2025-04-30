'use client';

import { useCategoryStore } from "@/app/store/category";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import React from "react";

interface Props{
    items: Category[];
    className?: string;
}

// const categories = [
//     {id: 1, name: 'Пиццы'},
//     {id: 2, name: 'Комбо'},
//     {id: 3, name: 'Закуски'},
//     {id: 4, name: 'Кофе'},
//     {id: 5, name: 'Напитки'},
//     {id: 6, name: 'Десерты'},
//     {id: 7, name: 'Какашки'},
// ]

export const Categories: React.FC<Props> = ({items, className}) => {

    const categoryActiveId = useCategoryStore((state) => state.activeId)

    return(
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
            {
                items.map(({name, id} , index) => (
                    <a className={cn(
                        'flex items-center font-bold h-11 rounded-2xl px-5',
                        categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
                    )} 
                    
                    // onClick={(e) => {
                    //     e.preventDefault(); 
                    //     const element = document.getElementById(name);
                    //     if (element) {
                    //         element.scrollIntoView({ behavior: 'smooth' });
                    //     }
                    // }} 

                    href={`/#${name}`}
                    key={index}>
                        <button>{name}</button>
                    </a>
                ))
            }
        </div>
    );
};