import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'; 
import routes from './routes/routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cors()); 
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server Backend menyala di http://localhost:${PORT}`);
});