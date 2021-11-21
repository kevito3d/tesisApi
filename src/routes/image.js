import { Router } from "express";
import { createImage, deleteOne, getAll, getOne, setOne } from "../controllers/ImageController";

const router = Router();

router.post('/',  createImage);

router.get('/', getAll);

router.get('/:id', getOne)

router.delete('/:id', deleteOne)

router.put('/:id', setOne)

export default router;