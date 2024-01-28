import React, { useState , useEffect,} from 'react';
import { ProductInterface } from './Products';

export interface Root {
    carts: Cart[]
    total: number
    skip: number
    limit: number
}
export interface Cart {
  id: number
  products: ProductInterface[]
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
}


export default function Cart() {
    const [data , setData]= useState<any>();
    const baseUrl = "https://6585857f022766bcb8c8cfb7.mockapi.io/cart";
    // mock apide sepete ekleme fonksiyonu yapabilmek için proje oluşturdum. 

    useEffect(() => {
        fetch(baseUrl).then((response) => {
          if (!response.ok) {
              throw (response.status);
          }
          return response.json();
        }).then((responseData) => { 
            setData(responseData);
            console.log('data',responseData)
        }).catch((error) => {
           console.log('error',error);
        });
    },[])

    function removeItem(e:React.FormEvent ,removeId:number){
        fetch(`${baseUrl}/${removeId}`, {
            method: 'DELETE',
        })
        .then(res => res.text())
        .then(res => console.log(res))
    }

   
  return (
    <div className="container mx-auto">
        <div className="flex items-start justify-between">
            <h2 className="text-lg font-medium text-gray-900 py-4" >Shopping cart</h2>
        </div>   
        { data  && data.length ? (
            <div className=" inset-0">
                <div className=" inset-0 ">
                    <div className="pointer-events-none inset-y-0 right-0 flex max-w-full">
                    <div className="pointer-events-auto w-full">
                        <div className="flex h-full flex-col md:flex-row gap-20 pb-10">
                        <div className="flex-1">
                            <div className="mt-8">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {
                                         data.map((product:ProductInterface,index:number) => (
                                            <>
                                                <li className="flex py-6">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img src={product.thumbnail} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center"/>
                                                    </div>
                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href="#">{product.title}</a>
                                                            </h3>
                                                            <p className="ml-4"> ${( product.total !== undefined ?  product.total : 0) * (product.quantity !== undefined ? product.quantity : 0) }</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500">Adet Fiyatı :  ${product.price} </p>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <p className="text-gray-500"> Adet : {product.quantity}</p>
                                                            <div className="flex">
                                                                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500"  onClick={(e) => {
                                                                    e.preventDefault();
                                                                    removeItem(e, product.id);
                                                                }}  >Remove</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </>
                                         ))
                                    }
                                </ul>
                            </div>
                            </div>
                            
                        </div>
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${data.total}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                            <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        ) : <>
            <h1> Sepetinizde Ürün Yok ! </h1>
        
        </> }
      
  </div>
  )
}
