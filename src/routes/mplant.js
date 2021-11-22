import { Router } from "express";
import { createPlant, deleteOne, getall, getMPlantByPlant, getOne, setOne } from "../controllers/mPlantController";

const router = Router();

router.post('/', createPlant);

router.get('/', getall);

router.get('/:id', getOne)

router.delete('/:id', deleteOne)

router.put('/:id', setOne)

router.get('/plant/:id', getMPlantByPlant)

export default router;