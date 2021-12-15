import Image from '../models/Image';


export async function createImage(req, res) {
    

    const files = req.files;
    const { scientificname, idpartplant, idobservation } = req.body;
    const newImages = []
    const urls = [];
    const urlsNO = [];
    let banderaError = false;

    

    for (const file of files) {
        const url = 'uploads/' + file.originalname;
        
        try {
            let newImage =  await Image.create({
                url,
                scientificname,
                idpartplant,
                idobservation
            }, {
                fields: ['url', 'scientificname', 'idpartplant','idobservation']
            })
            
            if (newImage) {
                newImages.push(newImage.dataValues);
                urls.push(file.originalname);
                /*  return res.json({
                     message: "Imagen insertada correctamente",
                     data: newImage
                 }) */
            }

        } catch (error) {
            console.log(error);
             //si se suplica la llave unica
            /*  console.log(error);
             let message = "ocurrio un problema con el servidor";
             if (error.original.code == 23503) {
                 message = "no existe referencia de esa planta o parte de plant"
             };
 
             res.status(500).json({
                 message,
             }) */
            banderaError = true;
            urlsNO.push(file.originalname);

        }



    };
    if (!banderaError) {
        return res.json({
            message: "Imagenes insertadas correctamente",
            data: newImages
        })
    } else {
        return res.status(206).json({
            si: urls,
            no: urlsNO
        })
    }




}
export async function createImageObservation(req, res) {
    

    const files = req.files;
    const { scientificname, idpartplant, idobservation } = req.body;
    const newImages = []
    const urls = [];
    const urlsNO = [];
    let banderaError = false;
    console.log(files.length);

    for (const file of files) {
        const url = 'uploads/' + file.originalname;
        console.log(url);
        try {
            let newImage =  await Image.create({
                url,
                scientificname,
                idpartplant,
                idobservation
            }, {
                fields: ['url', 'scientificname', 'idpartplant','idobservation']
            })
            console.log(newImage);
            if (newImage) {
                newImages.push(newImage.dataValues);
                urls.push(file.originalname);
                /*  return res.json({
                     message: "Imagen insertada correctamente",
                     data: newImage
                 }) */
            }

        } catch (error) {
            console.log(error);
             //si se suplica la llave unica
            /*  console.log(error);
             let message = "ocurrio un problema con el servidor";
             if (error.original.code == 23503) {
                 message = "no existe referencia de esa planta o parte de plant"
             };
 
             res.status(500).json({
                 message,
             }) */
            banderaError = true;
            urlsNO.push(file.originalname);

        }



    };
    if (!banderaError) {
        return res.json({
            message: "Imagenes insertadas correctamente",
            data: newImages
        })
    } else {
        return res.status(206).json({
            si: urls,
            no: urlsNO
        })
    }




}
export async function getAll(req, res) {
    try {
        const images = await Image.findAll();
        console.log(images);
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
        console.log(id);
        const image = await Image.findOne({
            where: {
                id
            }
        });
        if (image) {
            res.json({
                data: image
            });
        } else {
            res.status(404).json({
                data: "Imagen no encontrada"
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
            res.status(404).json({
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
        const { url, scientificname, idpartplant } = req.body;
        // const plant = await Plant.findOne({
        //     where: {
        //         id
        //     }
        // });
        // console.log(plant);
        const deleted = await Image.update({
            url,
            scientificname,
            idpartplant
        }, {
            where: {
                id
            }
        })
        console.log(deleted);
        if (deleted[0]) {
            res.json({
                message: "Imagen actualizada correctamente",
                data: { url, plant_id }
            });
        } else {
            res.status(404).json({
                message: "Imagen no encontrada / body mal",
            });

        }

    } catch (error) {
        //si se suplica la llave unica
        console.log(error);
        let message = "ocurrio un problema con el servidor";
        if (error.original.code == 23503) {
            message = "no existe referencia de esa planta"
        };

        res.status(500).json({
            message,
        })
    }
}

export async function getImagesByPlant(req, res) {
    try {
        const { scientificname } = req.params
        const images = await Image.findAll({
            where: {
                scientificname
            }
        })
        if (images.length > 0) {
            res.json({
                data: images
            });
        } else {
            res.status(404).json({
                data: "Planta no encontrada"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ocurrio un problema con el servidor"
        })
    }
}

export async function getImagesByPart(req, res) {
    try {
        const { idpartplant } = req.params
        const images = await Image.findAll({
            where: {
                idpartplant
            }
        })
        if (images.length > 0) {
            res.json({
                data: images
            });
        } else {
            res.status(404).json({
                data: "Planta no encontrada"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ocurrio un problema con el servidor"
        })
    }
}