import { DataTypes, Sequelize } from 'sequelize';
import type { MigrationFn } from 'umzug';
export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable('invoices', {
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        document: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        number: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        complement: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    })

    await sequelize.getQueryInterface().createTable('invoice_items', {
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        invoiceId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: 'invoices',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    })
};
export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('invoice_items')

    await sequelize.getQueryInterface().dropTable('invoices')
}
