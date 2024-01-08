import React, { useState , useEffect} from 'react';

import './App.css';
import  "./index.css"
import Header from './components/Header';
import Product from './components/Product';

interface product {
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

function App() {
 
  const baseUrl = 'https://dummyjson.com/products';
  const [products , setProducts]= useState<any[]>();

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


  return (
    <div className="App bg-slate-100 h-screen">
        <Header></Header>
        <div className="flex justify-center wrap">
          {products && Array.isArray(products) ?(
          <>
              {products.map((product:Array<String>) => (
                  <Product item={product}/>
              ))} 
            </>
          ):(
              <h1 className='text-slate-500 font-medium text-center'>Loading...</h1>
          )}
        </div>
    </div>
  );
}

export default App;
