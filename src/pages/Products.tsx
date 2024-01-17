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
    key: number, 
    item: object,
}

interface IntrinsicElements {
    key: number, 
    item: object,
}


export default function Products() {
    const baseUrl = 'https://dummyjson.com/products';
    const [products , setProducts]= useState<any[]>();
    const [selectedCategories , setSelectedCategories]= useState<string[]>([]);
     
    const fetchProducts = async (categories: string[]) => {
        console.log('cate', categories);
        try {
            if (categories.length === 0) {
                const response = await fetch(baseUrl);
              
                if (!response.ok) {
                    throw new Error(response.status.toString());
                }
                const responseData = await response.json();
                console.log(responseData);
                setProducts(responseData.products);
            } else {
                const categoryEndpoints = categories.map(category => `${baseUrl}/category/${category}`);

                const promises = categoryEndpoints.map(endpoint => fetch(endpoint));
                const responses = await Promise.all(promises);

                const dataPromises = responses.map(response => {
                    if (!response.ok) {
                        throw new Error(response.status.toString());
                    }
                    return response.json();
                });

                const data = await Promise.all(dataPromises);

                const mergedProducts = data.reduce(
                    (acc, curr) => acc.concat(curr.products), []
                );
                console.log(mergedProducts);
                setProducts(mergedProducts);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    
    useEffect(() => {
        fetchProducts(selectedCategories);
    }, [selectedCategories]);

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
                            { 
                                products.map((product:object,index:number) => (
                                    <Product key={index} items={product}/>
                                ))
                            }   
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



