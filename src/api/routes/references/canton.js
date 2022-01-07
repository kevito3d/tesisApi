import { Router } from 'express';
const router = Router();

import {
    createCanton,
    getCantons,
    getOneCanton,
    updateCanton,
    deletedCanton
} from '../../controllers/references/cantonController';

router.post('/', createCanton);

router.get('/', getCantons);

router.get('/:id', getOneCanton);

router.put('/:id', updateCanton);

router.delete('/:id', deletedCanton);

export default router;