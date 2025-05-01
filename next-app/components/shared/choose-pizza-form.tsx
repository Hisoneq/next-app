'use client';

import React, { useEffect, useState } from 'react';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { GroupVariants } from './group-variants';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientItem } from './ingredient-item';
import { useSet } from 'react-use';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onClickAddCart?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onClickAddCart,
  className,
}) => {

  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const[selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]))


  const textDetaills = `${size} см, ${mapPizzaType[type]} пицца`

  const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
  const totalIngredientsPrice = ingredients.filter((ingredient) => selectedIngredients.has(ingredient.id)).reduce(
    (acc, ingredient) => acc + ingredient.price, 0
  )
  const totalPrice = pizzaPrice + totalIngredientsPrice;

  const handleClickAdd = () => {
    onClickAddCart?.();
  }

  const filtredPizzasByType = items.filter((item) => item.pizzaType === type);
  const avaliablePizzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filtredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value))
  }))

  useEffect(() => {
    const isAvaliableSize = avaliablePizzaSizes?.find(item => Number(item.value) === size && !item.disabled)
    const avaliableSize = avaliablePizzaSizes?.find((item) => { !item.disabled})

    if(!isAvaliableSize && avaliableSize){
      setSize(Number(avaliableSize.value) as PizzaSize)
    }
  }, [avaliablePizzaSizes, size, type])

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400 mb-5">{textDetaills}</p>

        <div className='flex flex-col gap-4 mt-5'>
          <GroupVariants items={avaliablePizzaSizes} value={String(size)} onClick={value => setSize(Number(value) as PizzaSize)}/>

          <GroupVariants items={pizzaTypes} value={String(type)} onClick={value => setType(Number(value) as PizzaType)}/>
        </div>

        <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'>
          <div className='grid grid-cols-3 gap-3'>
            {ingredients.map((ingredient) => (
              <IngredientItem 
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} BYN
        </Button>
      </div>
    </div>
  );
};