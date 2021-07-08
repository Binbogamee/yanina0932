export interface Product {
    id?: number,
    name: string,
    code: string,
    price: number,
    manufacturer? : string,
    category: string,
    weight: number,
    quantity: number
}

export interface Category {
    name: string,
    id?: number
}