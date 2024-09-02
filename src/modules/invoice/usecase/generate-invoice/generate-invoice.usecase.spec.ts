import GenerateInvoiceUsecase from "./generate-invoice.usecase"

const MockRepository = () => {
    return {
        find: jest.fn(),
        generate: jest.fn()
    }
}

describe('Generate Invoice Unit test', () => {
    it("Should generate a Invoice", async () => {
        const repository = MockRepository()
        const usecase = new GenerateInvoiceUsecase(repository)

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

        const output = await usecase.execute(input)

        expect(repository.generate).toHaveBeenCalled()

        expect(output.id).toBeDefined()
        expect(output.name).toEqual(input.name)
        expect(output.document).toEqual(input.document)

        expect(output.city).toEqual(input.city)
        expect(output.street).toEqual(input.street)
        expect(output.complement).toEqual(input.complement)
        expect(output.state).toEqual(input.state)
        expect(output.zipCode).toEqual(input.zipCode)

        expect(output.items.length).toBe(2)
        expect(output.items[0].id).toBeDefined()
        expect(output.items[0].name).toEqual(input.items[0].name)
        expect(output.items[0].price).toEqual(input.items[0].price)

        expect(output.items[1].id).toBeDefined()
        expect(output.items[1].name).toEqual(input.items[1].name)
        expect(output.items[1].price).toEqual(input.items[1].price)

        expect(output.total).toEqual(35)
    })
})