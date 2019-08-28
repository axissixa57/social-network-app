import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (err) {
        throw new Error(err);
    }
};

export const comparePasswords = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (err) {
        throw new Error(err);
    }
};