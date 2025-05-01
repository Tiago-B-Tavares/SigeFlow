import express from 'express';
import routes from './routes/index.js';
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Bem-vindo ao sistema SIGEFLOW!');
});

app.use('/api', routes);


app.listen(3000, () => console.log('Server running on port 3000'));
