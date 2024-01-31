import React, {useState, useEffect} from 'react';
import Filter from '../components/Filter';
import { ProductInterface } from '../types';
import Product from '../components/Product';


export default function Products() {
    const baseUrl = 'https://dummyjson.com/products';
    const [products , setProducts]= useState<ProductInterface[]>([]);
    const [selectedCategories , setSelectedCategories]= useState<string[]>([]);

    const [minPrice , setMinPrice]= useState<number >();
    const [maxPrice , setMaxPrice]= useState<number>();
    const [sortProduct , setSortProduct]= useState<string>('');

    const [submitForm , setSubmitForm]= useState<boolean>();

    const fetchProducts = async (categories: string[]) => {
        // console.log('cate', categories);
        try {
            if (categories.length === 0) {
                const response = await fetch(baseUrl);

                if (!response.ok) {
                    throw new Error(response.status.toString());
                }
                const responseData = await response.json();
                // console.log(responseData);
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
                // console.log(mergedProducts);
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
            <div className="w-2/12 mt-[70px] mr-5">
                <div className="rounded-lg bg-white p-2 ">
                    <Filter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}></Filter>
                   
                </div>
            </div>
            <div className="w-full md:w-10/12 " >
                <div className="mt-5 mb-3 flex justify-between gap-5 items-baseline">
                    <select className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"  aria-label="label for the select"  onChange={(e)=> {
                                 setSortProduct(e.target.value);
                             }}>
                        <option value={undefined} disabled={true} selected={true}>Fiyata göre sırala</option>
                        <option value={'up'} >Düşük fiyata Göre</option>
                        <option value ={'down'}>Yüksek fiyata göre</option>
                    </select>

                    <form  onSubmit={handleSubmit}  >
                        <div className='grid  grid-cols-1 gap-x-2 sm:grid-cols-6 w-[315px]'>
                            <div className="sm:col-span-2">
                                <input type="text"  className="inline bg-white-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder='minimum'  value={minPrice}  onChange={(e)=> {
                                    setMinPrice( Number(e.target.value) );
                                    setSubmitForm(false);
                                }} />
                            </div>
                            <div className="sm:col-span-2">
                                <input type="text"  className="inline  bg-white-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder='maximum'  value={maxPrice}  onChange={(e)=> {
                                    setMaxPrice( Number(e.target.value));
                                    setSubmitForm(false);
                                }}/>
                            </div>
                            <div  className="sm:col-span-2">
                             <button className='w-full text-white bg-slate-400 hover:bg-slate-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Filtrele</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
                    {products.length ?(
                        <>
                            {
                                products.filter( (product) =>
                                    (minPrice !== undefined && submitForm === true ) ? product.price >= minPrice : true)
                                    .filter( product => (maxPrice !== undefined && submitForm === true )? product.price <= maxPrice : true )
                                    .sort((a, b) => {
                                        if (sortProduct === 'up') {
                                            return a.price - b.price;
                                        } else if (sortProduct === 'down'){
                                            return b.price - a.price;
                                        }else{
                                            return 0;
                                        }
                                    })
                                    .map((product, index:number) => {
                                        return ( <Product key={index} product={product}/>)
                                    })
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



