import React, { useState , useEffect} from 'react';
import Product from '../components/Product';
import Filter from '../components/Filter';

export interface productInterface {
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
}


export default function Products() {
    const baseUrl = 'https://dummyjson.com/products';
    const [products , setProducts]= useState<any[]>();
    const [selectedCategories , setSelectedCategories]= useState<string[]>(['tops']);    

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
    },[])
    console.log('seçile itemler',selectedCategories);

  return (
    <>
        <div className="container mx-auto flex">
            <div className="w-2/12 mt-5 mr-5">
                <Filter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}></Filter>
            </div>
            <div className="w-full md:w-10/12" >
                <div className="flex justify-left flex-wrap gap-5 py-5">
                    {products && Array.isArray(products) ?(
                        <>
                            {products.filter(product => selectedCategories.every(category => product.category.includes(category))).map((product:Array<String>) => (
                             <Product item={product}/>
                            ))} 
                        </>
                    ):(
                        <h1 className='text-slate-500 font-medium text-center'>Loading...</h1>
                    )}
                </div>
            </div>
        </div>
       
    </>

  )
}


