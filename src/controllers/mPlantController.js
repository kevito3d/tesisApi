import MPlant from "../models/MPlant";

export async function createPlant(req, res) {
    const { names, phone, latitud, longuitud, plant_id } = req.body;

    try {
        let newMPlant = await MPlant.create({
            names, phone, latitud, longuitud, plant_id
        }, {
            fields: ['names', 'phone', 'latitud', 'longuitud', 'plant_id']
        })
        if (newMPlant) {
            return res.json({
                message: "Planta insertada correctamente",
                data: newMPlant
            })
        }

    } catch (error) {
        //si se suplica la llave unica
        console.log(error);
        // let message = "ocurrio un problema con el servidor";
        // if (error.original.code == 23505) {
        //     message = "nombre cientifico ya existente"
        // };

        res.status(500).json({
            message:"ocurrio un problema con el servidor",
            data: []
        })
    }
}
export async function getall(req, res) {
    try {
        const mplants = await MPlant.findAll();
        res.json({
            data: mplants
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
        const mplant = await MPlant.findOne({
            where: {
                id
            }
        });
        res.json({
            data: mplant
        });
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
        const deleteRowCount = await MPlant.destroy({
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
            res.json({
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
        const { names, phone, latitud, longuitud, plant_id } = req.body;
        // const plant = await Plant.findOne({
        //     where: {
        //         id
        //     }
        // });
        // console.log(plant);
        const mplantUpdated = await MPlant.update({
            names, phone, latitud, longuitud, plant_id
        }, {
            where: {
                id
            }
        })
        if (mplantUpdated[0]) {
            res.json({
                message: "Planta actualizada correctamente",
                data: { names, phone, latitud, longuitud, plant_id }
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

