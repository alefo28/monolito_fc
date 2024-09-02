import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "../repository/client.model"
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory"

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
            address: "Adress",
        }

        await clientFacade.add(input)

        const client = await ClientModel.findOne({ where: { id: input.id } })
        expect(client.id).toBe(input.id)
        expect(client.name).toBe(input.name)
        expect(client.email).toBe(input.email)
        expect(client.address).toBe(input.address)
    })


    it("should find a client", async () => {
        const clientFacade = ClientAdmFacadeFactory.create()
        const client = await ClientModel.create({
            id: "1",
            name: "Client",
            email: "x@x.com",
            address: "Adress",
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const input = {
            id: "1"
        }

        const output = await clientFacade.find(input)

        expect(output.id).toBe(client.id)
        expect(output.name).toBe(client.name)
        expect(output.email).toBe(client.email)
        expect(output.address).toBe(client.address)
    })
})