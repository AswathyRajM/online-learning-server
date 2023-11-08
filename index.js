import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import { applyRoutes } from './routes/Routes.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = 8000;

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || 'http://localhost:5000',
//     optionsSuccessStatus: 200,
//   })
// );

process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection', error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

applyRoutes(app);
app.get('/', (request, response) => {
  response.send({ message: 'Hello from an Express API!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
