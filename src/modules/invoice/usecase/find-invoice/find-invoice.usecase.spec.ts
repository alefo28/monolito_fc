import Address from "../../../@shared/domain/value-object/address.value-object"
import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice"
import InvoiceItems from "../../domain/invoice-items"
import FindInvoiceUsecase from "./find-invoice.usecase"

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

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        generate: jest.fn()
    }
}

describe('Find Invoice unit tes', () => {

    it("should find a Invoice", async () => {
        const repository = MockRepository()
        const usecase = new FindInvoiceUsecase(repository)

        const input = {
            id: "1"
        }

        const output = await usecase.execute(input)

        expect(repository.find).toHaveBeenCalled()

        expect(output.id).toEqual(invoice.id.id)
        expect(output.name).toEqual(invoice.name)
        expect(output.document).toEqual(invoice.document)

        expect(output.address.city).toEqual(invoice.address.city)
        expect(output.address.street).toEqual(invoice.address.street)
        expect(output.address.complement).toEqual(invoice.address.complement)
        expect(output.address.state).toEqual(invoice.address.state)
        expect(output.address.zipCode).toEqual(invoice.address.zipCode)

        expect(output.items.length).toBe(2)
        expect(output.items[0].name).toEqual(invoice.items[0].name)
        expect(output.items[0].price).toEqual(invoice.items[0].price)

        expect(output.items[1].name).toEqual(invoice.items[1].name)
        expect(output.items[1].price).toEqual(invoice.items[1].price)

        expect(output.total).toEqual(invoice.total())


    })
})
