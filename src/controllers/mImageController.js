import MImage from '../models/MImage';
export async function createMImage(req, res) {

    const { url, mplant_id } = req.body;
    try {
        let newMImage = await MImage.create({
            url,
            plant_id: mplant_id,
        }, {
            fields: ['url', 'plant_id']
        })
        if (newMImage) {
            return res.json({
                message: "MImagen insertada correctamente",
                data: newMImage
            })
        }

    } catch (error) {
        //si se suplica la llave unica
        console.log(error);

        res.status(500).json({
            message: "ucurrio un problema en el servidor",
            data: []
        })
    }


}
export async function getAll(req, res) {
    try {
        const MImages = await MImage.findAll();
        res.json({
            data: MImages
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
        const MImage = await MImage.findOne({
            where: {
                id
            }
        });
        res.json({
            data: MImage
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
        const deleteRowCount = await MImage.destroy({
            where: {
                id
            }
        });
        if (deleteRowCount == 1) {
            res.json({
                data: "MImagen eliminada satifactoriamente",
                count: deleteRowCount
            });
        } else {
            res.json({
                data: "MImagen no encontrada",
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
        const { url, mplant_id } = req.body;
        // const plant = await Plant.findOne({
        //     where: {
        //         id
        //     }
        // });
        // console.log(plant);
        const deleted = await MImage.update({
            url,
            mplant_id,
        }, {
            where: {
                id
            }
        })
        if (deleted[0]) {
            res.json({
                message: "Imagen actualizada correctamente",
                data: { url, mplant_id }
            });
        } else {
            res.status(404).json({
                message: "Imagen no encontrada",
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

export async function getMImagesByPlant(req, res) {
    try {
        const { id } = req.params;
        const MImages = await MImage.findAll({
            where: {
                id
            }
        })
        res.json({
            data: MImages
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ocurrio un problema con el servidor",
            data: []
        })
    }

}