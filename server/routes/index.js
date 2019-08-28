import express from 'express';

import * as auth from '../controllers/auth';

const router = express.Router();

router.get('/auth/me', auth.getUser);

export default router;