
export interface addProductInputDto {
    id?: string
    name: string
    description: string
    purchasePrice: number
    stock: number

}

export interface addProductOutputDto {
    id: string
    name: string
    description: string
    purchasePrice: number
    stock: number
    createdAt: Date
    updatedAt: Date

}