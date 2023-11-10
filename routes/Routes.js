import { Router } from 'express';
import StudentRoute from './Student.route.js';
import CourseRoute from './Course.route.js';

const router = Router();
router.use('/student', StudentRoute);
router.use('/course', CourseRoute);

export default router;
