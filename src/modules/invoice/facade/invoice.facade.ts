import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase"
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase"
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto, } from "./invoice.facade.interface"

export interface UsecaseProps {
    generateUsecase: GenerateInvoiceUsecase
    findUsecase: FindInvoiceUsecase
}

export default class InvoiceFacade implements InvoiceFacadeInterface {

    private _generateUsecase: GenerateInvoiceUsecase
    private _findUsecase: FindInvoiceUsecase

    constructor(usecaseProps: UsecaseProps) {
        this._generateUsecase = usecaseProps.generateUsecase
        this._findUsecase = usecaseProps.findUsecase
    }
    async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return await this._findUsecase.execute(input)
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this._generateUsecase.execute(input)
    }
}