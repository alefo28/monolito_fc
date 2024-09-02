import UsecaseInterface from "../../../@shared/usecase/usecase.interface"
import ProductGateway from "../../gateway/product.gateway"
import { findProductInputDto, findProductOutputDto } from "./find-product-dto"

export default class FindProductUsecase implements UsecaseInterface {
    private _productRepository: ProductGateway

    constructor(productRespository: ProductGateway) {

        this._productRepository = productRespository

    }

    async execute(input: findProductInputDto): Promise<findProductOutputDto> {
        const product = await this._productRepository.find(input.id)
        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }
    }
}