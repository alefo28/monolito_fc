import { Sequelize } from "sequelize-typescript"
import { PlaceOrderInputDto } from "../usecase/place-order/place-order.dto"
import { Umzug } from "umzug"
import { migrator } from "../../../migrations_test/config-migrations/migrator"

import CheckoutFacadeFactory from "../factory/checkout.facade.factory"

import { OrderModel } from "../repository/order.model"
import { OrderProduct } from "../repository/orderProduct.model"
import { ProductModel as ProductOrderModel } from "../repository/product.model"
import { ClientModel as ClientOrderModel } from "../repository/client.model"

import { InvoiceModel } from "../../invoice/repository/invoice.model"
import { InvoiceItemsModel } from "../../invoice/repository/invoice-items.model"

import { TransactionModel } from "../../payment/repository/transaction.model"
import { ClientModel } from "../../client-adm/repository/client.model"
import { ProductModel as ProductStoreModel } from "../../store-catalog/repository/product.model"
import { ProductModel } from "../../product-adm/repository/product.model"

describe('Checkout facade test', () => {

    let sequelize: Sequelize
    let migration: Umzug<any>

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,

        })

        await sequelize.addModels([
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
        if (!migration || !sequelize) return

        migration = migrator(sequelize)
        await migration.down()
        await sequelize.close()
    })

    describe('Place an order', () => {


        it("should be approved", async () => {

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


            const input: PlaceOrderInputDto = {
                clientId: "c1",
                products: [{ productId: "p1" },]
            }

            const checkoutFacade = CheckoutFacadeFactory.create()

            const output = await checkoutFacade.placeOrder(input)

            console.log(output);


            expect(output.id).toBeDefined()

            expect(output.invoiceId).toBeDefined();
            expect(output.status).toBeDefined();
            expect(output.total).toEqual(100);
            expect(output.products).toBeDefined();
            expect(output.products.length).toEqual(1);
            expect(output.products[0].productId).toEqual("p1");

        })


    })



})
