import React, { useContext } from 'react'
import Rating from './Rating'
import { Link } from 'react-router-dom';
import { ProductInterface } from '../types';
import { CartContext } from '../contexts/CartContext';


export default function Product({product}:{product:ProductInterface}) {
    const { setOpen } = useContext(CartContext);
    
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
     <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/product/${product.id}`} >
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
                <p className="text-white bg-slate-400 hover:bg-slate-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => {
                    e.preventDefault();
                    var d = {
                        productId: product.id,
                        price: product.price,
                        quantity: 1,
                        thumbnail: product.thumbnail,
                        title: product.title,
                        total: product.price,
                    }; 
                    handleClick(e, d);
                
                }}  
                
                >Add to cart</p>
            </div>
     </div>
  )
}
