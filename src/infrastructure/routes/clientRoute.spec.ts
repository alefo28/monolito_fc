import { Sequelize } from "sequelize-typescript"
import { Umzug } from "umzug/lib/umzug"

import request from 'supertest'
import { app } from "../api/express"
import { ClientModel } from "../../modules/client-adm/repository/client.model"
import { migrator } from "../../migrations_test/config-migrations/migrator"

describe('Client test', () => {

    let sequelize: Sequelize

    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        })

        sequelize.addModels([ClientModel])
        migration = migrator(sequelize)
        await migration.up()
    })

    afterEach(async () => {
        if (!migration || !sequelize) {
            return
        }
        migration = migrator(sequelize)
        await migration.down()
        await sequelize.close()
    })

    it("should create client", async () => {

        const response = await request(app).post("/clients").send({
            name: "Client 1",
            email: "x@x.com",
            document: "1234-5678",
            street: "Rua 123",
            number: "99",
            complement: "Casa Verde",
            city: "Criciúma",
            state: "SC",
            zipCode: "88888-888",
        })

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Client 1")
        expect(response.body.email).toBe("x@x.com")
        expect(response.body.address.street).toBe("Rua 123")
        expect(response.body.address.number).toBe("99")
        expect(response.body.address.city).toBe("Criciúma")


    })
})
