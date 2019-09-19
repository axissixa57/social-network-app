import express from 'express';

import authRoutes from './auth';
import apiRoutes from './api';

const router = express.Router();

router.use("/auth", authRoutes);
router.use('/api', apiRoutes);

export default router;