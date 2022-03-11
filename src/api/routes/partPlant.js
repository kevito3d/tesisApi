import { Router } from "express";
import { check } from "express-validator";
import { createPartPlant, deleteOne, getAll, getOne, getPartByPlant, setOne } from "../controllers/partController";
import { isAdmin, isAuthenticated } from "../auth/index"
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
    /* check('scientificname').isString(), */
    check('name').isString(),
   /*  check('description').isString(),
    check('idobservation').isNumeric(), */
], isAuthenticated, createPartPlant);

router.get('/', isAdmin,getAll);
router.get('/plant/:scientificname', getPartByPlant);
router.get('/:id',isAdmin, getOne)
// router.get('/:filter', getAllFilter);


router.delete('/:id',isAdmin, deleteOne)

router.put('/:id', [
    check('scientific_name').isString(),
    check('name').isString(),
    check('description').isString(),
    check('idobservation').isNumeric(),
],isAdmin, setOne)


export default router;