
import { useContext, useState} from 'react'
import {Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

export default function Header() {
  const { open, setOpen } = useContext(CartContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    navigate(`/search/${searchTerm}`);

  };

   
  return (
    <>
      <nav className="flex justify-between bg-slate-600 text-white w-screen">
            <div className="px-5 xl:px-12 py-3 flex w-full items-center container mx-auto p-2">
              <a className="text-3xl font-bold font-heading" href="/">
                MARKET
              </a>
              <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <Link to={'/'}>
                    Home
                </Link>
                <Link to={'/products'}>
                    Products
                </Link>
              </ul>
              <div className="hidden xl:flex items-center space-x-5 items-center">
                <button className="flex items-center hover:text-gray-200"  onClick={()=>{
                  setOpen(!open)
                  }} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                      </span>
                    </span>
                </button>
                <Link  to={'/login'}  className="flex items-center hover:text-gray-200" >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </Link>
                
              </div>
            </div>
            <Link  to={'/login'}  className="flex items-center hover:text-gray-200 xl:hidden" >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
            </Link>
            <button className="xl:hidden flex mr-6 items-center" onClick={()=>{
                  setOpen(!open)
                  }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                </span>
              </span>
            </button>
            
            {/* <a className="navbar-burger self-center mr-5 xl:hidden" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </a> */}
            {/* <form onSubmit={handleSubmit} className="flex items-center">
                  <input
                    type="text"
                    className="inline bg-white appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-transparent"
                    placeholder="Ürün Ara"
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                  <button
                    type="submit"
                    className="ml-2 px-4 py-2 text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Ara
                  </button>
          </form> */}
      </nav>

    </>
  )
}


