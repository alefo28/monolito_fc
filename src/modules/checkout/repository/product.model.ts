import { BelongsTo, BelongsToMany, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderModel } from "./order.model";
import { OrderProduct } from "./orderProduct.model";

@Table({
    tableName: "products",
    timestamps: false
})
export class ProductModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    id: string

    @Column({ allowNull: false })
    name: string

    @Column({ allowNull: false })
    description: string

    @Column({ allowNull: false })
    salesPrice: number

    @BelongsToMany(() => OrderModel, () => OrderProduct)
    orders: OrderModel[];

}


