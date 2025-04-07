import { cn } from "@/lib/utils";
import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";

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

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена:</p>
                <div className="flex gap-3 mb-5">
                    <Input type="number" placeholder="от 0" min={0} max={50} defaultValue={0}/>
                    <Input type="number" min={5} max={100} placeholder="до 100"/>
                </div>

                <RangeSlider min={0} max={100} step={5} value={[0,100]}></RangeSlider>
            </div>

            <CheckboxFiltersGroup 
                title="Ингридиенты"
                className="mt-5"
                limit={4}
                defaultItems={[
                    {
                        text: 'Сырный соус',
                        value: '1',
                    },
                    {
                        text: 'Моццарелла',
                        value: '2',
                    },
                    {
                        text: 'Чеснок',
                        value: '3',
                    },
                    {
                        text: 'Соленые огурцы',
                        value: '4',
                    },
                    {
                        text: 'Красный лук',
                        value: '5',
                    },
                    {
                        text: 'Томаты',
                        value: '6'
                    }

                ]}

                items={[
                    {
                        text: 'Сырный соус',
                        value: '1',
                    },
                    {
                        text: 'Моццарелла',
                        value: '2',
                    },
                    {
                        text: 'Чеснок',
                        value: '3',
                    },
                    {
                        text: 'Соленые огурцы',
                        value: '4',
                    },
                    {
                        text: 'Красный лук',
                        value: '5',
                    },
                    {
                        text: 'Томаты',
                        value: '6'
                    }

                ]}

            />
        </div>
    );
}