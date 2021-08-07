import UserController from "../controller/UserController";
import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';

const router = Router();

router.get('/', [checkJwt], UserController.findAll);
router.post('/', [checkJwt], UserController.create);
router.get('/:id', [checkJwt], UserController.findOne);
router.delete('/:id', [checkJwt], UserController.delete);

export default router;