import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "../repository/invoice.model"
import { InvoiceItemsModel } from "../repository/invoice-items.model"
import InvoiceFacadeFactory from "../factory/invoice.facade.factory"

describe('Invoice facade Test', () => {

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

    it("Should find a invoice", async () => {
        const invoiceFacade = InvoiceFacadeFactory.create()
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

        const input = {
            id: "123"
        }

        const output = await invoiceFacade.find(input)

        expect(output.id).toEqual(invoice.id)
        expect(output.name).toEqual(invoice.name)
        expect(output.document).toEqual(invoice.document)

        expect(output.address.city).toEqual(invoice.city)
        expect(output.address.street).toEqual(invoice.street)
        expect(output.address.complement).toEqual(invoice.complement)
        expect(output.address.state).toEqual(invoice.state)
        expect(output.address.zipCode).toEqual(invoice.zipCode)

        expect(output.items.length).toBe(2)
        expect(output.items[0].name).toEqual(invoice.items[0].name)
        expect(output.items[0].price).toEqual(invoice.items[0].price)

        expect(output.items[1].name).toEqual(invoice.items[1].name)
        expect(output.items[1].price).toEqual(invoice.items[1].price)
    })

    it("should generate a invoice", async () => {
        const invoiceFacade = InvoiceFacadeFactory.create()

        const input = {
            name: "Invoice 1",
            document: "Document 1",
            street: "Street",
            number: "A12",
            complement: "Complent",
            city: "City",
            state: "State",
            zipCode: "Zipcote",
            items: [{
                id: "1",
                name: "Item 1",
                price: 15
            }, {
                id: "2",
                name: "Item 2",
                price: 20
            }],
        }

        const output = await invoiceFacade.generate(input)

        const invoice = await InvoiceModel.findOne({
            where: { name: input.name },
            include: InvoiceItemsModel
        })


        expect(output.id).toEqual(output.id)
        expect(output.name).toEqual(invoice.name)
        expect(output.document).toEqual(invoice.document)

        expect(output.city).toEqual(invoice.city)
        expect(output.street).toEqual(invoice.street)
        expect(output.complement).toEqual(invoice.complement)
        expect(output.state).toEqual(invoice.state)
        expect(output.zipCode).toEqual(invoice.zipCode)

        expect(output.items.length).toBe(2)
        expect(output.items[0].id).toEqual(invoice.items[0].id)
        expect(output.items[0].name).toEqual(invoice.items[0].name)
        expect(output.items[0].price).toEqual(invoice.items[0].price)

        expect(output.items[1].id).toEqual(invoice.items[1].id)
        expect(output.items[1].name).toEqual(invoice.items[1].name)
        expect(output.items[1].price).toEqual(invoice.items[1].price)
        expect(output.total).toBe(35)


    })

})