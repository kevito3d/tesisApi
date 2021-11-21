import { Router } from "express";
import { createPlant, deleteOne, getall, getOne, setOne } from "../controllers/plantController";

const router = Router();

router.post('/', createPlant);

router.get('/', getall);

router.get('/:id', getOne)

router.delete('/:id', deleteOne)

router.put('/:id', setOne)

export default router;