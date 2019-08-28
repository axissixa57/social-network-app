import jwt from 'jsonwebtoken';

export const signToken = (data) => {
    try {
        return jwt.sign(data, 'SuperSecret', { expiresIn: '1h' });
    } catch (error) {
        throw error;
    }
};

export const verifyToken = (token) => new Promise((resolve, reject) =>
    jwt.verify(token, 'SuperSecret', (err, decoded) => err ? reject(err) : resolve(decoded)));