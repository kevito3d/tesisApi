import Plant from "../models/Plant";
import {getImagesByPlantForController} from './imageController'

export async function createPlant(req, res) {
    const { scientific_name, name, description } = req.body;

    try {
        let newPlant = await Plant.create({
            scientific_name,
            name,
            description
        }, {
            fields: ['scientific_name', 'name', 'description']
        })
        if (newPlant) {
            return res.json({
                message: "Planta insertada correctamente",
                data: newPlant
            })
        }

    } catch (error) {
        //si se suplica la llave unica
        console.log(error);
        let message = "ocurrio un problema con el servidor";
        if (error.original.code == 23505) {
            message = "nombre cientifico ya existente"
        };

        res.status(500).json({
            message,
            data: []
        })
    }
}
export async function getall(req, res) {
    try {
        const plants = await Plant.findAll();
        res.json({
            data: plants
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ocurrio un problema con el servidor",
            data: []
        })
    }
}

export async function getOne(req, res) {
    try {
        const { id } = req.params;
        const plant = await Plant.findOne({
            where: {
                id
            }
        });
        if (plant) {
            res.json({
                data: plant
            });
        }else{
            res.status(404).json({
                data:"Planta no encontrada"
            })
        }
    } catch (error) {

        console.log(error);
        res.status(500).json({
            message: "ocurrio un problema con el servidor",
            data: []
        })
    }
}

export async function deleteOne(req, res) {
    try {
        const { id } = req.params;
        const deleteRowCount = await Plant.destroy({
            where: {
                id
            }
        });
        if (deleteRowCount == 1) {
            res.json({
                data: "Planta eliminada satifactoriamente",
                count: deleteRowCount
            });
        } else {
            res.status(404).json({
                data: "Planta no encontrada",
                count: deleteRowCount
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "ocurrio un problema con el servidor",
            data: []
        })
    }

}

export async function setOne(req, res) {
    try {
        const { id } = req.params;
        const { scientific_name, name, description } = req.body;
        // const plant = await Plant.findOne({
        //     where: {
        //         id
        //     }
        // });
        // console.log(plant);
        const plantUpdated = await Plant.update({
            scientific_name,
            name,
            description
        }, {
            where: {
                id
            }
        })
        if (plantUpdated[0]) {
            res.json({
                message: "Planta actualizada correctamente",
                data: { scientific_name, name, description }
            });
        } else {
            res.status(404).json({
                message: "Planta no encontrada",
            });

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ocurrio un problema con el servidor",
            data: []
        })
    }
}
