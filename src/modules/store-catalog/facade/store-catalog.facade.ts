import UsecaseInterface from "../../@shared/usecase/usecase.interface"
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase"
import FindProductUsecase from "../usecase/find-product/find-product.usecase"
import UpdateSalesPriceUseCase from "../usecase/update-sales-price/update-sales-price.usecase"
import StoreCatalogFacadeInterface, { findAllStoreCatalogFacadeDto, findStoreCatalogFacadeInputDto, findStoreCatalogFacadeOutputDto, UpdateSalesPriceFacadeInputDto, UpdateSalesPriceFacadeOutputDto } from "./store-catalog.facade.interface"

export interface UsecaseProps {
    findUsecase: FindProductUsecase
    findAllUsecase: FindAllProductsUsecase
    updateSalesPriceUsecase: UpdateSalesPriceUseCase
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {

    private _findUsecase: FindProductUsecase
    private _findAllUsecase: FindAllProductsUsecase
    private _updateSalesPriceUsecase: UpdateSalesPriceUseCase

    constructor(usecaseProps: UsecaseProps) {
        this._findUsecase = usecaseProps.findUsecase
        this._findAllUsecase = usecaseProps.findAllUsecase
        this._updateSalesPriceUsecase= usecaseProps.updateSalesPriceUsecase
    }

    async find(id: findStoreCatalogFacadeInputDto): Promise<findStoreCatalogFacadeOutputDto> {
        return await this._findUsecase.execute(id)
    }

    async findAll(): Promise<findAllStoreCatalogFacadeDto> {
        return await this._findAllUsecase.execute()
    }

    async updateSalesPrice(input: UpdateSalesPriceFacadeInputDto ): Promise<UpdateSalesPriceFacadeOutputDto> {
        return await this._updateSalesPriceUsecase.execute(input);
      }

}