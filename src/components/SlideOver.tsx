import React, { useState , useEffect} from 'react';
import '../styles/Sidebar.css';
import { ProductInterface } from '../pages/Products';

// state'i tüm sayfalarda kontrol edilebilir yapmam gerekiyor.

interface SlideOverProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
  
const SlideOver: React.FC<SlideOverProps> = ({ open, setOpen }) => {
    const [data , setData]= useState<any>();
    // const [total, setTotal] = useState:Array<String>([]);
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
        .then((responseData) => { 
            setData(responseData);
            console.log('data',responseData)
        }).catch((error) => {
           console.log('error',error);
        });
    }



  return (
    <>
        <div className={`${open ? 'show relative z-10' : 'relative z-10'}`}  id="side-over" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="opacity fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="side-cart fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div className="pointer-events-auto w-screen max-w-md">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between" >
                                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                <div className="ml-3 flex h-7 items-center">
                                <button onClick={()=> {
                                console.log('open', open);
                                    setOpen(false) 
                                }} type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"  >
                                    <span className="absolute -inset-0.5"></span>
                                    <span className="sr-only" >Close panel</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div className="flow-root">
                                { data  && data.length ? (
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
                                     ) : <>
                                     <h1> Sepetiniz Boş!</h1>
                                 </> }
                                </div>
                            </div>
                            </div>
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>$262.00</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                or
                                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
export default SlideOver;
