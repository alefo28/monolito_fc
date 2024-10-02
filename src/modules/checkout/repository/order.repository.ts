import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { ClientModel } from "./client.model";
import { OrderModel } from "./order.model";
import { ProductModel } from "./product.model";

export default class OrderRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {
        const createdOrder = await OrderModel.create({
            id: order.id.id,
            clientId: order.client.id.id,
            status: order.status,
        });


        await createdOrder.$set('products', order.products.map(product => product.id.id));
    }

    async findOrder(id: string): Promise<Order> {
        const orderRecord = await OrderModel.findOne({
            where: { id },
            include: [ClientModel, ProductModel]
        })

        return new Order({
            id: new Id(orderRecord.id),
            client: new Client({
                id: new Id(orderRecord.client.id),
                name: orderRecord.client.name,
                email: orderRecord.client.email,
                document: orderRecord.client.document,
                address: new Address({
                    street: orderRecord.client.street,
                    number: orderRecord.client.number,
                    complement: orderRecord.client.complement,
                    city: orderRecord.client.city,
                    state: orderRecord.client.state,
                    zipCode: orderRecord.client.zipcode,
                })
            }),
            products: orderRecord.products.map(item => new Product({
                id: new Id(item.id),
                name: item.name,
                description: item.description,
                salesPrice: item.salesPrice
            })),
            status: orderRecord.status,
        });
    }

}