import { Router } from "express";
import { isAuthenticated } from "../auth";
import { createPlant, deleteOne, getAll, getAllFilter, getOne, setOne } from "../controllers/plantController";


const router = Router();

router.post('/', createPlant);

router.get('/',isAuthenticated, getAll);
router.get('/:scientificname', getOne)
router.get('/filter/:filter', getAllFilter);


router.delete('/:scientificname', deleteOne)

router.put('/:scientificnameU', setOne)


export default router;