import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import  "./index.css"
import Header from './components/Header';
import Products from './pages/Products';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Category from './pages/Category';
import Login from './pages/Login';
import Cart from './pages/Cart';
import SlideOver from './components/SlideOver';

export interface  SlideOverProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function App() {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="App bg-slate-100 h-full min-h-screen">
        <Header  open={open} setOpen={setOpen} ></Header>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<Detail/>}  setOpen={setOpen} />
            <Route path="/category/:slug" element={<Category/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/cart" element={<Cart/>} />
        </Routes>
        <SlideOver open={open} setOpen={setOpen}   />
    </div>
  );
}

export default App;
