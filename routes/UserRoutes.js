import express from 'express';
import UserController from '../controllers/UserController';
import { verifyToken } from '../middleware/authentication';

const router = express.Router();

router.get('/', verifyToken, UserController.getAll);

export default router;