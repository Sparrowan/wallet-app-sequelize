import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import sequelize from './database/sequelize';

const app = express();
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log('Database synchronized');
}).catch((error) => {
    console.log(error)
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
