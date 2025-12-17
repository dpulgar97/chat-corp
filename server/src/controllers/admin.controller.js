import { users } from '../data/users.js';
import { hashPassword } from '../utils/bcrypt.js';


export const getAllUsers = (req, res) => {
  // Filtrar: no mostrar otros admins (opcional, según tu política)
  const regularUsers = users.filter(user => user.role === 'user');
  res.json(regularUsers);
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validaciones básicas
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  // Evitar duplicados
  const emailExists = users.some(u => u.email === email);
  const usernameExists = users.some(u => u.username === username);
  if (emailExists || usernameExists) {
    return res.status(409).json({ message: 'Email o nombre de usuario ya existe' });
  }

  // Hashear contraseña
  const hashedPassword = await hashPassword(password);

  const newUser = {
    id: String(users.length + 1),
    username,
    email,
    password: hashedPassword,
    role: 'user' // siempre 'user', los admins solo los crea el sistema
  };

  users.push(newUser);

  // No devolver la contraseña
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
};

// Eliminar usuario
export const deleteUser = (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  // Evitar que un admin se elimine a sí mismo (opcional)
  if (users[userIndex].role === 'admin') {
    return res.status(403).json({ message: 'No puedes eliminar a un administrador' });
  }

  users.splice(userIndex, 1);
  res.json({ message: 'Usuario eliminado correctamente' });
};