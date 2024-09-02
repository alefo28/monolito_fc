import UsecaseInterface from "../../../@shared/usecase/usecase.interface"
import ProductGateway from "../../gateway/product.gateway"
import { FindAllProductDto } from "./find-all-products.dto"

export default class FindAllProductsUsecase implements UsecaseInterface {
    private _productRepository: ProductGateway

    constructor(productRespository: ProductGateway) {

        this._productRepository = productRespository

    }

    async execute(): Promise<FindAllProductDto> {
        const products = await this._productRepository.findAll()
        return {
            products: products.map(product => ({
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            }))
        }
    }
}