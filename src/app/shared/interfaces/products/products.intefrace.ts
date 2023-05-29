import { ICategoriesRequest } from "../categories/categories.interface";

export interface IProductsPost {
    name: string,
    category: string,
    subCategory: Array<string> | null,
    text: string,
    mass: number,
    price: number,
    file: string,
    count: number,
    display: string
}

export interface IProductsRequest extends IProductsPost {
    id: string
}