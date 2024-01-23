import React, {useState, useEffect} from 'react';
import Product from '../components/Product';
import { useParams } from 'react-router-dom';

export interface ProductInterface {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage:number,
    rating:number,
    stock:number,
    brand:string,
    category:string,
    thumbnail:string,
    images?: any,

}

export default function Category() {
    const { slug } = useParams();
    const baseUrl = `https://dummyjson.com/products/category/${slug}`;
    const [products , setProducts]= useState<ProductInterface[]>([]);
    const [sortProduct , setSortProduct]= useState<string>('');

    useEffect(() => {
        fetch(baseUrl).then((response) => {
          if (!response.ok) {
              throw (response.status);
          }
          return response.json();
        }).then((responseData) => {
            setProducts(responseData.products);
        }).catch((error) => {
           console.log('error',error);
        });
    },[slug])

    console.log(products);
     return (
         <div className="container mx-auto flex">
             <div className="w-full md:w-10/12" >
                 <div>
                     <select aria-label="label for the select"
                            onChange={(e)=> { setSortProduct(e.target.value); }}
                            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                            <option value={undefined} disabled={true} selected={true}>Fiyata göre sırala</option>
                            <option value={'up'} >Düşük fiyata Göre</option>
                            <option value ={'down'}>Yüksek fiyata göre</option>
                     </select>
                 </div>
                 <div className="flex justify-left flex-wrap gap-5 py-5">
                     {products.length ?(
                         <>
                             {
                                 products.sort((a, b) => {
                                         if (sortProduct === 'up') {
                                             return a.price - b.price;
                                         } else if (sortProduct === 'down'){
                                             return b.price - a.price;
                                         }else{
                                             return 0;
                                         }
                                 }).map((product, index:number) => {  return ( <Product key={index} product={product}/>) })
                             }
                         </>
                     ):(
                         <h1 className='text-slate-500 font-medium text-center'>Loading...</h1>
                     )}
                 </div>
             </div>
         </div>
    )
}
