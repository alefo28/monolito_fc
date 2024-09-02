import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "./product.model"
import Product from "../domain/product.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import ProductRepository from "./product.repository"

describe('Product Repository test', () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {
                force: true
            }
        })

        await sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })


    it("should create a product", async () => {

        const productRespository = new ProductRepository()

        const props = {
            id: new Id("1"),
            name: "Product",
            description: "Description Product",
            purchasePrice: 100,
            stock: 10,

        }

        const product = new Product(props)

        await productRespository.add(product)

        const productDb = await ProductModel.findOne({
            where: {
                id: props.id.id
            }
        })

        expect(props.id.id).toEqual(productDb.id)
        expect(props.name).toEqual(productDb.name)
        expect(props.description).toEqual(productDb.description)
        expect(props.purchasePrice).toEqual(productDb.purchasePrice)
        expect(props.stock).toEqual(productDb.stock)

    })

    it("Should find a product", async () => {
        const productRespository = new ProductRepository()

        ProductModel.create({
            id: "1",
            name: "Product",
            description: "Description Product",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const product = await productRespository.find("1")

        expect(product.id.id).toEqual("1")
        expect(product.name).toEqual("Product")
        expect(product.description).toEqual("Description Product")
        expect(product.purchasePrice).toEqual(100)
        expect(product.stock).toEqual(10)

    })
})