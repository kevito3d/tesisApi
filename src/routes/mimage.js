import { Router } from "express";
import { createMImage, deleteOne, getAll,getMImagesByPlant, getOne, setOne } from "../controllers/mImageController";

const router = Router();

router.post('/',  createMImage);

router.get('/', getAll);

router.get('/:id', getOne)

router.delete('/:id', deleteOne)

router.put('/:id', setOne)

router.get('/mplant/:id', getMImagesByPlant)

export default router;