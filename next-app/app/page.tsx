import { Container } from "@/components/shared/container";
import { Filters } from "@/components/shared/filters";
import { ProductCart } from "@/components/shared/product-cart";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { Title } from "@/components/shared/title";
import { TopBar } from "@/components/shared/top-bar";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        
        <Title text="Все пиццы" size="lg" className="font-extrabold"/> 

      </Container>
      
      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">

          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList title="Пиццы" categoryId={1} items={[
                {
                  id: 1,
                  name: 'Пепперони',
                  imageUrl: 'https://media.dodostatic.net/image/r:584x584/11ee7d5ed4c9050d84b1932a18396c2e.avif',
                  price: 20,
                  items: [{price: 20}]
                },
                {
                  id: 2,
                  name: 'Пепперони',
                  imageUrl: 'https://media.dodostatic.net/image/r:584x584/11ee7d5ed4c9050d84b1932a18396c2e.avif',
                  price: 20,
                  items: [{price: 20}]
                },
                {
                  id: 3,
                  name: 'Пепперони',
                  imageUrl: 'https://media.dodostatic.net/image/r:584x584/11ee7d5ed4c9050d84b1932a18396c2e.avif',
                  price: 20,
                  items: [{price: 20}]
                },
                {
                  id: 4,
                  name: 'Пепперони',
                  imageUrl: 'https://media.dodostatic.net/image/r:584x584/11ee7d5ed4c9050d84b1932a18396c2e.avif',
                  price: 20,
                  items: [{price: 20}]
                },
                {
                  id: 5,
                  name: 'Пепперони',
                  imageUrl: 'https://media.dodostatic.net/image/r:584x584/11ee7d5ed4c9050d84b1932a18396c2e.avif',
                  price: 20,
                  items: [{price: 20}]
                },
                {
                  id: 6,
                  name: 'Пепперони',
                  imageUrl: 'https://media.dodostatic.net/image/r:584x584/11ee7d5ed4c9050d84b1932a18396c2e.avif',
                  price: 20,
                  items: [{price: 20}]
                },
              ]}/> 

              <ProductsGroupList title="Комбо" categoryId={2} items={[
                {
                  id: 1,
                  name: 'Пепперони',
                  imageUrl: 'https://media.dodostatic.net/image/r:584x584/11ee7d5ed4c9050d84b1932a18396c2e.avif',
                  price: 20,
                  items: [{price: 20}]
                },
                {
                  id: 2,
                  name: 'Пепперони',
                  imageUrl: 'https://media.dodostatic.net/image/r:584x584/11ee7d5ed4c9050d84b1932a18396c2e.avif',
                  price: 20,
                  items: [{price: 20}]
                },
                {
                  id: 3,
                  name: 'Пепперони',
                  imageUrl: 'https://media.dodostatic.net/image/r:584x584/11ee7d5ed4c9050d84b1932a18396c2e.avif',
                  price: 20,
                  items: [{price: 20}]
                },
                {
                  id: 4,
                  name: 'Пепперони',
                  imageUrl: 'https://media.dodostatic.net/image/r:584x584/11ee7d5ed4c9050d84b1932a18396c2e.avif',
                  price: 20,
                  items: [{price: 20}]
                },
                {
                  id: 5,
                  name: 'Пепперони',
                  imageUrl: 'https://media.dodostatic.net/image/r:584x584/11ee7d5ed4c9050d84b1932a18396c2e.avif',
                  price: 20,
                  items: [{price: 20}]
                },
                {
                  id: 6,
                  name: 'Пепперони',
                  imageUrl: 'https://media.dodostatic.net/image/r:584x584/11ee7d5ed4c9050d84b1932a18396c2e.avif',
                  price: 20,
                  items: [{price: 20}]
                },
              ]}/> 
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
