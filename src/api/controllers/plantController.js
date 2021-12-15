import Plant from "../models/Plant";
// import { getImagesByPlantForController } from './imageController'
import { Op } from 'sequelize'
import PartPlant from "../models/PartPlant";
import Image from "../models/Image";
import Observation from "../models/Observation";
import slug from "slug";
import PlantReference from "../models/PlantReference";

export async function createPlant(req, res) {
    const { scientificname, name, description, commonplace } = req.body;
    console.log(scientificname)
    // const url = 'uploads/'+req.file.originalname;
    const nc_ = slug(scientificname, "_");
    console.log(nc_);
    try {
        let newPlant = await Plant.create({
            scientificname:nc_,
            name,
            description,
            commonplace
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
export async function getAll(req, res) {
    try {
        const plants = await Plant.findAll({
            include: [
                {
                    model: PartPlant
                },
                {
                    model: Image
                },
                {
                    model: Observation
                },
                {
                    model: PlantReference
                },
            ],

        });
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
export async function getAllFilter(req, res) {
    try {
        const { filter } = req.params;
        const plants = await Plant.findAll({
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
//get all front
export async function getAllF(req) {
    try {
        const plants = await Plant.findAll({
            include: {
                model: PartPlant
            }
        });

        return plants

    } catch (error) {
        console.log(error);
        return ({
            message: "ocurrio un problema con el servidor",
        })
    }
}

export async function getOne(req, res) {
    try {
        const { scientificname } = req.params;
        // console.log(id);
        const plant = await Plant.findOne({
            where: {
                scientificname
            },
            include: {
                model: PartPlant
            }
        });
        if (plant) {
            console.log(plant);
            res.json({
                data: plant
            });
        } else {
            res.status(404).json({
                data: "Planta no encontrada"
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
        const { scientificname } = req.params;
        console.log(scientificname);
        const deleteRowCount = await Plant.destroy({
            where: {
                scientificname
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
        console.log(error);
        res.status(500).json({
            message: "ocurrio un problema con el servidor",
            error
        })
    }

}

export async function setOne(req, res) {
    try {
        const { scientificname } = req.params;
        const { scientific_name, name, description, commonplace } = req.body;
        // const plant = await Plant.findOne({
        //     where: {
        //         id
        //     }
        // });
        // console.log(plant);
        const plantUpdated = await Plant.update({
            scientific_name,
            name,
            description,
            commonplace
        }, {
            where: {
                scientificname
            }
        })
        if (plantUpdated[0]) {
            res.json({
                message: "Planta actualizada correctamente",
                data: { scientific_name, name, description, commonplace }
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
