import { Router } from "express";
import { check } from "express-validator";
import { isAdmin, isAuthenticated } from "../auth";
import { createObservation, deleteOne, getAll, getOne, setOne } from "../controllers/observationController";
/* 
import path from 'path'
import multer from 'multer'
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },

})
const upload = multer({
    dest: path.join(__dirname, 'public/uploads'), 
    storage, 
    limits: { fileSize: 10000000 },
    fileFilter: (req,file,cb)=> {
        const filetypes = /jpg|png|gif|jpeg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if(mimetype && extname){
            return cb(null,true);
        }
        cb('error: el archivo debe ser una imagen valida (jpg|png|gif|jpeg)')
         
    }
}).single('image')
 */


const router = Router();

router.post('/', [
    check('latitude').isString(),
    check('longitude').isString(),
    check('ci').isString(),
    check('scientificname').isString(),
    check('province').isString(),
    check('canton').isString(),
    check('locality').isString(),
], isAuthenticated, createObservation);

router.get('/', isAuthenticated, getAll);

router.get('/:id', isAuthenticated, getOne)
// router.get('/:filter', getAllFilter);


router.delete('/:id', isAdmin, deleteOne)

router.put('/:id', [
    check('latitude').isString(),
    check('longitude').isString(),
    check('ci').isString(),
    check('scientificname').isString(),
    check('province').isString(),
    check('canton').isString(),
    check('locality').isString(),
], isAdmin, setOne)


export default router;