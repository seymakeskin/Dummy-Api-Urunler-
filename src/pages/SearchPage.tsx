import { useParams } from 'react-router-dom';
import { ProductInterface } from '../types';
import { useEffect, useState } from 'react';
import Product from '../components/Product';


export default function SearchPage() {
    const { slug } = useParams();
    console.log(slug, 'slug');
    const baseUrl = `https://dummyjson.com/products/search?q=${slug}`;
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
    },[baseUrl])

    return (
        <>
            {products && (
                <div className="container mx-auto">
                            <div className="mt-5 mb-3 flex justify-end ">
                                <select  aria-label="label for the select"
                                    onChange={(e)=> { setSortProduct(e.target.value); }}
                                    className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                                    >
                                    <option value={undefined} disabled={true} selected={true}>Fiyata göre sırala</option>
                                    <option value={'up'} >Düşük fiyata Göre</option>
                                    <option value ={'down'}>Yüksek fiyata göre</option>
                                </select>
                            </div>
                            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-4">
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
                                    <h1 className='text-slate-500 font-medium text-center'>Aradığınız ürün bulunamadı!</h1>
                                )}
                            </div>
                </div>
            )}
        </>
   )
}
