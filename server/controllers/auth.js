import { User } from "../models/user";

export const getUser = (req, res, next) => {
    User.findById(req.user.id)
        .then(user => res.status(200).json(user))
        .catch(() => res.status(404).json('Not found'))
};