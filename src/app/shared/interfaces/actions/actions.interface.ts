export interface IActionsPost {
    header: string,
    text: string,
    file: string,
}

export interface IActionsRequest extends IActionsPost {
    id: string
}