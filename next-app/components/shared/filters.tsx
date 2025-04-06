import { cn } from "@/lib/utils";
import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";

interface Props{
    className?: string;
}

export const Filters: React.FC<Props> = ({className}) => {
    return(
        <div className={cn('',className)}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold"/>

            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Можно собрать" value="1" />
                <FilterCheckbox text="Можно собрать" value="2" />
            </div>
        </div>
    );
}