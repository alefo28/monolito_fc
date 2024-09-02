import UsecaseInterface from "../../../@shared/usecase/usecase.interface"
import ProductGateway from "../../gateway/product.gateway"
import { checkStockProductInputDto, checkStockProductOutputDto } from "./check-stock.dto"

export default class CheckStockUseCase implements UsecaseInterface {

    private _productRepository: ProductGateway

    constructor(productRespository: ProductGateway) {

        this._productRepository = productRespository

    }

    async execute(input: checkStockProductInputDto): Promise<checkStockProductOutputDto> {

        const product = await this._productRepository.find(input.productId)

        return {
            productId: product.id.id,
            stock: product.stock
        }
    }
}