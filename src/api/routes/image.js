import { Router } from "express";
import { createImage, deleteOne, getAll, getImagesByPlant, getOne, setOne, createImageObservation } from "../controllers/imageController";
import multer from 'multer'
import slug from "slug";
import path from 'path'
import { check } from "express-validator";
import { isAdmin, isAuthenticated } from "../auth";

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/uploads'),
    filename: (req, file, cb) => {
        let nc_ = slug(file.originalname, "_");
        nc_ = nc_.replace(" ", "");
        console.log("filetypoe: ",file.mimetype); 
        cb(null,""+  Date.now()+path.extname(file.originalname).toLocaleLowerCase() )
    },

})
const upload = multer({
    dest: path.join(__dirname, 'public/uploads'),
    storage,
    limits: { fileSize: 60000000 },
    fileFilter: (req, file, cb) => {
        console.log(file);
        const filetypes = /jpg|png|gif|jpeg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            console.log("imagen buena");
            return cb(null, true);
        }
        cb('error: el archivo debe ser una imagen valida (jpg|png|gif|jpeg)')

    }
}).array('images');


const router = Router();

router.post('/', isAdmin ,upload, createImage);

router.get('/', isAuthenticated, getAll);

router.get('/:id', isAuthenticated, getOne)

router.delete('/:id', isAdmin, deleteOne)

router.put('/:id', [
    check('scientificname').isString(),
    check('idpartplant').isNumeric(),
    check('idobservation').isNumeric(),
], isAdmin, setOne)

router.get('/plant/:id', isAdmin, getImagesByPlant)

export default router;