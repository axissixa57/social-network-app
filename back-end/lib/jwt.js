import jwt from 'jsonwebtoken';

export const signToken = (data) => {
    try {
        return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
    } catch (error) {
        throw error;
    }
};

export const verifyToken = (token) => new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => err ? reject(err) : resolve(decoded)));