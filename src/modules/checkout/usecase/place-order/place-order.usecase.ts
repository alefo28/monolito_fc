
import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/payment.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUsecase implements UsecaseInterface {

    private _clientFacade: ClientAdmFacadeInterface
    private _productFacade: ProductAdmFacadeInterface
    private _catalogFacade: StoreCatalogFacadeInterface
    private _paymentFacade: PaymentFacadeInterface
    private _invoiceFacade: InvoiceFacadeInterface
    private _repository: CheckoutGateway

    constructor(
        clientFacade: ClientAdmFacadeInterface,
        productFacade: ProductAdmFacadeInterface,
        catalogFacade: StoreCatalogFacadeInterface,
        paymentFacade: PaymentFacadeInterface,
        invoiceFacade: InvoiceFacadeInterface,
        repository: CheckoutGateway
    ) {
        this._clientFacade = clientFacade
        this._productFacade = productFacade
        this._catalogFacade = catalogFacade
        this._paymentFacade = paymentFacade
        this._invoiceFacade = invoiceFacade
        this._repository = repository
    }


    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {

        //buscar o cliente , caso nao encontre -> client not found
        const client = await this._clientFacade.find({ id: input.clientId })
        if (!client) {
            throw new Error("Client not fount")
        }

        //Validar productos //Funcao a parte
        await this.validateProducts(input)

        //recuperar os produtos
        const products = await Promise.all(input.products.map(p => this.getProduct(p.productId)))

        //criar o objeto do cliente
        const myClient = new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            document: client.document,
            address: new Address(
                {
                    street: client.address.street,
                    number: client.address.number,
                    complement: client.address.complement,
                    city: client.address.city,
                    state: client.address.state,
                    zipCode: client.address.zipCode,
                }
            )
        })

        //criar o objeto da ordem(client, products)
        const order = new Order({
            client: myClient,
            products: products,
        })

        //processPayment -> paymentFacade.process(orderId, amount)
        const payment = await this._paymentFacade.process({
            orderId: order.id.id,
            amount: order.total
        })

        //caso pagamento seja aprovado. ->gerar Invoice
        const invoice = payment.status === "approved" ?
            await this._invoiceFacade.generate({
                name: client.name,
                document: client.document,
                street: client.address.street,
                number: client.address.number,
                complement: client.address.complement,
                city: client.address.city,
                state: client.address.state,
                zipCode: client.address.zipCode,
                items: products.map(p => {
                    return {
                        id: p.id.id,
                        name: p.name,
                        price: p.salesPrice
                    }
                })
            }) : null

        //mudar o status da minha order para approved
        payment.status === "approved" && order.approved()
        this._repository.addOrder(order)
        
        //retorner dto
        return {
            id: order.id.id,
            invoiceId: payment.status === "approved" ? invoice.id : null,
            status: order.status,
            total: order.total,
            products: order.products.map(p => {
                return {
                    productId: p.id.id
                }
            })
        }

    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if (input.products.length === 0) {
            throw new Error("No products selected")
        }
        for (const p of input.products) {
            const product = await this._productFacade.checkStock({ productId: p.productId })
            if (product.stock <= 0) {
                throw new Error(`Product ${product.productId} is not available in stock`)
            }
        }
    }

    private async getProduct(productId: string): Promise<Product> {
        const product = await this._catalogFacade.find({ id: productId })

        if (!product) {
            throw new Error("Product not found")
        }

        const productProps = {
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }

        return new Product(productProps)
    }
}

