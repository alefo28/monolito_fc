import PlaceOrderUsecase from "../usecase/place-order/place-order.usecase"
import CheckoutFacadeInterface, { PlaceOrderFacadeInputDto, PlaceOrderFacadeOutputDto } from "./checkout.facade.interface"

export interface UsecaseProps {
    placeOrderUsecase: PlaceOrderUsecase
}

export default class CheckoutFacade implements CheckoutFacadeInterface {

    private _placeOrderUsecase: PlaceOrderUsecase

    constructor(usecaseProps: UsecaseProps) {
        this._placeOrderUsecase = usecaseProps.placeOrderUsecase

    }
    async placeOrder(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto> {
        return await this._placeOrderUsecase.execute(input)
    }

}