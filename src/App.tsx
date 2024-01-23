import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import  "./index.css"
import Header from './components/Header';
import Products from './pages/Products';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Category from './pages/Category';
import Login from './pages/Login';

function App() {
  return (
    <div className="App bg-slate-100 h-full min-h-screen">
        <Header></Header>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<Detail/>} />
            <Route path="/category/:slug" element={<Category/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
    </div>
  );
}

export default App;
