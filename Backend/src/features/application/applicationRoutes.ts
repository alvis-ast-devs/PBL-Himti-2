import { Router } from 'express';
import { applicationController, getComments, addComment} from './applicationController.js';

const router = Router();

router.get('/', applicationController.getAll);

router.post('/', applicationController.create);

router.get('/:id/comments', getComments);

router.post('/:id/comments', addComment);

router.get('/:id', applicationController.getById);

router.post('/:id', applicationController.update);

router.put('/:id', applicationController.update);

router.delete('/:id', applicationController.delete);



export default router;