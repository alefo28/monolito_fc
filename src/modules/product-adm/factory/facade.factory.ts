import ProductAdmFacade from "../facade/product-admi.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory {

    static create() {
        const productRespository = new ProductRepository()
        const addProductUsecase = new AddProductUseCase(productRespository)
        const checkStockUsecase = new CheckStockUseCase(productRespository)

        const productFacade = new ProductAdmFacade({
            addUsecase: addProductUsecase,
            stockUsecase: checkStockUsecase
        })

        return productFacade
    }
} 