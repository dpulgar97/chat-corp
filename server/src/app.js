import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import testRoutes from './routes/test.routes.js';

connectDB();

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend con MongoDB');
});

app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});