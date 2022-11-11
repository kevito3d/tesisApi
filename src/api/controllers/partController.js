import PartPlant from "../models/PartPlant";
import {deleteImages} from './imageController'
import { Op } from 'sequelize'
import Image from "../models/Image";

export async function createPartPlant(req, res) {
    const { scientificname, name, description, idobservation,descriptionalumnos } = req.body;
    console.log("body en part plant: ",req.body)
    // const url = 'uploads/'+req.file.originalname;

    try {
        let newPart = await PartPlant.create({
            scientificname,
            name,
            description,
            idobservation,
            descriptionalumnos
        }, {
            fields: ['name', 'description', 'scientificname', "idobservation","descriptionalumnos"]
        })
        if (newPart) {
            return res.json({
                message: "Parte insertada correctamente",
                data: newPart
            })
        }

    } catch (error) {
        //si se suplica la llave unica
        console.log(error);
        let message = "ocurrio un problema con el servidor";
        if (error.original.code == 23503) {
            message = "no existe referencia de esa planta o observacion"
        };
        res.status(500).json({
            message,
            data: []
        })
    }
}
export async function getAll(req, res) {
    try {
        const parts = await PartPlant.findAll({
            include: {
                model: Image
            }
        });
        res.json({
            data: parts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ocurrio un problema con el servidor",
            data: []
        })
    }
}
/* export async function getAllFilter(req, res) {
    try {
        const { filter } = req.params;
        const parts = await PartPlant.findAll({
            where: {
                [Op.or]: {
                    name: {
                        [Op.like]: `%${filter}%`
                    },
                    scientific_name: {
                        [Op.like]: `%${filter}%`
                    },
                }

            }

        });
        res.json({
            data: parts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ocurrio un problema con el servidor",
            data: []
        })
    }
} */
//get all front
/* export async function getAllPartsFilter(scientificname) {
    try {
        const parts = await PartPlant.findAll({
            where:{
                scientificname
            }
        });

        return parts

    } catch (error) {
        console.log(error);
        return ({
            message: "ocurrio un problema con el servidor",
        })
    }
} */

export async function getOne(req, res) {
    try {
        const { id } = req.params;
        const part = await PartPlant.findOne({
            where: {
                id
            },
            include: {
                model: Image
            }
        });
        if (part) {
            console.log(part);
            res.json({
                data: part
            });
        } else {
            res.status(404).json({
                data: "Parte no encontrada"
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
        // console.log(id);
        const part = await PartPlant.findOne({
            where:{
                id
            },
            include:{
                model:Image
            }
        })
        const deleteRowCount = await PartPlant.destroy({
            where: {
                id
            }
        });
        if (deleteRowCount == 1) {
            if(part.images.length>0){
                part.images.forEach(element => {
                    deleteImages(element.url)
                });
            }
            res.json({
                data: "Parte eliminada satifactoriamente",
                count: deleteRowCount
            });
        } else {
            res.status(404).json({
                data: "Parte no encontrada",
                count: deleteRowCount
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "ocurrio un problema con el servidor",
            error
        })
    }

}

export async function setOne(req, res) {
    try {
        const { id } = req.params;
        const { scientific_name, name, description, idobservation,descriptionalumnos } = req.body;
        // const plant = await Plant.findOne({
        //     where: {
        //         id
        //     }
        // });
        // console.log(plant);
        const partUpdated = await PartPlant.update({
            scientific_name,
            name,
            description,
            idobservation,
            descriptionalumnos
        }, {
            where: {
                id
            }
        })
        if (partUpdated[0]) {
            res.json({
                message: "Parte actualizada correctamente",
                data: { scientific_name, name, description, idobservation }
            });
        } else {
            res.status(404).json({
                message: "Parte no encontrada",
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


export async function getPartByPlant(req, res) {
    try {
        console.log(req.params);
        const { scientificname } = req.params
        const part = await PartPlant.findAll({
            where: {
                scientificname
            }, include: {
                model: Image
            }
        })
        if (part.length > 0) {
            console.log(part);
            res.json({
                data: part
            });
        } else {
            res.status(404).json({
                data: "partes no encontradas"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ocurrio un problema con el servidor"
        })
    }
}