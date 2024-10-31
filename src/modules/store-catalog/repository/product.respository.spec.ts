import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "./product.model"
import ProductRepository from "./product.respository"
import Id from "../../@shared/domain/value-object/id.value-object"
import Product from "../domain/product.entity"

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

    it("should find all products", async () => {
        const productRespository = new ProductRepository()

        ProductModel.create({
            id: "1",
            name: "Product",
            description: "Description Product",
            salesPrice: 100,
        })
        ProductModel.create({
            id: "2",
            name: "Product 2",
            description: "Description Product 2",
            salesPrice: 50,
        })

        const products = await productRespository.findAll()

        expect(products.length).toBe(2)
        expect(products[0].id.id).toBe("1")
        expect(products[0].name).toBe("Product")
        expect(products[0].description).toBe("Description Product")
        expect(products[0].salesPrice).toBe(100)

        expect(products[1].id.id).toBe("2")
        expect(products[1].name).toBe("Product 2")
        expect(products[1].description).toBe("Description Product 2")
        expect(products[1].salesPrice).toBe(50)

    })

    it("should find a product", async () => {
        const productRespository = new ProductRepository()

        ProductModel.create({
            id: "1",
            name: "Product",
            description: "Description Product",
            salesPrice: 100,
        })

        const product = await productRespository.find("1")

        expect(product.id.id).toBe("1")
        expect(product.name).toBe("Product")
        expect(product.description).toBe("Description Product")
        expect(product.salesPrice).toBe(100)
    })

    it("should update a product", async () => {
        await ProductModel.create({
            id: "p1",
            name: "Product 1",
            description: "Description 1",
            salesPrice: 100,
        });

        const productRepository = new ProductRepository();
        
        const updateProduct = new Product({
            id: new Id("p1"),
            name: "Product 2",
            description: "Description 2",
            salesPrice: 200,
        });

        await productRepository.update(updateProduct);

        const productDb = await ProductModel.findOne({
            where: { id: "p1" },
        });

        const product = productDb.toJSON();

        expect(product.id).toBe("p1");
        expect(product.name).toBe("Product 2");
        expect(product.description).toBe("Description 2");
        expect(product.salesPrice).toBe(200);
    });
})