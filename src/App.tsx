import React, { useState , useEffect} from 'react';
import './App.css';
import  "./index.css"
import Header from './components/Header';
import Products from './pages/Products';

function App() {
 

  return (
    <div className="App bg-slate-100 h-full">
        <Header></Header>
        <Products></Products>
    </div>
  );
}

export default App;
