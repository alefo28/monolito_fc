import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "./client.model"
import { OrderModel } from "./order.model"
import { ProductModel } from "./product.model"
import OrderRepository from "./order.repository"
import Order from "../domain/order.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import Client from "../domain/client.entity"
import Address from "../../@shared/domain/value-object/address.value-object"
import Product from "../domain/product.entity"
import { OrderProduct } from "./orderProduct.model"

describe('Order Repository test', () => {
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

        await sequelize.addModels([ClientModel, OrderModel, ProductModel, OrderProduct])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should find a order", async () => {

        const order = await OrderModel.create({
            id: '123',
            client: {
                id: '123',
                name: 'John Doe',
                document: "Abc123",
                email: 'john.doe@example.com',
                street: '123 Main St',
                number: '456',
                complement: 'Apt 789',
                city: 'New York',
                state: 'NY',
                zipcode: '10001',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            products: [
                {
                    id: '1',
                    name: 'Product 1',
                    description: "Description Product 1",
                    salesPrice: 29.99
                },
                {
                    id: '2',
                    name: 'Product 2',
                    description: "Description Product 2",
                    salesPrice: 49.99
                }
            ],
            status: 'pending'
        }, {
            include: [ClientModel, ProductModel]
        });

        const respository = new OrderRepository()

        const result = await respository.findOrder("123")

        expect(result.id.id).toEqual(order.id);

        expect(result.client.id.id).toEqual(order.client.id);
        expect(result.client.name).toEqual(order.client.name);
        expect(result.client.email).toEqual(order.client.email);
        expect(result.client.document).toEqual(order.client.document);

        expect(result.client.address.street).toEqual(order.client.street);
        expect(result.client.address.number).toEqual(order.client.number);
        expect(result.client.address.complement).toEqual(order.client.complement);
        expect(result.client.address.city).toEqual(order.client.city);
        expect(result.client.address.state).toEqual(order.client.state);
        expect(result.client.address.zipCode).toEqual(order.client.zipcode);

        expect(result.status).toEqual(order.status);

        expect(result.products.length).toBe(2);

        expect(result.products[0].id.id).toEqual(order.products[0].id);
        expect(result.products[0].name).toEqual(order.products[0].name);
        expect(result.products[0].description).toEqual(order.products[0].description);
        expect(result.products[0].salesPrice).toEqual(order.products[0].salesPrice);

        expect(result.products[1].id.id).toEqual(order.products[1].id);
        expect(result.products[1].name).toEqual(order.products[1].name);
        expect(result.products[1].description).toEqual(order.products[1].description);

        expect(result.products[1].salesPrice).toEqual(order.products[1].salesPrice);


    })

    it("should add a order", async () => {

        const client = await ClientModel.create({
            id: 'c1',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            document: "Abc123",
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
            id: 'p1',
            name: 'Gadget',
            description: 'A useful gadget',
            salesPrice: 99.99
        });

        const product2 = await ProductModel.create({
            id: 'p2',
            name: 'Widget',
            description: 'An essential widget',
            salesPrice: 49.99
        });

        const order = new Order({
            id: new Id('123'),
            client: new Client({
                id: new Id(client.id),
                name: client.name,
                email: client.email,
                document: client.document,
                address: new Address({
                    street: client.street,
                    number: client.number,
                    complement: client.complement,
                    city: client.city,
                    state: client.state,
                    zipCode: client.zipcode,
                })
            }),
            products: [
                new Product({
                    id: new Id(product1.id),
                    name: product1.name,
                    description: product1.description,
                    salesPrice: product1.salesPrice
                }),
                new Product({
                    id: new Id(product2.id),
                    name: product2.name,
                    description: product2.description,
                    salesPrice: product2.salesPrice
                })
            ],
            status: 'processing',
        });

        const respository = new OrderRepository()

        await respository.addOrder(order)

        const result = await OrderModel.findOne({
            where: { id: "123" },
            include: [ClientModel, ProductModel]
        })

        expect(result.id).toEqual(order.id.id);

        expect(result.client.id).toEqual(order.client.id.id);
        expect(result.client.name).toEqual(order.client.name);
        expect(result.client.email).toEqual(order.client.email);
        expect(result.client.document).toEqual(order.client.document);


        expect(result.client.street).toEqual(order.client.address.street);
        expect(result.client.number).toEqual(order.client.address.number);
        expect(result.client.complement).toEqual(order.client.address.complement);
        expect(result.client.city).toEqual(order.client.address.city);
        expect(result.client.state).toEqual(order.client.address.state);
        expect(result.client.zipcode).toEqual(order.client.address.zipCode);

        expect(result.status).toEqual(order.status);

        expect(result.products.length).toBe(2);

        expect(result.products[0].id).toEqual(order.products[0].id.id);
        expect(result.products[0].name).toEqual(order.products[0].name);
        expect(result.products[0].description).toEqual(order.products[0].description);
        expect(result.products[0].salesPrice).toEqual(order.products[0].salesPrice);

        expect(result.products[1].id).toEqual(order.products[1].id.id);
        expect(result.products[1].name).toEqual(order.products[1].name);
        expect(result.products[1].description).toEqual(order.products[1].description);
        expect(result.products[1].salesPrice).toEqual(order.products[1].salesPrice);


    })
})
