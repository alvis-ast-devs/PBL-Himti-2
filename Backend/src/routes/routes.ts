import { Router } from 'express';
import applicationRoutes from '../features/application/applicationRoutes.js';


const router = Router();

router.use('/applications', applicationRoutes);

export default router;