import { Router } from "express";
import {login, createUser,deletOne,getOne,getAll, setOne} from '../controllers/userController'
// import { hasRoles } from '../auth';

const router = Router();

router.post('/login', login);
router.post('/register', createUser);
router.delete('/:ci', deletOne);
router.get('/', getAll);
router.get('/:ci', getOne);
router.put('/:ci', setOne);


export default router;