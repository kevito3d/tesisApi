import Parish from '../../models/references/Parishs';


export async function createParish(req, res) {
    const { id, name, idcanton } = req.body;

    try {
        let newParish = await Parish.create({
            id,
            name,
            idcanton
        }, {
            fields: ['id', 'name', 'idcanton']
        })
        if (newParish) {
            return res.json({
                message: "parroquia insertada correctamente",
                data: newParish
            })
        }

    } catch (error) {
        console.log(error);
        //si se suplica la llave unica
         console.log(error);
         let message = "ocurrio un problema con el servidor";
         if (error.original.code == 23505) {
             message = "id de parroquia ya existente"
         };
 
         res.status(500).json({
             message,
         })
        

    }



   




}
export async function getAll(req, res) {
    try {
        const parishs = await Parish.findAll();
        console.log(parishs);
        res.json({
            data: parishs
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
        const parish = await Parish.findOne({
            where: {
                id
            }
        });
        if (parish) {
            res.json({
                data: parish
            });
        } else {
            res.status(404).json({
                data: "parroquia no encontrada"
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
        const deleteRowCount = await Parish.destroy({
            where: {
                id
            }
        });
        if (deleteRowCount == 1) {
            res.json({
                data: "parroquia eliminada satifactoriamente",
                count: deleteRowCount
            });
        } else {
            res.status(404).json({
                data: "parroquia no encontrada",
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
        const { name, idcanton } = req.body;
        // const plant = await Plant.findOne({
        //     where: {
        //         id
        //     }
        // });
        // console.log(plant);
        const deleted = await Parish.update({
            name,
            idcanton,
        }, {
            where: {
                id
            }
        })
        console.log(deleted);
        if (deleted[0]) {
            res.json({
                message: "parroquia actualizada correctamente",
                data: { name, idcanton }
            });
        } else {
            res.status(404).json({
                message: "parroquia no encontrada / body mal",
            });

        }

    } catch (error) {
        //si se suplica la llave unica
        console.log(error);
        let message = "ocurrio un problema con el servidor";
        if (error.original.code == 23503) {
            message = "no existe referencia de esa parroquia"
        };

        res.status(500).json({
            message,
        })
    }
}

export async function getParishsByCanton(req, res) {
    try {
        const { idcanton } = req.params
        const parishs = await Parish.findAll({
            where: {
                idcanton
            }
        })
        if (parishs.length > 0) {
            res.json({
                data: parishs
            });
        } else {
            res.status(404).json({
                data: "canton no encontrado"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ocurrio un problema con el servidor"
        })
    }
}

