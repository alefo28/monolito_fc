import UsecaseInterface from "../../@shared/usecase/usecase.interface";
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./payment.facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {

    constructor(private processPaymentUsecase: UsecaseInterface) { }

    process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return this.processPaymentUsecase.execute(input)
    }
}