import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import FindProductUsecase from "./find-product.usecase"

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Description Product 1",
    salesPrice: 100
})

const MockRepository = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}

describe('Find product usecase unit test', () => {
    it("should find product", async () => {
        const repository = MockRepository()
        const usecase = new FindProductUsecase(repository)

        const output = await usecase.execute({ id: "1" })

        expect(repository.find).toHaveBeenCalled()

        expect(output.id).toBe("1")
        expect(output.name).toBe("Product 1")
        expect(output.description).toBe("Description Product 1")
        expect(output.salesPrice).toBe(100)

    })
})