export interface IVacancyPost {
    name: string,
    phone: string,
    email: string,
    file: string,
    about: string
}

export interface IVacancyRequest extends IVacancyPost {
    id: string
}