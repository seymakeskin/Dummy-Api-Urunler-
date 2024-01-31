import { createContext} from 'react';
export interface  SlideOverProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    // { <SlideOverProps | undefined>  ??  hata veriyor }
}

export const CartContext = createContext<any>(undefined);




