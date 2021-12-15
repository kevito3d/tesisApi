import Canton from '../../models/references/Canton';


export async function createParish(req, res) {
    const { id, name, id } = req.body;

    try {
        let newParish = await Canton.create({
            id,
            name,
            idprovince
        }, {
            fields: ['id', 'name', 'idprovince']
        })
        if (newParish) {
            return res.json({
                message: "Canton insertada correctamente",
                data: newParish
            })
        }

    } catch (error) {
        console.log(error);
        //si se suplica la llave unica
         console.log(error);
         let message = "ocurrio un problema con el servidor";
         if (error.original.code == 23505) {
             message = "id de canton ya existe"
         };
 
         res.status(500).json({
             message,
         })
        

    }



   




}
export async function getAll(req, res) {
    try {
        const cantons = await Canton.findAll();
        console.log(cantons);
        res.json({
            data: cantons
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
        const cantons = await Canton.findOne({
            where: {
                id
            }
        });
        if (cantons) {
            res.json({
                data: cantons
            });
        } else {
            res.status(404).json({
                data: "canton no encontrada"
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
        const deleteRowCount = await Canton.destroy({
            where: {
                id
            }
        });
        if (deleteRowCount == 1) {
            res.json({
                data: "canton eliminada satifactoriamente",
                count: deleteRowCount
            });
        } else {
            res.status(404).json({
                data: "canton no encontrada",
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
        const { name, idprovince } = req.body;
        // const plant = await Plant.findOne({
        //     where: {
        //         id
        //     }
        // });
        // console.log(plant);
        const deleted = await Canton.update({
            name,
            idprovince,
        }, {
            where: {
                id
            }
        })
        console.log(deleted);
        if (deleted[0]) {
            res.json({
                message: "canton actualizada correctamente",
                data: { name, idprovince }
            });
        } else {
            res.status(404).json({
                message: "canton no encontrada / body mal",
            });

        }

    } catch (error) {
        //si se suplica la llave unica
        console.log(error);
        let message = "ocurrio un problema con el servidor";
        if (error.original.code == 23503) {
            message = "no existe referencia de ese canton"
        };

        res.status(500).json({
            message,
        })
    }
}

export async function getParishsByProvince(req, res) {
    try {
        const { idprovince } = req.params
        const cantons = await Canton.findAll({
            where: {
                idprovince
            }
        })
        if (cantons.length > 0) {
            res.json({
                data: cantons
            });
        } else {
            res.status(404).json({
                data: "provincia no encontrado"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ocurrio un problema con el servidor"
        })
    }
}

