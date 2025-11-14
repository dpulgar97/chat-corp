import jwt from 'jsonwebtoken';


export const generateToken = (res, user) => {
    const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' }
    );}
