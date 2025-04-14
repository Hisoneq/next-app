'use client';

import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDebounce } from 'react-use'

interface Props {
    className?: string;
}

export const SearchInput: React.FC<Props> = ({className}) => {

    const [focus, setFocus] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const [products, setProducts] = useState<Product[]>([]);

    useDebounce(() => {
        Api.products.search(searchValue).then(items => setProducts(items))
    }, 
    250,
    [searchValue]);

    return(
        <>
        { focus && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}

        <div className={cn("flex rounded-2xl flex-1 justify-between relative h-11 z-30", className)}>
            <Search className="absolute translate-y-[50%] left-3 h-5 text-gray-400" />
            <input 
            className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
            type="text"
            placeholder="Найти..."
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            />

            {
                products.length > 0 && 
                <div className={cn(
                    'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                    focus && 'visible opacity-100 top-12')}>
                    {
                        products.map(product => (
                            <Link href={`/products/${product.id}`} key={product.id} className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10">
                                <img src={product.imageUrl} alt={product.name} className="rounded-sm h-8 w-8"/>
                                <span>{product.name}</span>
                            </Link>
                        ))
                    }
                </div>
            }
        </div>

        
        </>
    );
}