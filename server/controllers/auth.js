import { User } from "../models/user";
import {hashPassword} from "../lib/bcrypt";
import {signToken} from "../lib/jwt";

export const getUser = async (req, res) => {
    const messages = [];
    let user;
    try {
        user = await User.findById(req.user.id);
    } catch (err) {
       messages.push('Not found');
    }

    res.status(200).json({
        resultCode: 0,
        messages,
        data: user
    });
};

export const localAuthHandler = (req, res) => {
    //  middleware из прошлого шага запише req.user данные благодаря passport,
    if (req.user) {
        const token = signToken(req.user);
        res.cookie('auth', token);
        res.send('Ok')
    } else {
        res.status(500).send('Send user please')
    }
};

export const registerUser = async (req, res) => {
    try {
        const data = req.body;
        const userExists = await User.findOne({ email: data.email });
        if (userExists) {
            //res.status(409).send('User already exists');
            res.json({messages: ['User already exists']})
        } else {
            const user = new User({ email: data.email, password: await hashPassword(data.password)});
            const savedUser = await user.save(); // вроде как в бд данные хранятся в объекте bson
            const token = signToken(savedUser.toJSON()); // переоводит из bson в json и затем формируем токен
            res.cookie('auth', token); // отправляем токен в куки под именем auth
            res.send('Ok');
        }
    } catch (err) {
        res.status(404).send(err);
    }
};