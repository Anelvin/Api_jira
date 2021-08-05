import UserController from "../controller/UserController";
import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';

const router = Router();

router.get('/', [checkJwt],UserController.all);
router.post('/', UserController.save);

export default router;