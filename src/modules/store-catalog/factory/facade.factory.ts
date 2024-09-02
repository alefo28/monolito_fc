import StoreCatalogFacade from "../facade/store-catalog.facade"
import ProductRepository from "../repository/product.respository"
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase"
import FindProductUsecase from "../usecase/find-product/find-product.usecase"

export default class StoreCatalogFacadeFactory {

    static create(): StoreCatalogFacade {
        const productRespository = new ProductRepository()
        const findProductUsecase = new FindProductUsecase(productRespository)
        const findAllProductsUsecase = new FindAllProductsUsecase(productRespository)

        const storeCatalogFacade = new StoreCatalogFacade({
            findUsecase: findProductUsecase,
            findAllUsecase: findAllProductsUsecase
        })

        return storeCatalogFacade
    }
}