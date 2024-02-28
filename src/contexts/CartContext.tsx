import React, { createContext, useState, useContext, ReactNode, FC } from 'react';
import { ProductInterface,CartContextType } from '../types';

const defaultState: CartContextType = {
    data: null,
    setData: () => {},
    removeItem: () => {},
    open: false,
    setOpen: () => {},
};

export const CartContext = createContext<CartContextType>(defaultState);

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ProductInterface[] | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const removeItem = (removeId: number) => {
    const updatedData = data?.filter(item => item.id !== removeId) || [];
    setData(updatedData);
  };

  return (
    <CartContext.Provider value={{ data, setData, removeItem, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
