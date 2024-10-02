import express, { Request, Response } from "express"
import GenerateInvoiceUsecase from "../../modules/invoice/usecase/generate-invoice/generate-invoice.usecase"
import InvoiceRepository from "../../modules/invoice/repository/invoice.repository"
import { GenerateInvoiceUseCaseInputDto } from "../../modules/invoice/usecase/generate-invoice/generate-invoice.dto"
import FindInvoiceUsecase from "../../modules/invoice/usecase/find-invoice/find-invoice.usecase"
import { FindInvoiceUseCaseInputDTO } from "../../modules/invoice/usecase/find-invoice/find-invoice.dto"

export const invoiceRoute = express.Router()

invoiceRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new GenerateInvoiceUsecase(new InvoiceRepository())

    try {
        const invoiceDto: GenerateInvoiceUseCaseInputDto = {
            name: req.body.name,
            document: req.body.document,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            items: req.body.items.map((item: { id: string; name: string; price: number }) => ({
                id: item.id,
                name: item.name,
                price: item.price,
            }))
        }

        const output = await usecase.execute(invoiceDto)
        res.send(output)
    } catch (err) {
        res.status(500).send(err)
    }
})

invoiceRoute.get("/:id", async (req: Request, res: Response) => {

    const usecase = new FindInvoiceUsecase(new InvoiceRepository());
    try {
        const invoiceDto: FindInvoiceUseCaseInputDTO = {
            id: req.params.id
        }

        const output = await usecase.execute(invoiceDto)
        res.send(output)
    } catch (err) {
        res.status(500).send(err)
    }

})