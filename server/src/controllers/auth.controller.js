import { users } from '../data/users.js';
import { comparePassword } from '../utils/bcrypt.js';
import jwt from 'jsonwebtoken';

// Esto irá en .env después
const JWT_SECRET = 'tu_secreto_super_secreto'; // ⚠️ temporal

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validación básica
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  // Buscar usuario
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Verificar contraseña
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Generar JWT
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Enviar token (por ahora en el body; después usaremos cookies seguras)
  res.status(200).json({
    message: 'Login exitoso',
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  });
};

export const logout = (req, res) => {
  // Con JWT stateless, el "logout" se maneja del lado del frontend (eliminando el token)
  // Pero puedes invalidar el token si usas una lista negra (opcional, más avanzado)
  res.status(200).json({ message: 'Sesión cerrada' });
};