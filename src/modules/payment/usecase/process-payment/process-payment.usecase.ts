import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/transaction.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUsecase implements UsecaseInterface {

    private _transactionRepository: PaymentGateway

    constructor(transactionRespository: PaymentGateway) {

        this._transactionRepository = transactionRespository

    }
    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {

        const transaction = new Transaction({
            amount: input.amount,
            orderId: input.orderId
        })

        transaction.process()

        const persistTransaction = await this._transactionRepository.save(transaction)

        return {
            transactionId: persistTransaction.id.id,
            orderId: persistTransaction.orderId,
            amount: persistTransaction.amount,
            status: persistTransaction.status,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt
        }

    }

}