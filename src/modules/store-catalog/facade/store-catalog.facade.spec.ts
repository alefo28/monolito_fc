import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../repository/product.model"
import StoreCatalogFacadeFactory from "../factory/facade.factory"

describe('Store Catalog facade test', () => {
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

    it("should find a product", async () => {
        const productFacade = StoreCatalogFacadeFactory.create()

        await ProductModel.create({
            id: "1",
            name: "Product",
            description: "Description Product",
            salesPrice: 100,
        })

        const result = await productFacade.find({ id: "1" })

        expect(result.id).toBe("1")
        expect(result.name).toBe("Product")
        expect(result.description).toBe("Description Product")
        expect(result.salesPrice).toBe(100)

    })


    it("should find all products", async () => {
        const productFacade = StoreCatalogFacadeFactory.create()

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

        const result = await productFacade.findAll()

        expect(result.products.length).toBe(2)
        expect(result.products[0].id).toBe("1")
        expect(result.products[0].name).toBe("Product")
        expect(result.products[0].description).toBe("Description Product")
        expect(result.products[0].salesPrice).toBe(100)

        expect(result.products[1].id).toBe("2")
        expect(result.products[1].name).toBe("Product 2")
        expect(result.products[1].description).toBe("Description Product 2")
        expect(result.products[1].salesPrice).toBe(50)

    })

    it("should update sales price", async () => {
        const facade = StoreCatalogFacadeFactory.create();
        await ProductModel.create({
          id: "1",
          name: "Product 1",
          description: "Description 1",
          salesPrice: 100,
        });

        const result = await facade.updateSalesPrice({ id: "1", salesPrice: 200 });
    
        expect(result.id).toBe("1");
        expect(result.name).toBe("Product 1");
        expect(result.description).toBe("Description 1");
        expect(result.salesPrice).toBe(200);
      });

})