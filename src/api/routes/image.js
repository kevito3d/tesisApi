import { Router } from "express";
import { createImage, deleteOne, getAll, getImagesByPlant, getOne, setOne } from "../controllers/ImageController";

const router = Router();

router.post('/',  createImage);

router.get('/', getAll);

router.get('/:id', getOne)

router.delete('/:id', deleteOne)

router.put('/:id', setOne)

router.get('/plant/:id', getImagesByPlant)

export default router;