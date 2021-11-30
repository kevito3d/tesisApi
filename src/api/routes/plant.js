import { Router } from "express";
import { createPlant, deleteOne, getAll, getAllFilter, getOne, setOne } from "../controllers/plantController";

const router = Router();

router.post('/', createPlant);

router.get('/', getAll);
router.get('/:filter', getAllFilter);

router.get('/:id', getOne)

router.delete('/:id', deleteOne)

router.put('/:id', setOne)


export default router;