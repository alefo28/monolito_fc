export interface findAllStoreCatalogFacadeDto {
    products: {
        id: string
        name: string
        description: string
        salesPrice: number
    }[]
}

export interface findStoreCatalogFacadeInputDto {
    id: string
}

export interface findStoreCatalogFacadeOutputDto {
    id: string
    name: string
    description: string
    salesPrice: number
}


export default interface StoreCatalogFacadeInterface {

    find(id: findStoreCatalogFacadeInputDto): Promise<findStoreCatalogFacadeOutputDto>
    findAll(): Promise<findAllStoreCatalogFacadeDto>

}