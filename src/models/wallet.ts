import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';

class Wallet extends Model {
    public id!: number;
    public balance!: number;
}

Wallet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        balance: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        modelName: 'Wallet',
    }
);

export default Wallet;
