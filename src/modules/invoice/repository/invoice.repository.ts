import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceItems from "../domain/invoice-items";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceItemsModel } from "./invoice-items.model";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {

    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({
            where: { id },
            include: InvoiceItemsModel
        })

        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address({
                street: invoice.street,
                number: invoice.number,
                complement: invoice.complement,
                city: invoice.city,
                state: invoice.state,
                zipCode: invoice.zipCode,
            }),
            items: invoice.items.map(item => new InvoiceItems({
                id: new Id(item.id),
                name: item.name,
                price: item.price
            })),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        })
    }

    async generate(input: Invoice): Promise<void> {

        await InvoiceModel.create({
            id: input.id.id,
            name: input.name,
            document: input.document,
            street: input.address.street,
            number: input.address.number,
            complement: input.address.complement,
            city: input.address.city,
            state: input.address.state,
            zipCode: input.address.zipCode,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
            items: input.items.map(item => ({
                id: item.id.id, name: item.name, price: item.price
            }))
        }, {
            include: [InvoiceItemsModel]
        });

    }
}