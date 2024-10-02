import { DataTypes, Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable('orders', {
        id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false
        },
        clientId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: 'clients',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    });

    await sequelize.getQueryInterface().createTable('order_products', {
        orderId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: 'orders',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        productId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('order_products');
    await sequelize.getQueryInterface().dropTable('orders');
};
