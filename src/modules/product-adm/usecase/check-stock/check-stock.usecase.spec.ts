import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import CheckStockUseCase from "./check-stock.usecase"

const product = new Product({
    id: new Id("1"),
    name: "product",
    description: "product description",
    purchasePrice: 100,
    stock: 10
})

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}

describe('Checkstock usecase unit test', () => {

    it("should get stock of a product", async () => {

        const repository = MockRepository()
        const usecase = new CheckStockUseCase(repository)

        const input = {
            productId: "1"
        }
        const output = await usecase.execute(input)

        expect(repository.find).toHaveBeenCalled()
        expect(output.productId).toBe("1")
        expect(output.stock).toBe(10)

    })

})
