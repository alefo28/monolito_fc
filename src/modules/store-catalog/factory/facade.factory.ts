import StoreCatalogFacade from "../facade/store-catalog.facade"
import ProductRepository from "../repository/product.respository"
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase"
import FindProductUsecase from "../usecase/find-product/find-product.usecase"
import UpdateSalesPriceUseCase from "../usecase/update-sales-price/update-sales-price.usecase"

export default class StoreCatalogFacadeFactory {

    static create(): StoreCatalogFacade {
        const productRespository = new ProductRepository()
        const findProductUsecase = new FindProductUsecase(productRespository)
        const findAllProductsUsecase = new FindAllProductsUsecase(productRespository)
        const updateSalesPriceUsecase = new UpdateSalesPriceUseCase(productRespository)

        const storeCatalogFacade = new StoreCatalogFacade({
            findUsecase: findProductUsecase,
            findAllUsecase: findAllProductsUsecase,
            updateSalesPriceUsecase: updateSalesPriceUsecase
        })

        return storeCatalogFacade
    }
}