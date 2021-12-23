import { Router } from "express";
import { createPlant, deleteOne, getAll, getAllFilter, getOne, setOne } from "../controllers/plantController";


const router = Router();

router.post('/', createPlant);

router.get('/', getAll);
router.get('/:scientificname', getOne)
router.get('/filter/:filter', getAllFilter);


router.delete('/:scientificname', deleteOne)

router.put('/:scientificname', setOne)


export default router;