import React from 'react'
import { productInterface } from '../pages/Products'
import Rating from './Rating'
import { useNavigate, Link } from 'react-router-dom';


export default function Product(items:any) {
    // console.log('items',items.items.rating)
  return (
     <div className="w-[300px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/products/${items.items.id}`} >
                <div  className="flex justify-center">
                    <img className="p-8 rounded-t-lg h-[200px] " src={items.items.thumbnail} alt={items.items.brand}/>
                </div>
                <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"> {items.items.brand}</h5>
                    <Rating rating={items.items.rating}></Rating>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">${items.items.price}</span>
                    </div>
                </div>
            </Link>
            <div className="m-5">
                <p className="text-white bg-slate-400 hover:bg-slate-500   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</p>
            </div>
     </div>
  )
}
