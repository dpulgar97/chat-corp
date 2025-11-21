import { Router } from "express";
import { authenticateToken, requireAdmin } from "../middleware/authToken.js";

const router = Router();

router.get("/protected", authenticateToken, (req, res) => {
    res.status(200).json({ message: "Acceso concedido a ruta protegida", user: req.user });
});

router.get("/admin-only", authenticateToken, requireAdmin, (req, res) => {
    res.status(200).json({ message: "Acceso concedido a ruta de administrador", user: req.user });
});

export default router;