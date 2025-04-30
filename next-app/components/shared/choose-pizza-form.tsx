'use client';

import React, { useState } from 'react';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { GroupVariants } from './group-variants';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { PizzaSize, pizzaSizes, PizzaType } from '@/constants/pizza';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items: any[];
  loading?: boolean;
  onSubmit?: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {

  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);


  const textDetaills = 'textDetails'
  const totalPrice = 20;

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400 mb-5">{textDetaills}</p>

        <GroupVariants items={pizzaSizes} value={String(size)} onClick={value => setSize(Number(value) as PizzaSize)}/>

        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} BYN
        </Button>
      </div>
    </div>
  );
};