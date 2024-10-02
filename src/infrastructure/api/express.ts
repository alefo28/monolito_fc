import { clientRoute } from "../routes/clientRoute";
import { invoiceRoute } from "../routes/invoiceRoute";
import { orderRoute } from "../routes/orderRoute";
import { productRoute } from "../routes/productRoute";

import { Sequelize } from "sequelize-typescript"
import { Umzug } from "umzug/lib/umzug"
import express, { Express } from 'express'
import { join } from "path";
import { migrator } from "../../migrations_test/config-migrations/migrator";

import { ClientModel as ClientOrderModel } from "../../modules/checkout/repository/client.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { OrderModel } from "../../modules/checkout/repository/order.model";
import { InvoiceItemsModel } from "../../modules/invoice/repository/invoice-items.model";
import { TransactionModel } from "../../modules/payment/repository/transaction.model";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import { OrderProduct } from "../../modules/checkout/repository/orderProduct.model";
import { ProductModel as ProductStoreModel } from "../../modules/store-catalog/repository/product.model";
import { ProductModel as ProductOrderModel } from "../../modules/checkout/repository/product.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";



export const app: Express = express();
app.use(express.json());

app.use("/clients", clientRoute)
app.use("/products", productRoute)
app.use("/invoice", invoiceRoute)
app.use("/checkout", orderRoute)

export let sequelize: Sequelize;
export let migration: Umzug<any>

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: join(__dirname, '../../../../database.sqlite'),
    logging: false,
  })

  await sequelize.addModels([
    ClientModel,
    ClientOrderModel,
    OrderModel,
    ProductOrderModel,
    ProductModel,
    ProductStoreModel,
    OrderProduct,
    InvoiceModel,
    InvoiceItemsModel,
    TransactionModel])
  migration = migrator(sequelize);

  await migration.up();
  await sequelize.sync();
}
try {
  setupDb();
} catch (error) {
  console.log(error);

}
