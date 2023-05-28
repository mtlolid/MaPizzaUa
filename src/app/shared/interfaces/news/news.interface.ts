export interface INewsPost {
    header: string,
    text: string,
    file: string,
}

export interface INewsRequest extends INewsPost {
    id: string
}