import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import { applyRoutes } from './routes/Routes.js';
import cors from 'cors';
import { Server } from 'socket.io';

dotenv.config();
const app = express();
const PORT = 8000;

app.use(cors());

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

const httpServer = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

// io.on('connection', (socket) => {
//   console.log(`User connected ${socket.id}`);

//   // We can write our socket event listeners in here...
// });
