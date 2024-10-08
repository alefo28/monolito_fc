import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory"
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory"
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory"
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory"
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory"
import CheckoutFacade from "../facade/checkout.facade"
import OrderRepository from "../repository/order.repository"
import PlaceOrderUsecase from "../usecase/place-order/place-order.usecase"

export default class CheckoutFacadeFactory {
    static create() {


        const orderRepository = new OrderRepository()


        const placeOrderUsecase = new PlaceOrderUsecase(
            ClientAdmFacadeFactory.create(),
            ProductAdmFacadeFactory.create(),
            StoreCatalogFacadeFactory.create(),
            PaymentFacadeFactory.create(),
            InvoiceFacadeFactory.create(),
            orderRepository
        )

        const checkoutFacade = new CheckoutFacade({
            placeOrderUsecase: placeOrderUsecase,
        })

        return checkoutFacade
    }
}