import { Router } from 'express';
import { applicationController } from './applicationController.js';

const router = Router();

router.get('/', applicationController.getAll);

router.get('/:id', applicationController.getById);

router.post('/', applicationController.create);

router.post('/:id', applicationController.update);

router.put('/:id', applicationController.update);

router.delete('/:id', applicationController.delete);

export default router;