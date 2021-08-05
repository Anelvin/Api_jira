import { Router } from 'express';
import AuthController from '../controller/AuthController';

const router = Router();

router.post('/signin', AuthController.login);

export default router;