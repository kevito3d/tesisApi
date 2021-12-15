import Province from '../../models/references/Province';


export async function createParish(req, res) {
    const { id, name} = req.body;

    try {
        let newProvince = await Province.create({
            id,
            name,
        }, {
            fields: ['id', 'name', ]
        })
        if (newProvince) {
            return res.json({
                message: "Province insertada correctamente",
                data: newProvince
            })
        }

    } catch (error) {
        console.log(error);
        //si se suplica la llave unica
         console.log(error);
         let message = "ocurrio un problema con el servidor";
         if (error.original.code == 23505) {
             message = "id de provincia ya existe"
         };
 
         res.status(500).json({
             message,
         })
        

    }



   




}
export async function getAll(req, res) {
    try {
        const provinces = await Province.findAll();
        console.log(provinces);
        res.json({
            data: provinces
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
        const provinces = await Province.findOne({
            where: {
                id
            }
        });
        if (provinces) {
            res.json({
                data: provinces
            });
        } else {
            res.status(404).json({
                data: "Provincia no encontrada"
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
        const deleteRowCount = await Province.destroy({
            where: {
                id
            }
        });
        if (deleteRowCount == 1) {
            res.json({
                data: "provincia eliminada satifactoriamente",
                count: deleteRowCount
            });
        } else {
            res.status(404).json({
                data: "provincia no encontrada",
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
        const { name } = req.body;
        // const plant = await Plant.findOne({
        //     where: {
        //         id
        //     }
        // });
        // console.log(plant);
        const deleted = await Province.update({
            name,
        }, {
            where: {
                id
            }
        })
        console.log(deleted);
        if (deleted[0]) {
            res.json({
                message: "Province actualizada correctamente",
                data: { name }
            });
        } else {
            res.status(404).json({
                message: "Province no encontrada / body mal",
            });

        }

    } catch (error) {
        //si se suplica la llave unica
        console.log(error);
        let message = "ocurrio un problema con el servidor";
        if (error.original.code == 23503) {
            message = "no existe referencia de ese Province"
        };

        res.status(500).json({
            message,
        })
    }
}

