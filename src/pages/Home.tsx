import React, { useState , useEffect} from 'react';
import Slide from "../components/Slide";

export default function Home() {
  const baseUrl = 'https://dummyjson.com/products/categories';
  const [categories , setCategories]= useState<any>();

  useEffect(() => {
      fetch(baseUrl).then((response) => {
        if (!response.ok) {
            throw (response.status);
        }
        return response.json();
      }).then((responseData) => {
        setCategories(responseData);
      }).catch((error) => {
        console.log('error',error);
      });
  },[])
   
  return (
    <div className="container mx-auto">
        <Slide></Slide>
        <h3>Kategoriler</h3>
        <div className="flex gap-10">
            
        </div>
    </div>
  )
}
