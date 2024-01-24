
import React from 'react'
import { useNavigate, Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="bg-slate-300">
    <div className="mx-auto container ">
      <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
          </div>
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              <a href="/" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page"> Market </a>
            </div>
          </div>
         
        </div>
        <div className="flex flex-1 items-center justify-center" >
          <div className="flex flex-shrink-0 items-center gap-10">
              <a href="/" className="">Home</a>
              <a href="/products" className="">Products</a>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link to={`/login`} className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <img width="20" height="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA7UlEQVR4nO2UOwrCQBBAhYApBC9go14gpb2HELyDehVR7+SnMliLlVgFRWKhWDwZHMFG3cgkEcmDgSWZzWN2JlsqFfwigA8MgDlw0pB1X96lJa0BIa9ZSk4alYZvpM9yu8q5H68rPUvxIoF4ZimOE4hjS3Ei8qr4+Bc97uc11b7+o5+QnLKZ+OnmWmZ6cz2QauQopY86cBJTfWZbaUGmAB7QBoI3OYHmeBbCOjAEIp3cMzAGWkBFQ9YT4KI5ke6pfyOsquDK98jekXzLVdoENtixBhou4hX2hC7iXQrirYu4CxwMpXug49Tngr/iBs9IHX8MJ9DWAAAAAElFTkSuQmCC"/>
            </Link>
            <div className="relative ml-3">
                <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  
    <div className="sm:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
      </div>
    </div>
  </nav>
  
  )
}



