import React, { useState , useEffect, useContext,} from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { CartContext } from '../contexts/CartContext';
import { ProductInterface } from '../types';

export default function Detail() {
    const { setOpen } = useContext(CartContext);

    const { slug } = useParams();
    const baseUrl = `https://dummyjson.com/products/${slug}`;
    const [data , setData]= useState<ProductInterface>();
    const [images , setImages]= useState<any>([]);

    useEffect(() => {
      fetch(baseUrl).then((response) => {
        if (!response.ok) {
            throw (response.status); 
        }
        return response.json();
      }).then((responseData) => {
          setData(responseData);
          console.log('res',responseData);
          setImages(responseData.images || []);
      }).catch((error) => {
         console.log('error',error);
      });
    },[baseUrl])

    
    function handleClick(e: React.FormEvent, d: any) {
        // d:object yazınca hata ? 
        
        fetch('https://6585857f022766bcb8c8cfb7.mockapi.io/cart')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch cart. Status: ${response.status}`);
                }
                return response.json();
            })
            .then((cartItems) => {
                const existingItem = cartItems.find((item: any) => item.productId === d.productId);
                console.log('existingItem',existingItem)
                if (existingItem) {
                    const updatedItem = {
                        ...existingItem,
                        quantity: existingItem.quantity + 1,
                    };

                    return fetch(`https://6585857f022766bcb8c8cfb7.mockapi.io/cart/${existingItem.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedItem),
                    });
                    
                } else {
                    return fetch('https://6585857f022766bcb8c8cfb7.mockapi.io/cart', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(d),
                    });
                }
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to update cart. Status: ${response.status}`);
                }
            
                return response.json();
            })
            .then((da) => {
                console.log('da', da);
                setOpen(true);
            })
            .catch((error) => {
                alert(error.message);
        });
    }
    

    return (
        (data ? (
            <>
                <div className="container mx-auto" >
                    <div className="relative flex w-full items-center overflow-hidden bg-white my-5 px-4 pb-8 pt-14  sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                        <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                            <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg  sm:col-span-4 lg:col-span-5">
                                <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                                    {images.length > 0 ? (
                                        images.map((image:string, i:number) => (
                                            <div className="travelcompany-input" key={i}>
                                                <img src={image} alt="Product" className="rounded-lg" />
                                            </div>
                                        ))
                                    ) : (
                                        <h1 className='text-slate-500 font-medium text-center'>Loading...</h1>
                                    )}
                                </div>
                            </div>
                            <div className="sm:col-span-8 lg:col-span-7">
                                <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{data.title}</h2>
                                <section aria-labelledby="information-heading" className="mt-2">
                                    <h3 id="information-heading">{data.description}</h3>
                                    <p className="text-2xl text-gray-900">${data.price}</p>
                                    <Rating rating={data.rating}></Rating>
                                </section>
                                <section aria-labelledby="options-heading" className="mt-10">
                                    <form>
                                    <button
                                        type="submit"
                                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            var d = {
                                                productId: data.id,
                                                price: data.price,
                                                quantity: 1,
                                                thumbnail: data.thumbnail,
                                                title: data.title,
                                                total: data.price,
                                            }; 
                                            handleClick(e, d);
                                        
                                        }}  
                                        > Add to bag
                                        </button>
                                    </form>
                                </section>
                            </div>                  
                        </div>
                    </div>
                </div>
            </>

        ) : <h1>Loading..</h1>)
    )
}