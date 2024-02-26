import React, { useState , useEffect,} from 'react';
import { Link } from 'react-router-dom';
import { ProductInterface } from '../types';

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


export default function CartPage() {
    const [data , setData]= useState<any>();
    const [total, setTotal] = useState<number>(0);
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
    useEffect(() => {
        if (data && data.length) {
            const totalPrice = data.reduce((cur:number, item: ProductInterface) => {
              const quantity = item.quantity !== undefined ? item.quantity : 1;
              return cur + item.price * quantity;
            }, 0);
            setTotal(totalPrice)
        }
    },[data])

    function removeItem(e:React.FormEvent ,removeId:number){
        fetch(`${baseUrl}/${removeId}`, {
            method: 'DELETE',
        })
        .then((responseData) => { 
            const updatedData = data.filter((item: ProductInterface) => item.id !== removeId);
            setData(updatedData);
            const totalPrice = updatedData.reduce((cur: number, item: ProductInterface) => {
            const quantity = item.quantity !== undefined ? item.quantity : 1;
            return cur + item.price * quantity;
            }, 0);
            setTotal(totalPrice);
        }).catch((error) => {
           console.log('error',error);
        });
    }

    useEffect(() => {
        if (data && data.length) {
            const totalPrice = data.reduce((cur:number, item: ProductInterface) => {
              const quantity = item.quantity !== undefined ? item.quantity : 1;
              return cur + item.price * quantity;
            }, 0);
            setTotal(totalPrice)
        }
    },[data])

  return (
    <div className="container mx-auto p-2">
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
                                    <ul className="-my-6 divide-y divide-gray-200">
                                        {
                                            data.map((product:ProductInterface,index:number) => (
                                                <>
                                                    <Link to={`/product/${product.id}`}>
                                                        <li className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img src={product.thumbnail} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center"/>
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3>
                                                                            {product.title}
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
                                                    </Link>
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
                                $ {total}
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
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
