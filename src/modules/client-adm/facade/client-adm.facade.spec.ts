import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "../repository/client.model"
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory"
import Address from "../../@shared/domain/value-object/address.value-object"

describe('Client Adm facade test', () => {
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

        await sequelize.addModels([ClientModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a client", async () => {
        const clientFacade = ClientAdmFacadeFactory.create()

        const input = {
            id: "1",
            name: "Client",
            email: "x@x.com",
            document: "1234-5678",
            address: new Address(
                {
                    street: "Rua 123",
                    number: "99",
                    complement: "Casa Verde",
                    city: "Criciúma",
                    state: "SC",
                    zipCode: "88888-888",
                })
        }

        await clientFacade.add(input)

        const client = await ClientModel.findOne({ where: { id: input.id } })
        expect(client.id).toBe(input.id)
        expect(client.name).toBe(input.name)
        expect(client.email).toBe(input.email)
        expect(client.document).toBe(input.document)
        expect(client.street).toBe(input.address.street)
    })


    it("should find a client", async () => {
        const clientFacade = ClientAdmFacadeFactory.create()
        const client = await ClientModel.create({
            id: "1",
            name: "Client",
            email: "x@x.com",
            document: "1234-5678",
            street: "Rua 123",
            number: "99",
            complement: "Casa Verde",
            city: "Criciúma",
            state: "SC",
            zipcode: "0000",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const input = {
            id: "1"
        }

        const output = await clientFacade.find(input)

        expect(output.id).toBe(client.id)
        expect(output.name).toBe(client.name)
        expect(output.email).toBe(client.email)
        expect(output.document).toBe(client.document)
        expect(output.address.street).toBe(client.street)
        expect(output.address.number).toBe(client.number)
        expect(output.address.complement).toBe(client.complement)
        expect(output.address.city).toBe(client.city)
        expect(output.address.state).toBe(client.state)
        expect(output.address.zipCode).toBe(client.zipcode)
    })
})