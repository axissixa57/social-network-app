import express from 'express';

const router = express.Router();

router.get('/:id');

router.get('/status/:id');

router.put('/status');

export default router;