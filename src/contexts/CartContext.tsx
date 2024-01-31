import { createContext, useState, useContext } from 'react';
export interface  SlideOverProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export const CartContext = createContext<any>(undefined);

{/* <SlideOverProps | undefined>  ??  hata veriyor*/}


