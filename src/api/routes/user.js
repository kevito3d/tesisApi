import { Router } from "express";
import { check } from "express-validator";
import { isAdmin } from "../auth";
import {login, createUser,createOneUser, deletOne,getOne,getAll,getAllFilter, setOne, logOut,forgotPassword, resetPassword} from '../controllers/userController'
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
],isAdmin, createUser);

router.post('/register-one', [
    check('email').isString(),
    check('ci').isString(),
    check('password').isString(),
], createOneUser);


router.post('/forgot-password',check('ci').isString(),forgotPassword)

router.post('/reset-password/:token',check('newPassword').isString(),resetPassword)

router.post('/logout', logOut);

router.delete('/:ci', deletOne);

router.get('/', getAll);

router.get('/filter/:filter', getAllFilter);

router.get('/:ci', getOne);

router.put('/:ci', setOne);


export default router;