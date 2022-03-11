import { Router } from "express";
import { check } from "express-validator";
import { isAdmin, isAuthenticated } from "../auth";
import { createPlant, deleteOne, getAll, getAllFilter, getOne, setOne } from "../controllers/plantController";


const router = Router();

router.post('/', [
    check('scientificname').isString(),
    check('name').isString(),
    check('description').isString(),
], isAdmin, createPlant);

router.get('/', isAuthenticated, getAll);
router.get('/:scientificname', isAuthenticated, getOne)
router.get('/filter/:filter', isAdmin, getAllFilter);


router.delete('/:scientificname', isAdmin, deleteOne)

router.put('/:scientificnameU', [
    check('scientificname').isString(),
    check('name').isString(),
    check('description').isString(),
], isAdmin, setOne)


export default router;