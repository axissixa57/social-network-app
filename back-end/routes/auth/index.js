import express from 'express';
import * as auth from "../../controllers/auth";

const router = express.Router();

router.get('/me', auth.getUser);

router
    .route('/login')
    .post(auth.login)
    .delete(auth.logout);

router.post('/register', auth.register);

export default router;