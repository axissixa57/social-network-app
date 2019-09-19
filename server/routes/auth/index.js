import express from 'express';
import * as auth from "../../controllers/auth";
import passport from "passport";

const router = express.Router();

router.get('/me', auth.getUser);

router
    .route('/login')
    .post(auth.localAuthHandler) // passport.authenticate('local'),
    .delete();

router.post('/register', auth.registerUser);

export default router;