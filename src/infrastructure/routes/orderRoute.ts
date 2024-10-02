import express, { Request, Response } from "express"
import { PlaceOrderInputDto } from "../../modules/checkout/usecase/place-order/place-order.dto"
import CheckoutFacadeFactory from "../../modules/checkout/factory/checkout.facade.factory"

export const orderRoute = express.Router()

orderRoute.post("/", async (req: Request, res: Response) => {
    const usecase = CheckoutFacadeFactory.create()


    try {
        const orderDto: PlaceOrderInputDto = {
            clientId: req.body.clientId,
            products: req.body.products.map((product: { productId: string }) => ({
                productId: product.productId
            }))
        }
        const output = await usecase.placeOrder(orderDto)

        res.send(output)
    } catch (err) {
        res.status(500).send(err)
    }
})