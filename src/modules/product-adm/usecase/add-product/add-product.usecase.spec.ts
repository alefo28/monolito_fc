import AddProductUseCase from "./add-product.usecase"

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe('Add Product usecase unit test', () => {

    it("should add a product", async () => {

        //Repositorio
        const productRepository = MockRepository()

        //usecase
        const usecase = new AddProductUseCase(productRepository)

        //input
        const input = {
            id: "123",
            name: "Product 1",
            description: "Description",
            purchasePrice: 100,
            stock: 2
        }
        //output
        const output = await usecase.execute(input)

        expect(productRepository.add).toHaveBeenCalled()
        expect(output.id).toBeDefined()
        expect(output.name).toBe(input.name)
        expect(output.description).toBe(input.description)
        expect(output.purchasePrice).toBe(input.purchasePrice)
        expect(output.stock).toBe(input.stock)
        expect(output.createdAt).toBeDefined()
        expect(output.updatedAt).toBeDefined()

    })

})