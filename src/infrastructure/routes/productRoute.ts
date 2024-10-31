import express, { Request, Response } from "express"
import AddProductUseCase from "../../modules/product-adm/usecase/add-product/add-product.usecase"
import ProductAdmRespository from "../../modules/product-adm/repository/product.repository"
import { addProductInputDto } from "../../modules/product-adm/usecase/add-product/add-product.dto"
import UpdateSalesPriceUseCase from "../../modules/store-catalog/usecase/update-sales-price/update-sales-price.usecase"
import ProductRepository  from "../../modules/store-catalog/repository/product.respository"
import { UpdateSalesPriceInputDto } from "../../modules/store-catalog/usecase/update-sales-price/update-sales-price.dto"

export const productRoute = express.Router()

productRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new AddProductUseCase(new ProductAdmRespository())
    const usecaseStore = new UpdateSalesPriceUseCase(new ProductRepository())
    try {
        const productDto: addProductInputDto = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            stock: req.body.stock
        }

        const productStoreDto: UpdateSalesPriceInputDto = {
            id: req.body.id,
            salesPrice: req.body.purchasePrice
        };
        const output = await usecase.execute(productDto)
        await usecaseStore.execute(productStoreDto)
        
        res.send(output)
    } catch (err) {
        console.log(err);
        
        res.status(500).send(err)
    }
})

