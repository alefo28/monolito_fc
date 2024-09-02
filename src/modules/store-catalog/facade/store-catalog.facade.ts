import UsecaseInterface from "../../@shared/usecase/usecase.interface"
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase"
import FindProductUsecase from "../usecase/find-product/find-product.usecase"
import StoreCatalogFacadeInterface, { findAllStoreCatalogFacadeDto, findStoreCatalogFacadeInputDto, findStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface"

export interface UsecaseProps {
    findUsecase: FindProductUsecase
    findAllUsecase: FindAllProductsUsecase
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {

    private _findUsecase: FindProductUsecase
    private _findAllUsecase: FindAllProductsUsecase

    constructor(usecaseProps: UsecaseProps) {
        this._findUsecase = usecaseProps.findUsecase
        this._findAllUsecase = usecaseProps.findAllUsecase
    }

    async find(id: findStoreCatalogFacadeInputDto): Promise<findStoreCatalogFacadeOutputDto> {
        return await this._findUsecase.execute(id)
    }

    async findAll(): Promise<findAllStoreCatalogFacadeDto> {
        return await this._findAllUsecase.execute()
    }

}