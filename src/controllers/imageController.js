import Image from '../models/Image';
export async function createImage(req, res) {
    
    const { url,plant_id } = req.body;
    try {
        let newImage = await Image.create({
            url,
            plant_id,
        }, {
            fields: ['url', 'plant_id']
        })
        if (newImage) {
            return res.json({
                message: "Imagen insertada correctamente",
                data: newImage
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
        const images = await Image.findAll();
        res.json({
            data: images
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
        const image = await Image.findOne({
            where: {
                id
            }
        });
        res.json({
            data: image
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
        const deleteRowCount = await Image.destroy({
            where: {
                id
            }
        });
        if (deleteRowCount == 1) {
            res.json({
                data: "Imagen eliminada satifactoriamente",
                count: deleteRowCount
            });
        } else {
            res.json({
                data: "Imagen no encontrada",
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
        const { url, plant_id } = req.body;
        // const plant = await Plant.findOne({
        //     where: {
        //         id
        //     }
        // });
        // console.log(plant);
        const deleted = await Image.update({
            url,
            plant_id,
        }, {
            where: {
                id
            }
        })
        if (deleted[0]) {
            res.json({
                message: "Imagen actualizada correctamente",
                data: { url, plant_id }
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

export async function getImagesByPlant(req, res) {
    
}