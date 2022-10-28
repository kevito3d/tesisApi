import Plant from "../models/Plant";
// import { getImagesByPlantForController } from './imageController'
import { Op } from 'sequelize'
import PlantReference from "../models/PlantReference";
import Canton from "../models/references/Canton";
import Province from "../models/references/Province";

export async function createReference(req, res) {
    const { scientificname, idcanton, locality } = req.body;
    console.log(req.body)
    try {
        let newPlant = await PlantReference.create({
            scientificname,
            idcanton,
            locality,
        })
        if (newPlant) {
            return res.json({
                message: "referencia insertada correctamente",
                data: newPlant
            })
        }

    } catch (error) {
        //si se suplica la llave unica
        console.log(error);
        let message = "ocurrio un problema con el servidor";
        /*  if (error.original.code == 23505) {
             message = "nombre cientifico ya existente"
         }; */

        res.status(500).json({
            message,
            data: []
        })
    }
}
export async function getAll(req, res) {
    try {
        console.log("tet");
        const plants = await PlantReference.findAll({
           /*  include: [
                {
                    model: Plant
                },
                {
                    model: Canton
                },

            ], */

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
        console.log(filter);
        const plants = await PlantReference.findAll({
            include: [
                { model: Canton },
                { model: Plant }
            ],
            where: {
                [Op.or]: {
                    name: {
                        [Op.like]: `%${filter}%`
                    },
                    scientificname: {
                        [Op.like]: `%${filter}%`
                    },
                }

            }

        });
        return res.json({
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
export async function getAllF(scn) {
    try {
        const canton = await PlantReference.findAll({
             include: [
                {
                    model: Canton,
                    include:{
                        model:Province
                    }
                },
                

            ],
            where: { scientificname: scn },
        });
        
        return canton;

    } catch (error) {
        console.log(error);
        return ({
            message: "ocurrio un problema con el servidor",
        })
    }
}
export async function deleteOne(req, res) {
    try {
        const { scientificname } = req.params;
         console.log("cs en delete: ",scientificname);
        const deleteRowCount = await PlantReference.destroy({
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

/* export async function getOne(req, res) {
    try {
        const { scientificname } = req.params;
        // console.log(id);
        const plant = await PlantReference.findOne({
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
 */