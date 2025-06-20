import express from 'express';
import router from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', router);

app.listen(3000, () => console.log('Servidor executando na porta 3000'));
