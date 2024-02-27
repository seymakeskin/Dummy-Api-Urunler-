import  {useState, useEffect} from 'react';
import Product from '../components/Product';
import { useParams } from 'react-router-dom';
import { ProductInterface, ProductResponse } from '../types';
import useFetch from '../hooks/useFetch'; 



export default function Category() {
    const { slug } = useParams();
    const baseUrl = `https://dummyjson.com/products/category/${slug}`;
    const [sortProduct , setSortProduct]= useState<string>('');

    const { data} = useFetch<ProductResponse>(`https://dummyjson.com/products/category/${slug}`);

    console.log('data neee', data?.products);

    return (
         <div className="container mx-auto p-2">
                 <div className="mt-5 mb-3 flex justify-end">
                 <select 
                        value={sortProduct} 
                        aria-label="label for the select"
                        onChange={(e)=> { setSortProduct(e.target.value); }}
                        className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
                        <option value={undefined} disabled={true}>Fiyata göre sırala</option>
                        <option value={'up'}>Düşük fiyata Göre</option>
                        <option value={'down'}>Yüksek fiyata göre</option>
                    </select>
                 </div>
                 <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-4">
                    {data?.products?(
                         <>
                             {
                                data?.products.sort((a, b) => {
                                         if (sortProduct === 'up') { 
                                             return a.price - b.price;
                                         } else if (sortProduct === 'down'){
                                             return b.price - a.price;
                                         }else{
                                             return 0;
                                         }
                                 }).map((data, index:number) => {  return ( <Product key={index} product={data}/>) })
                             }
                         </>
                     ):(
                         <h1 className='text-slate-500 font-medium text-center'>Loading...</h1>
                     )}
                 </div>
         </div>
    )
}
