import React, { useState , useEffect,} from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { productInterface } from './Products';

export default function Detail() {
    const { slug } = useParams();
    const baseUrl = `https://dummyjson.com/products/${slug}`;
    const [data , setData]= useState<any>();

    useEffect(() => {
      fetch(baseUrl).then((response) => {
        if (!response.ok) {
            throw (response.status);
        }
        return response.json();
      }).then((responseData) => {
          setData(responseData);
       
      }).catch((error) => {
         console.log('error',error);
      });
    },[slug])

   
    return (
        <div className="container mx-auto">
            <div className="relative flex w-full items-center overflow-hidden bg-white my-5 px-4 pb-8 pt-14  sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg  sm:col-span-4 lg:col-span-5">
                        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                                {/* <>
                                    {data.images.map((src:string,index:number)=>{
                                        <img key={index} src={src} alt="Walnut card tray with white powder coated steel divider and 3 punchout holes." className="rounded-lg "/>
                                    })} 
                                </> */}
                        </div>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{data.title}</h2>
                        <section aria-labelledby="information-heading" className="mt-2">
                                <h3 id="information-heading" className="sr-only">{data.description}</h3>
                                <p className="text-2xl text-gray-900">$192</p>
                                <Rating></Rating>
                        </section>
                        <section aria-labelledby="options-heading" className="mt-10">
                            <h3 id="options-heading" className="sr-only">Product options</h3>
                            <form>
                                <button type="submit" className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add to bag</button>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
