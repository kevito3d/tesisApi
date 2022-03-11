import { Router } from "express";
import { check } from "express-validator";
import {login, createUser,deletOne,getOne,getAll,getAllFilter, setOne, logOut} from '../controllers/userController'
// import { hasRoles } from '../auth';

const router = Router();

router.post('/login', [
    check('email').isString(),
    check('ci').isString(),
    check('password').isString(),
], login);
router.post('/register',[
    check('lastname').isString(),
    check('firstname').isString(),
    check('email').isString(),
    check('ci').isString(),
    check('password').isString(),
    check('role').isString(),
    check('phone').isString(),
], createUser);
router.post('/logout', logOut);
router.delete('/:ci', deletOne);
router.get('/', getAll);
router.get('/filter/:filter', getAllFilter);
router.get('/:ci', getOne);
router.put('/:ci', setOne);

export default router;