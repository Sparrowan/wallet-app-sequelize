import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';
import Wallet from './wallet';

class Transaction extends Model {
    public id!: number;
    public amount!: number;
    public type!: string;
}

Transaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('credit', 'debit'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Transaction',
    }
);

export default Transaction;
