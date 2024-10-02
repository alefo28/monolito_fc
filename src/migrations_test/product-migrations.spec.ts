import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { Umzug } from "umzug"
import request from 'supertest'
import { ProductModel as ProductAdmModel } from '../modules/product-adm/repository/product.model'
import { ProductModel as ProductStoreCatalogModel } from '../modules/store-catalog/repository/product.model'
import { migrator } from './config-migrations/migrator'
import { productRoute } from '../infrastructure/routes/productRoute'

describe('Products test', () => {

    const app: Express = express()
    app.use(express.json())
    app.use("/product", productRoute)

    let sequelize: Sequelize

    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        })

        sequelize.addModels([ProductAdmModel, ProductStoreCatalogModel])
        migration = migrator(sequelize)
        await migration.up()

    })

    afterEach(async () => {
        if (!migration || !sequelize) {
            return
        }
        migration = migrator(sequelize)
        await migration.down()
        await sequelize.close()
    })

    it("should create product-Adm", async () => {

        const response = await request(app).post("/product").send({
            id: "1",
            name: "DDD",
            description: "Domain Driven Design",
            purchasePrice: 25.90,
            stock: 5
        })

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("DDD")
        expect(response.body.description).toBe("Domain Driven Design")
        expect(response.body.stock).toBe(5)
        expect(response.body.purchasePrice).toBe(25.90)
    })


})
