import { InvoiceItemsModel } from "../modules/invoice/repository/invoice-items.model"
import { InvoiceModel } from "../modules/invoice/repository/invoice.model"
import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { Umzug } from "umzug"
import request from 'supertest'
import { migrator } from './config-migrations/migrator'
import { invoiceRoute } from "../infrastructure/routes/invoiceRoute"

describe('Invoice Test', () => {

    const app: Express = express()
    app.use(express.json())
    app.use("/invoice", invoiceRoute)

    let sequelize: Sequelize

    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        })

        sequelize.addModels([InvoiceModel, InvoiceItemsModel])
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

    it("should generate and find a Invoice", async () => {

        const response = await request(app).post("/invoice").send(input)

        expect(response.status).toBe(200);

        expect(response.body.id).toBeDefined()
        expect(response.body.name).toEqual(input.name)
        expect(response.body.document).toEqual(input.document)

        expect(response.body.city).toEqual(input.city)
        expect(response.body.street).toEqual(input.street)
        expect(response.body.complement).toEqual(input.complement)
        expect(response.body.state).toEqual(input.state)
        expect(response.body.zipCode).toEqual(input.zipCode)

        expect(response.body.items.length).toBe(2)
        expect(response.body.items[0].id).toBeDefined()
        expect(response.body.items[0].name).toEqual(input.items[0].name)
        expect(response.body.items[0].price).toEqual(input.items[0].price)

        expect(response.body.items[1].id).toBeDefined()
        expect(response.body.items[1].name).toEqual(input.items[1].name)
        expect(response.body.items[1].price).toEqual(input.items[1].price)

        expect(response.body.total).toEqual(35)

        const response2 = await request(app).get(`/invoice/${response.body.id}`)

        expect(response2.status).toBe(200);

        expect(response2.body.id).toBeDefined()
        expect(response2.body.name).toEqual(input.name)
        expect(response2.body.document).toEqual(input.document)

        expect(response2.body.address.city).toEqual(input.city)
        expect(response2.body.address.street).toEqual(input.street)
        expect(response2.body.address.complement).toEqual(input.complement)
        expect(response2.body.address.state).toEqual(input.state)
        expect(response2.body.address.zipCode).toEqual(input.zipCode)

        expect(response2.body.items.length).toBe(2)
        expect(response2.body.items[0].id).toBeDefined()
        expect(response2.body.items[0].name).toEqual(input.items[0].name)
        expect(response2.body.items[0].price).toEqual(input.items[0].price)

        expect(response2.body.items[1].id).toBeDefined()
        expect(response2.body.items[1].name).toEqual(input.items[1].name)
        expect(response2.body.items[1].price).toEqual(input.items[1].price)

        expect(response2.body.total).toEqual(35)
    })



})
