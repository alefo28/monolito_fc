import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import FindClientUseCase from "./find-client.usecase"

describe('Find client usecase unit test', () => {

    const client = new Client({
        id: new Id("1"),
        name: "Client 1",
        email: "12e",
        address: "Aadresds 1"
    })

    const MockRespository = () => {
        return {
            add: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(client))
        }
    }

    it("should find a client", async () => {

        const repository = MockRespository()
        const usecase = new FindClientUseCase(repository)

        const input = {
            id: "1"
        }

        const output = await usecase.execute(input)

        expect(repository.find).toHaveBeenCalled()
        expect(output.id).toEqual(client.id.id)
        expect(output.name).toEqual(client.name)
        expect(output.email).toEqual(client.email)
        expect(output.address).toEqual(client.address)
        expect(output.createdAt).toEqual(client.createdAt)
        expect(output.updatedAt).toEqual(client.updatedAt)


    })

})