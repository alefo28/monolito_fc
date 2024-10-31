import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";
import Id from "../../@shared/domain/value-object/id.value-object";

export default class ProductRepository implements ProductGateway {
    async update(product: Product): Promise<void> {
        try {
            await ProductModel.update(
                {
                    name: product.name,
                    description: product.description,
                    salesPrice: product.salesPrice,
                },
                {
                    where: {
                        id: product.id.id,
                    },
                }
            );
            } catch (error) {
                throw new Error("Product not found");
            }
    }
    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll()

        return products.map(product => new Product
            ({
                id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            })
        )
    }

    async find(id: string): Promise<Product> {
        const product = await ProductModel.findOne({ where: { id: id } })

        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        })
    }
}