import { BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import { ClientModel } from "./client.model";
import { OrderProduct } from "./orderProduct.model";

@Table({
    tableName: "orders",
    timestamps: false
})
export class OrderModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    id: string

    @BelongsTo(() => ClientModel, { foreignKey: 'clientId' })
    client: ClientModel;

    @BelongsToMany(() => ProductModel, () => OrderProduct)
    products: ProductModel[];

    @Column({ allowNull: false })
    status: string

}
