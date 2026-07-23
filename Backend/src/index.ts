import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import routes from './routes/routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use('/api', routes);



app.listen(PORT, () => {
  console.log(`Server Backend menyala di http://localhost:${PORT}`);
});