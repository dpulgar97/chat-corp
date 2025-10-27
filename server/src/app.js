import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';

connectDB();

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend con MongoDB');
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});