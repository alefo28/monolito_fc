import express, { Request, Response } from "express"
import AddClientUseCase from "../../modules/client-adm/usecase/add-client/add-client.usecase"
import ClientRepository from "../../modules/client-adm/repository/client.respository"
import { AddClientInputDto } from "../../modules/client-adm/usecase/add-client/add-client.usecase.dto"

export const clientRoute = express.Router()

clientRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new AddClientUseCase(new ClientRepository())

    try {
        const productRegistrationDto: AddClientInputDto = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            address: {
                street: req.body.street,
                number: req.body.number,
                complement: req.body.complement,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode,
            }
        }
        const output = await usecase.execute(productRegistrationDto)

        res.send(output)
    } catch (err) {
        res.status(500).send(err)
    }
})