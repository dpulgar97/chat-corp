import User from "../models/user.model.js";

// Obtener todos los usuarios regulares (excluye admins)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Crear un nuevo usuario (solo admin)
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validación básica (puedes mejorarla con Joi/Zod después)
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    // Verificar unicidad (el schema ya tiene unique, pero es bueno validar antes)
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email o nombre de usuario ya existe" });
    }

    // Crear usuario → el hash se hace automáticamente por el middleware
    const newUser = new User({
      username,
      email,
      password, // ¡sin hashear aquí! el pre-save lo hace
      role: "user",
    });

    await newUser.save();

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicado por índice único (fallback)
      return res.status(409).json({ message: "Email o usuario ya registrado" });
    }
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

// Eliminar un usuario (solo si es "user")
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.role === "admin") {
      return res
        .status(403)
        .json({ message: "No puedes eliminar a un administrador" });
    }

    await User.findByIdAndDelete(id);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};
