import { IProductsRequest } from "../products/products.intefrace";

export interface IOrderPost {
    products: Array<IProductsRequest>,
    user: string,
    date: string,
    typeOfUser: string
}

export interface IOrderRequest extends IOrderPost {
    id: string
}