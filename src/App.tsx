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
import SearchPage from './pages/SearchPage';
import SignIn from './pages/SignIn';

function App() {
  const [open, setOpen] = useState(false);

  const contextValue = {
    open,
    setOpen,
    // data,
    // setData,
  };

  return (
    <div className="App bg-slate-100 h-full min-h-screen">
      <CartContext.Provider value={contextValue}>
          <Header></Header>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:slug" element={<Detail/>}/>
              <Route path="/category/:slug" element={<Category/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/signin" element={<SignIn/>} />
              <Route path="/cart" element={<Cart/>} />
              <Route path="/search/:slug" element={<SearchPage/>} />
          </Routes>
          <SlideOver />
      </CartContext.Provider>
    </div>
  );
}

export default App;
