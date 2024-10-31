import { Sequelize } from 'sequelize-typescript'
import { Umzug } from "umzug"
import request from 'supertest'

import { ClientModel } from '../../modules/client-adm/repository/client.model'
import { ClientModel as ClientOrderModel } from '../../modules/checkout/repository/client.model'

import { ProductModel } from '../../modules/product-adm/repository/product.model'
import { ProductModel as ProductStoreModel } from '../../modules/store-catalog/repository/product.model'
import { ProductModel as ProductOrderModel } from '../../modules/checkout/repository/product.model'

import { TransactionModel } from '../../modules/payment/repository/transaction.model'
import { InvoiceItemsModel } from '../../modules/invoice/repository/invoice-items.model'
import { InvoiceModel } from '../../modules/invoice/repository/invoice.model'
import { OrderProduct } from '../../modules/checkout/repository/orderProduct.model'
import { OrderModel } from '../../modules/checkout/repository/order.model'
import { app } from '../api/express'
import { migrator } from '../../migrations_test/config-migrations/migrator'


describe('Order test', () => {

    let sequelize: Sequelize

    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        })

        sequelize.addModels([
            ClientModel,
            ClientOrderModel,
            OrderModel,
            ProductOrderModel,
            ProductModel,
            ProductStoreModel,
            OrderProduct,
            InvoiceModel,
            InvoiceItemsModel,
            TransactionModel])
        migration = migrator(sequelize)
        await migration.up()
        await sequelize.sync();

    })

    afterEach(async () => {
        if (!migration || !sequelize) {
            return
        }
        migration = migrator(sequelize)
        await migration.down()
        await sequelize.close()
    })

    it("should create order", async () => {

        const client = await ClientModel.create({
            id: 'c1',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            document: "ABC123",
            street: '456 Elm St',
            number: '789',
            complement: 'Suite 10',
            city: 'Los Angeles',
            state: 'CA',
            zipcode: '90001',
            createdAt: new Date(),
            updatedAt: new Date()
        });


        const product1 = await ProductModel.create({
            id: "p1",
            name: "Product",
            description: "Description Product",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        await ProductStoreModel.update({
            salesPrice: 100,
        }, {
            where: {
                id: "p1"
            }
        })

        const response = await request(app).post("/checkout").send({
            clientId: "c1",
            products: [{ productId: "p1" },]
        })
        expect(response.status).toBe(200);

        expect(response.body.id).toBeDefined()

        expect(response.body.invoiceId).toBeDefined();
        expect(response.body.status).toBeDefined();
        expect(response.body.total).toEqual(100);
        expect(response.body.products).toBeDefined();
        expect(response.body.products.length).toEqual(1);
        expect(response.body.products[0].productId).toEqual("p1");

    })


})