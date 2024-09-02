import Id from "../../../@shared/domain/value-object/id.value-object"
import Transaction from "../../domain/transaction"
import ProcessPaymentUsecase from "./process-payment.usecase"

const transaction = new Transaction({
    id: new Id("1"),
    amount: 100,
    orderId: "1",
    status: "approved"
})

const MockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction))
    }
}

const transaction2 = new Transaction({
    id: new Id("1"),
    amount: 50,
    orderId: "1",
    status: "declined"
})

const MockRepositoryDeclined = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction2))
    }
}

describe('Process Payment usecase unit test', () => {
    it("Should approve a transaction", async () => {
        const paymentRepository = MockRepository()
        const usecase = new ProcessPaymentUsecase(paymentRepository)

        const input = {
            orderId: "1",
            amount: 100
        }

        const result = await usecase.execute(input)

        expect(paymentRepository.save).toHaveBeenCalled()
        expect(result.transactionId).toEqual(transaction.id.id)
        expect(result.status).toEqual("approved")
        expect(result.amount).toEqual(100)
        expect(result.orderId).toEqual("1")
        expect(result.createdAt).toEqual(transaction.createdAt)
        expect(result.updatedAt).toEqual(transaction.updatedAt)

    })

    it("should decline a transaction", async () => {
        const paymentRepository = MockRepositoryDeclined()
        const usecase = new ProcessPaymentUsecase(paymentRepository)

        const input = {
            orderId: "1",
            amount: 50
        }

        const result = await usecase.execute(input)

        expect(paymentRepository.save).toHaveBeenCalled()
        expect(result.transactionId).toEqual(transaction.id.id)
        expect(result.status).toEqual("declined")
        expect(result.amount).toEqual(50)
        expect(result.orderId).toEqual("1")
        //expect(result.createdAt).toEqual(transaction.createdAt)
        //expect(result.updatedAt).toEqual(transaction.updatedAt)
    })

})