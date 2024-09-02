import Id from "../../../@shared/domain/value-object/id.value-object";
import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { addProductInputDto, addProductOutputDto } from "./add-product.dto";

export default class AddProductUseCase implements UsecaseInterface {

    private _productRepository: ProductGateway

    constructor(productRespository: ProductGateway) {

        this._productRepository = productRespository

    }

    async execute(input: addProductInputDto): Promise<addProductOutputDto> {

        const props = {
            id: new Id(input.id),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock
        }

        const product = new Product(props)

        this._productRepository.add(product)

        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }

    }
}