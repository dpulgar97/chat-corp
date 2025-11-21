import { users } from '../data/users.js';
import { comparePassword } from '../utils/bcrypt.js';
import { generateToken } from '../utils/token.js';


export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user || !(await comparePassword(password, user.password))) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = generateToken(user);

  res.status(200).json({
    message: 'Login exitoso',
    token,
    user: { id: user.id, email: user.email, role: user.role }
  });
};

export const logout = (req, res) => {
  res.status(200).json({ message: 'Sesión cerrada' });
};