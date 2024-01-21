import React, {useState, useEffect, FormEventHandler, ChangeEvent} from 'react';
import Product from '../components/Product';
import Filter from '../components/Filter';

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

interface IntrinsicElements {
    key: number,
    item: object,
}


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
            <div className="w-2/12 mt-5 mr-5">
                <Filter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}></Filter>
                <form  onSubmit={handleSubmit}>
                    <input type="text" placeholder='minimum'  value={minPrice}  onChange={(e)=> {
                        setMinPrice( Number(e.target.value) );
                        setSubmitForm(false);
                    }} />
                    <input type="text" placeholder='maximum'  value={maxPrice}  onChange={(e)=> {
                        setMaxPrice( Number(e.target.value));
                        setSubmitForm(false);
                    }}/>
                    <button > Fiyata Göre Filtrele</button>
                </form>
            </div>
            <div className="w-full md:w-10/12" >
                <div >
                    <select onChange={(e)=> {
                                 setSortProduct(e.target.value);
                             }}
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
                                        // console.log('product',product)
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



