import React from 'react'
import Rating from './Rating'
import { useNavigate, Link } from 'react-router-dom';
import { ProductInterface } from '../pages/Products'

export default function Product({product}:{product:ProductInterface}) {

  return (
     <div className="w-[300px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/products/${product.id}`} >
                <div  className="flex justify-center">
                    <img className="p-8 rounded-t-lg h-[200px] " src={product.thumbnail} alt={product.brand}/>
                </div>
                <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"> {product.brand}</h5>
                    <Rating rating={product.rating}></Rating>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                    </div>
                </div>
            </Link>
            <div className="m-5">
                <p className="text-white bg-slate-400 hover:bg-slate-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</p>
            </div>
     </div>
  )
}
