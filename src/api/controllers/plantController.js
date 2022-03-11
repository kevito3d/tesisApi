import slug from "slug";
import { Op } from "sequelize";

import Plant from "../models/Plant";
// import { getImagesByPlantForController } from './imageController'
import PartPlant from "../models/PartPlant";
import Image from "../models/Image";
import Observation from "../models/Observation";
import Canton from "../models/references/Canton";
import PlantReference from "../models/PlantReference";
import { deleteImages } from "./imageController";

export async function createPlant(req, res) {
  const { scientificname, name, description } = req.body;
  console.log(req.body);
  // const url = 'uploads/'+req.file.originalname;
  let nc_ = slug(scientificname, "_");
  nc_ = nc_.replace(" ", "");
  console.log(nc_);
  try {
    let newPlant = await Plant.create({
      scientificname: nc_,
      name,
      description,
    });
    if (newPlant) {
      return res.json({
        message: "Planta insertada correctamente",
        data: newPlant,
      });
    }
  } catch (error) {
    //si se suplica la llave unica
    console.log(error);
    let message = "ocurrio un problema con el servidor";
    if (error.original.code == 23505) {
      message = "nombre cientifico ya existente";
    }

    res.status(500).json({
      message,
      data: [],
    });
  }
}
export async function getAll(req, res) {
  try {
    const plants = await Plant.findAll({
      include: [
        {
          model: PartPlant,
          include: {
            model: Image,
          },
        },
        {
          model: Image,
        },
        {
          model: Observation,
        },
        {
          model: PlantReference,
          include: {
            model: Canton,
          },
        },
      ],
    });
    console.log("plantas retornadas: ", plants);
    res.json({
      data: plants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "ocurrio un problema con el servidor",
      data: [],
    });
  }
}

export async function getAllFilter(req, res) {
  try {
    const { filter } = req.params;
    console.log(filter);
    const plants = await Plant.findAll({
      where: {
        [Op.or]: {
          name: {
            [Op.like]: `%${filter}%`,
          },
          scientificname: {
            [Op.like]: `%${filter}%`,
          },
        },
      },
    });
    return res.json({
      data: plants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "ocurrio un problema con el servidor",
      data: [],
    });
  }
}
//get all front
/* export async function getAllF(req) {
    try {
        const plants = await Plant.findAll({
            include: {
                model: PartPlant
            }
        });

        return plants

    } catch (error) {
        console.log(error);
        return ({
            message: "ocurrio un problema con el servidor",
        })
    }
} */

export async function getOne(req, res) {
  try {
    const { scientificname } = req.params;
    // console.log(id);
    const plant = await Plant.findOne({
      where: {
        scientificname,
      },
      include: [
        {
          model: PartPlant,
          include: {
            model: Image,
          },
        },
        {
          model: Image,
        },
        {
          model: Observation,
        },
        {
          model: PlantReference,
        },
      ],
    });
    if (plant) {
      res.json({
        data: plant,
      });
    } else {
      res.status(404).json({
        data: "Planta no encontrada",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "ocurrio un problema con el servidor",
      data: [],
    });
  }
}

export async function deleteOne(req, res) {
  try {
    const { scientificname } = req.params;
    const plant = await Plant.findOne({
      where: {
        scientificname,
      },
      include: [
        {
          model: PartPlant,
          include: {
            model: Image,
          },
        },
        {
          model: Image,
        },
      ],
    });

    if (plant.images.length > 0) {
      plant.images.forEach((element) => {
        deleteImages(element.url);
      });
    }
    if (plant.partplants.length > 0) {
      plant.partplants.forEach((element) => {
        if (element.images.length > 0) {
          element.images.forEach((e) => {
            deleteImages(e.url);
          });
        }
      });
    }
    const deleteRowCount = await Plant.destroy({
      where: {
        scientificname,
      },
    });
    if (deleteRowCount == 1) {
      res.json({
        data: "Planta eliminada satifactoriamente",
        count: deleteRowCount,
      });
    } else {
      res.status(404).json({
        data: "Planta no encontrada",
        count: deleteRowCount,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "ocurrio un problema con el servidor",
      error,
    });
  }
}

export async function setOne(req, res) {
  try {
    const { scientificnameU } = req.params;
    const { scientificname, name, description } = req.body;
    // const plant = await Plant.findOne({
    //     where: {
    //         id
    //     }
    // });
    // console.log(plant);

    let nc_ = slug(scientificname, "_");
    nc_ = nc_.replace(" ", "");
    console.log(nc_);
    const plantUpdated = await Plant.update(
      {
        scientificname: nc_,
        name,
        description,
      },
      {
        where: {
          scientificname: scientificnameU,
        },
      }
    );
    if (plantUpdated[0]) {
      res.json({
        message: "Planta actualizada correctamente",
        data: { scientificname: nc_, name, description },
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
      data: [],
    });
  }
}
