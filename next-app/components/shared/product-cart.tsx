/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface Props{
    clasName?: string;
    id: number,
    name: string,
    price: number,
    imageUrl?: string,
}

export const ProductCart: React.FC<Props> = ({ 
    clasName,
    id,
    name,
    price,
    imageUrl,
 }) => {
    return(
        <div className={clasName}>
            <Link href={`/product/${id}`}>
                <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                    <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
                </div>

                <Title text={name} size="sm" className="mb-1 mt-3 font-bold"/>

                <p className="text-sm text-gray-400">
                    Цыпленок, мацарелла и тд...
                </p>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-[20px]">
                        от <b>{price} BYN</b> 
                    </span>

                    <Button variant='secondary'>
                        <Plus className="w-5 h-5 mr-1">Добавить</Plus>
                    </Button>
                </div>
            </Link>
        </div>
    );
}