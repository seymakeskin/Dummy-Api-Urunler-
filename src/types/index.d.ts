declare module "*.module.css";


export interface ProductInterface {
    id: number,
    productId?:number,
    title: string,
    description: string,
    price: number,
    discountPercentage:number,
    rating:number,
    stock:number,
    total?:number,
    quantity?:number,
    brand:string,
    category:string,
    thumbnail:string,
    images?: any,
}

interface ProductResponse {
    limit: number;
    products: Array<ProductInterface>;
    skip: number;
    total: number;
}

interface CartContextType {
  data: ProductInterface[] | null;
  setData: React.Dispatch<React.SetStateAction<ProductInterface[] | null>>;
  removeItem: (removeId: number) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

