//import { transporter } from "../../database/mailer";
import Image from "../models/Image";
import Observation from "../models/Observation";
import PartPlant from "../models/PartPlant";
import Canton from "../models/references/Canton";
import Province from "../models/references/Province";
import User from "../models/User";
import { Op } from 'sequelize'


export async function createObservation(req, res) {
    const { latitude, longitude, ci, scientificname, province, canton, locality } = req.body;
    console.log("provincia: ", province);
    console.log("canton: ", canton);
    
    try {
        const cantons = await Canton.findAll({
            where: {
                name: canton
            }
        })
        const prov = await Province.findOne({
            where: {
                name: province
            }
        })
        console.log("privincias: ", prov);
        console.log("lo que me llega en canton: ", canton);
        // console.log("Canton encontrado: ",cantons);
        let idcanton;
        if (cantons.length == 1) {
            idcanton = cantons[0].id;
        } else if (cantons.length > 1) {
            const prov = await Province.findOne({
                where: {
                    name: province
                }
            })
            console.log(prov);
            for (let index = 0; index < cantons.length; index++) {
                if (cantons[index].idprovince == prov.id) {
                    idcanton = cantons[index].id;
                    break;
                }

            };
        }
        if (idcanton == null) {
            const prov2 = await Canton.findOne({
                where: {

                    [Op.and]: [
                        { name: '' },
                        { idprovince: prov.id }
                    ]
                }

            })

            idcanton = prov2.id;

        }

        console.log(ci);
        console.log("id canton: ", idcanton);
        let newObservation = await Observation.create({
            latitude, longitude, ci, scientificname, locality, idcanton
        }, {
            fields: ['latitude', "longitude", 'ci', 'scientificname', 'locality', 'idcanton']
        })
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

            /*await transporter.sendMail({
                from: `"Plantas Utm 👻" <kcovena5034@utm.edu.ec>`, // sender address
                to: stringUsersMail, // list of receivers
                subject: "nueva observacion", // Subject line
                text: "se ha agregado una nueva observacion de planta", // plain text body
                html: `<b>clicke para verla </b> <a href='http://localhost:3000/observation/edit/:${newObservation.id}'>aqui</a>`, // html body
            });*/

            console.log('termina de enviar correos')
            
            return res.json({
                data: newObservation,
                message: "Observation insertada correctamente",
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
        const { locale, checked, verified, scientificname } = req.body;
        // const plant = await Plant.findOne({
        //     where: {
        //         id
        //     }
        // });
        // console.log(plant);
        const observationUpdated = await Observation.update({
            locale, checked, verified, scientificname
        }, {
            where: {
                id
            }
        })
        if (observationUpdated[0]) {
            res.json({
                message: "Observation actualizada correctamente",
                data: { locale, checked, verified, scientificname }
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

