import AddClientUseCase from "./add-client.usecase"

describe('Add client usecase unit test', () => {
    const MockRespository = () => {
        return {
            add: jest.fn(),
            find: jest.fn()
        }
    }

    it("should add a client", async () => {

        const repository = MockRespository()
        const usecase = new AddClientUseCase(repository)

        const input = {
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1"
        }

        const output = await usecase.execute(input)

        expect(repository.add).toHaveBeenCalled()
        expect(output.id).toBeDefined()
        expect(output.name).toEqual(input.name)
        expect(output.email).toEqual(input.email)
        expect(output.address).toEqual(input.address)

    })

})