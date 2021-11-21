import { Router } from "express";
import { createPlant, getall } from "../controllers/plantController";

const router = Router();

router.post('/', createPlant);

router.get('/', getall);

export default router;