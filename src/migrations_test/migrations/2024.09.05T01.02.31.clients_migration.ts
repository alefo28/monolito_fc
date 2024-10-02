import { DataTypes, Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable('clients', {
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
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
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        zipcode: {
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
};
export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('clients')
}

