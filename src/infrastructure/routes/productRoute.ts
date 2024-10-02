import express, { Request, Response } from "express"
import AddProductUseCase from "../../modules/product-adm/usecase/add-product/add-product.usecase"
import ProductAdmRespository from "../../modules/product-adm/repository/product.repository"
import { addProductInputDto } from "../../modules/product-adm/usecase/add-product/add-product.dto"

export const productRoute = express.Router()

productRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new AddProductUseCase(new ProductAdmRespository())
    try {
        const productDto: addProductInputDto = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            stock: req.body.stock
        }

        const output = await usecase.execute(productDto)
        res.send(output)
    } catch (err) {
        res.status(500).send(err)
    }
})

