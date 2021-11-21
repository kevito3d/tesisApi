import Plant from "../models/Plant";

export async function createPlant(req, res) {
    const { scientific_name, name, descripcion } = req.body;
    try {
        let newPlant = await Plant.create({
            scientific_name,
            name,
            descripcion
        },{
            fields: ['scientific_name' , 'name', 'descripcion']
        })
        if (newPlant) {
            return res.json({
                message: "Planta insertada correctamente",
                data:newPlant
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "ocurrio un problema con el servidor",
            data: []
        })
    }
}