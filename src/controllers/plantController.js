import { serialize } from "pg-protocol";
import Plant from "../models/Plant";

export async function createPlant(req, res) {
    const { scientific_name, name, descripcion } = req.body;
    
    try {
        let newPlant = await Plant.create({
            scientific_name,
            name,
            descripcion
        },{
            fields: ['scientific_name' , 'name', 'descripcion']
        })
        if (newPlant) {
            return res.json({
                message: "Planta insertada correctamente",
                data:newPlant
            })
        }

    } catch (error) {
        //si se suplica la llave unica
        let message = "ocurrio un problema con el servidor";
         if (error.original.code == 23505){
            message = "nombre cientifico ya existente"
         };
        
        res.status(500).json({
            message ,
            data: []
        })
    }
}
export async function getall(req, res){
    const plants =await Plant.findAll();
    res.json({
        data:plants
    });
}

export async function deletePlant(req, res){
    const { id } = req.body;
    
}