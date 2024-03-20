import { Sequelize } from 'sequelize';

// Connect to SQLite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    omitNull: true
});


export default sequelize
