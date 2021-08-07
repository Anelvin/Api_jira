import { Router } from 'express';
import ProjectController from '../controller/ProjectController';
import { checkJwt } from '../middlewares/checkJwt';

const router = Router();

router.get('/', [checkJwt], ProjectController.findAll);
router.post('/', [checkJwt], ProjectController.create);
router.get('/:id', [checkJwt], ProjectController.findOne);
router.delete('/:id', [checkJwt], ProjectController.delete);

export default router;