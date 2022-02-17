import { Router } from "express";
import {login, createUser,deletOne,getOne,getAll,getAllFilter, setOne, logOut} from '../controllers/userController'
// import { hasRoles } from '../auth';

const router = Router();

router.post('/login', login);
router.post('/register', createUser);
router.post('/logout', logOut);
router.delete('/:ci', deletOne);
router.get('/', getAll);
router.get('/filter/:filter', getAllFilter);
router.get('/:ci', getOne);
router.put('/:ci', setOne);

export default router;