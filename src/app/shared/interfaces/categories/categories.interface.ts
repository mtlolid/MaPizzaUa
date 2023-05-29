export interface ICategoriesPost{
    name: string,
    file: string,
    path: string
}

export interface ICategoriesRequest extends ICategoriesPost{
    id: string
}