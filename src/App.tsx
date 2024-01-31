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

import { CartContext } from './contexts/CartContext';

function App() {
  const [open, setOpen] = useState(false);

  const data = {
    open,
    setOpen
  }
  return (
    <div className="App bg-slate-100 h-full min-h-screen">
      <CartContext.Provider value={data}>
          <Header></Header>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:slug" element={<Detail/>}/>
              <Route path="/category/:slug" element={<Category/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/cart" element={<Cart/>} />
          </Routes>
          <SlideOver />
      </CartContext.Provider>
    </div>
  );
}

export default App;
