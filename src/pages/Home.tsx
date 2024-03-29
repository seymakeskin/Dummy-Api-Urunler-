import { useState , useEffect} from 'react';
import Slide from "../components/Slide";
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch'; 

// import TabPanel from '../components/TabPanel';

export default function Home() {
  const baseUrl = 'https://dummyjson.com/products/categories';
  const { data } = useFetch<Array<string>>(`https://dummyjson.com/products/categories`);
  // console.log('data-ne', data);
   
  return (
    <div className="container mx-auto p-2">
        <Slide></Slide>
        <h3 className='text-4xl font-bold dark:text-white text-center mt-10 mb-10 text-slate-500'>Tüm Kategoriler</h3>
        <div className="flex gap-1 flex-wrap justify-center">
         {data &&(
                 <>
                     {
                         data.map((categorie:string, index:number) => (
                             <div key={index} className="w-[200px]">
                                 <Link to={`category/${categorie}`} className='uppercase inline-block border-solid border-2 border-slate-300  w-full text-center focus:outline-none text-slate-500  focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-500 dark:focus:ring-purple-300'>
                                     {categorie}
                                 </Link>
                             </div>
                         ))
                     }
                 </>
         )}

        </div>
        {/* <TabPanel></TabPanel> */}
    </div>
  )
}
