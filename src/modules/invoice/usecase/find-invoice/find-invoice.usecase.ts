import Id from "../../../@shared/domain/value-object/id.value-object";
import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.dto";

export default class FindInvoiceUsecase implements UsecaseInterface {

    constructor(private _invoiceRepository: InvoiceGateway) { }
    
    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {

        const invoice = await this._invoiceRepository.find(input.id)
        const items = invoice.items.map((item: { id: Id; name: string; price: number; }) => ({
            id: item.id.id,
            name: item.name,
            price: item.price,
        }))

        const total = invoice.items.reduce((total: number, item: { id: Id; name: string; price: number; }) => total + item.price, 0)

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items,
            total,
            createdAt: invoice.createdAt,
        }
    }
}