import React, { useState , useEffect, FormEventHandler} from 'react';
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

    const [minPrice , setMinPrice]= useState<number | string>();
    const [maxPrice , setMaxPrice]= useState<number | string>();

    const [submitForm , setSubmitForm]= useState<boolean>();

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

    const handleSubmit = (event:React.FormEvent) => {
        event.preventDefault();
        const formData = {
          minPrice: Number(minPrice),
          maxPrice: Number(maxPrice),
        };
        setMinPrice(formData.minPrice);
        setMaxPrice(formData.maxPrice);
        setSubmitForm(true);
     };

  return (
    <>
        <div className="container mx-auto flex">
            <div className="w-2/12 mt-5 mr-5">
                <Filter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}></Filter>
                <form  onSubmit={handleSubmit}>
                    <input type="text" placeholder='minimum'  value={minPrice}  onChange={(e)=> {
                        setMinPrice(e.target.value);
                        setSubmitForm(false);
                    }} />
                    <input type="text" placeholder='maximum'  value={maxPrice}  onChange={(e)=> {
                        setMaxPrice(e.target.value);
                        setSubmitForm(false);
                    }}/>
                    <button > Fiyata Göre Filtrele</button>
                </form>
            </div>
            <div className="w-full md:w-10/12" >
                <div className="flex justify-left flex-wrap gap-5 py-5">
                    {products && Array.isArray(products) ?(
                        <>
                            { 
                                products.filter( product => (minPrice !== undefined && submitForm === true ) ? product.price >= minPrice : true).filter( product => (maxPrice !== undefined && submitForm === true )? product.price <= maxPrice : true ).map((product:object,index:number) => (
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



