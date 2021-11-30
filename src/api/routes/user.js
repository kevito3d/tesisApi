import { Router } from "express";
import {login, createUser,deletOne} from '../controllers/userController'
// import { hasRoles } from '../auth';

const router = Router();

router.post('/login', login);
router.post('/register', createUser);
router.delete('/:email', deletOne);


export default router;