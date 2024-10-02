import { Column, Model, Table, ForeignKey } from "sequelize-typescript";
import { OrderModel } from "./order.model";
import { ProductModel } from "./product.model";

@Table({
    tableName: "order_products",
    timestamps: false
})
export class OrderProduct extends Model {

    @ForeignKey(() => OrderModel)
    @Column
    orderId: string;

    @ForeignKey(() => ProductModel)
    @Column
    productId: string;
}