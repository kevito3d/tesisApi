import { Router } from "express";
import { createPlant } from "../controllers/plantController";

const router = Router();

router.post('/', createPlant);


export default router;