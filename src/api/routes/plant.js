import { Router } from "express";
import { createPlant, deleteOne, getAll, getAllFilter, getOne, setOne } from "../controllers/plantController";
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

router.post('/', createPlant);

router.get('/', getAll);
router.get('/:scientificname', getOne)
router.get('/:filter', getAllFilter);


router.delete('/:scientificname', deleteOne)

router.put('/:scientificname', setOne)


export default router;