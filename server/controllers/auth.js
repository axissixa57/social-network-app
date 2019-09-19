import {User} from "../models/user";
import {comparePasswords, hashPassword} from "../lib/bcrypt";
import {signToken} from "../lib/jwt";

export const getUser = (req, res) => {
    const user = res.locals.loggedInUser;

    if (!user) {
        res.status(200).json({
            resultCode: 1,
            messages: ['You are not authorized'],
            data: {}
        });
    } else {
        res.status(200).json({
            resultCode: 0,
            messages: [],
            data: {
                id: user._id,
                login: user.login,
                email: user.email
            }
        });
    }
};

export const login = async (req, res) => {
    const response = {
        resultCode: 0,
        messages: [],
        accessToken: ''
    };

    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            response.resultCode = 1;
            response.messages = ['Email does not exist'];
            return res.status(200).json(response);
        }
        const validPassword = await comparePasswords(password, user.password);
        if (!validPassword) {
            response.resultCode = 1;
            response.messages = ['Password is not correct'];
            return res.status(200).json(response);
        }
        const accessToken = signToken({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
        await User.findByIdAndUpdate(user._id, {accessToken});
        response.accessToken = accessToken;
    } catch (error) {
        response.messages = [`${error}`];
    }

    res.status(200).json(response);
};

export const logout = async (req, res) => {
    res.json({
        resultCode: 0,
        messages: [],
    });
};

export const register = async (req, res) => {
    try {
        const {email, login, password} = req.body;

        const userExists = await User.findOne({email});
        if (userExists) {
            res.status(200).json({
                resultCode: 1,
                messages: ['User already exists'],
            });
        } else {
            const hashedPassword = await hashPassword(password);
            const newUser = new User({
                email,
                login,
                password: hashedPassword,
            });
            const accessToken = signToken({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
            newUser.accessToken = accessToken;
            await newUser.save();
            res.status(200).json({
                resultCode: 0,
                messages: ['You have signed up successfully'],
                accessToken
            });
        }
    } catch (error) {
        res.status(200).json({
            resultCode: 1,
            messages: [`${error}`]
        });
    }
};