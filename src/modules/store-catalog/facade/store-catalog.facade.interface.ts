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

export interface UpdateSalesPriceFacadeInputDto {
    id: string;
    salesPrice: number;
}

export interface UpdateSalesPriceFacadeOutputDto {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}

export default interface StoreCatalogFacadeInterface {

    find(id: findStoreCatalogFacadeInputDto): Promise<findStoreCatalogFacadeOutputDto>
    findAll(): Promise<findAllStoreCatalogFacadeDto>
    updateSalesPrice(product: UpdateSalesPriceFacadeInputDto): Promise<UpdateSalesPriceFacadeOutputDto>;


}