import { transporter } from "../../config/mailer";
import Image from "../models/Image";
import Observation from "../models/Observation";
import PartPlant from "../models/PartPlant";
import User from "../models/User";


export async function createObservation(req, res) {
    const { latitude, longitude, ci, scientificname, idcanton, locality } = req.body;
    console.log("canton: ", idcanton);
    const stated = "pendiente";
    
    try {
        
        

        let newObservation = await Observation.create({
            latitude, longitude, ci, scientificname, locality,idcanton, stated
        }, {
            fields: ['latitude', "longitude", 'ci', 'scientificname', 'locality', 'idcanton', "stated"]
            
        })
        console.log({ newObservation});
        if (newObservation) {
            const users = await User.findAll({
                where: {
                    role: 'admin'
                }
            })
            let emails = []
            for (let index = 0; index < users.length; index++) {
                emails.push(users[index].email);
            }
            const stringUsersMail = emails.join(', ')

            console.log("emails concatenados : " + stringUsersMail);
            try {
                
                await transporter.sendMail({
                    from: `"Plantas Utm 👻" <${process.env.email}>`, // sender address
                    to: stringUsersMail, // list of receivers
                    subject: "nueva observación", // Subject line
                    text: `Se ha agregado una nueva observación de la planta con nombre cientifico: '${scientificname}' con el código: ${newObservation.id} reportado por estudiante con cédula: '${ci}'`, // plain text body
                    });
    
                console.log('termina de enviar correos')
            } catch (error) {
                console.log(error)
            }
            
            return res.json({
                data: newObservation,
                message: "Observación insertada correctamente",
            })
        }

    } catch (error) {
        //si se la llave foranea no existe
        console.log(error);
        let message = "ocurrio un problema con el servidor";
        if (error.original.code == 23503) {
            message = "no existe referencia de esa Planta"
        };

        res.status(500).json({
            message,
            data: []
        })
    }
}
export async function getAll(req, res) {
    try {

        const observations = await Observation.findAll({
            include: [
                { model: PartPlant },
                { model: Image }
            ]
        });
        res.json({
            data: observations
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
        const observation = await Observation.findOne({
            where: {
                id
            },
            include: [{
                model: PartPlant
            }, {
                model: Image
            }]
        });
        if (observation) {
            res.json({
                data: observation
            });
        } else {
            res.status(404).json({
                data: "Observation no encontrada"
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
    console.log("hola mundo de mar: ");
    try {
        const { id } = req.params;
        const deleteRowCount = await Observation.destroy({
            where: {
                id
            }
        });
        if (deleteRowCount == 1) {
            res.json({
                data: "Observation eliminada satifactoriamente",
                count: deleteRowCount
            });
        } else {
            res.status(404).json({
                data: "Observation no encontrada",
                count: deleteRowCount
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

export async function setOne(req, res) {
    try {
        const { id } = req.params;
        const { stated} = req.body;
        // const plant = await Plant.findOne({
        //     where: {
        //         id
        //     }
        // });
        // console.log(plant);
        const observationUpdated = await Observation.update({
            stated
        }, {
        where: {
                id
            }
        })
        if (observationUpdated[0]) {
            res.json({
                message: "Observation actualizada correctamente",
                stated
            });
        } else {
            res.status(404).json({
                message: "Observation no encontrada",
            });

        }

    } catch (error) {
        //si se suplica la llave unica
        console.log(error);
        let message = "ocurrio un problema con el servidor";
        if (error.original.code == 23503) {
            message = "no existe referencia de esa Observation"
        };

        res.status(500).json({
            message,
        })
    }
}



export async function getObservationByPlant(req, res) {
    try {
        const { scientificname } = req.params;
        const observations = await Observation.findAll({
            where: {
                scientificname
            }
        })
        if (observations.length > 0) {
            console.log(observations);
            res.json({
                data: observations
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

