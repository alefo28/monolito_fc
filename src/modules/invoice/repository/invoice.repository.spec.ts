import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "./invoice.model"
import { InvoiceItemsModel } from "./invoice-items.model"
import InvoiceRepository from "./invoice.repository"
import InvoiceItems from "../domain/invoice-items"
import Invoice from "../domain/invoice"
import Id from "../../@shared/domain/value-object/id.value-object"
import Address from "../../@shared/domain/value-object/address.value-object"

describe('Invoice Repository test', () => {
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

        await sequelize.addModels([InvoiceModel, InvoiceItemsModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should Find a Invoice", async () => {
        const invoice = await InvoiceModel.create({
            id: '123',
            name: 'Name',
            document: 'Document',
            street: '123 ',
            number: '456',
            complement: 'Apt ',
            city: 'City',
            state: 'State',
            zipCode: '12345',
            createdAt: new Date(),
            updatedAt: new Date(),
            items: [
                { id: '1', name: 'Item 1', price: 100 },
                { id: '2', name: 'Item 2', price: 200 }
            ]
        }, {
            include: [InvoiceItemsModel]
        });

        const respository = new InvoiceRepository()

        const result = await respository.find("123")

        expect(result.id.id).toEqual(invoice.id)
        expect(result.name).toEqual(invoice.name)
        expect(result.document).toEqual(invoice.document)

        expect(result.address.city).toEqual(invoice.city)
        expect(result.address.street).toEqual(invoice.street)
        expect(result.address.complement).toEqual(invoice.complement)
        expect(result.address.state).toEqual(invoice.state)
        expect(result.address.zipCode).toEqual(invoice.zipCode)

        expect(result.items.length).toBe(2)
        expect(result.items[0].name).toEqual(invoice.items[0].name)
        expect(result.items[0].price).toEqual(invoice.items[0].price)

        expect(result.items[1].name).toEqual(invoice.items[1].name)
        expect(result.items[1].price).toEqual(invoice.items[1].price)
    })

    it("should generate a Invoice", async () => {

        const respository = new InvoiceRepository()

        const invoiceItem = new InvoiceItems({
            name: "Item 1",
            price: 15
        })

        const invoiceItem2 = new InvoiceItems({
            name: "Item 2",
            price: 20
        })

        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice 1",
            document: "Document 1",
            address: new Address({
                street: "Street",
                number: "A12",
                complement: "Complent",
                city: "City",
                state: "State",
                zipCode: "Zipcote",
            }),
            items: [invoiceItem, invoiceItem2],
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        await respository.generate(invoice)

        const result = await InvoiceModel.findOne({
            where: { id: invoice.id.id },
            include: InvoiceItemsModel
        })

        expect(result.id).toEqual(invoice.id.id)
        expect(result.name).toEqual(invoice.name)
        expect(result.document).toEqual(invoice.document)

        expect(result.city).toEqual(invoice.address.city)
        expect(result.street).toEqual(invoice.address.street)
        expect(result.complement).toEqual(invoice.address.complement)
        expect(result.state).toEqual(invoice.address.state)
        expect(result.zipCode).toEqual(invoice.address.zipCode)

        expect(result.items.length).toBe(2)
        expect(result.items[0].name).toEqual(invoice.items[0].name)
        expect(result.items[0].price).toEqual(invoice.items[0].price)

        expect(result.items[1].name).toEqual(invoice.items[1].name)
        expect(result.items[1].price).toEqual(invoice.items[1].price)
    })
})
