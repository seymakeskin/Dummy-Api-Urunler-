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