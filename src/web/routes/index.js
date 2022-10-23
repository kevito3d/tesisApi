import { Router } from "express";
import Image from "../../api/models/Image";
import PartPlant from "../../api/models/PartPlant";
import Plant from "../../api/models/Plant";
import Province from "../../api/models/references/Province";
import User from "../../api/models/User";
import Cantons from "../../api/models/references/Canton";
import { getAllF } from "../../api/controllers/plantReference";
import Observation from "../../api/models/Observation";
import Canton from "../../api/models/references/Canton";
import PlantReference from "../../api/models/PlantReference";

import { ifExist, signToken } from "../../api/controllers/userController";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

//plant
router.get("/plant/:page?", async (req, res) => {
  console.log("la ptdreeeeeeeeeeeeeeeeeeeeeeee");
  // if (req.session.token) {
  let page = req.params.page || 1;

  if (isNaN(page)) {
    return res.redirect("/");
  }
  console.log("pague xd: ", page);
  if (page < 1) {
    page = 1;
  }
  var perPage = 7;

  try {
    const plants = await Plant.findAndCountAll({
      offset: page * perPage - perPage,
      limit: perPage,
    });
    return res.render("index", {
      title: "home",
      plants: plants.rows,
      current: page,
      count: plants.count,
      pages: Math.ceil(plants.count / perPage),
    });
  } catch (error) {
    console.log(error);
    return {
      message: "ocurrio un problema con el servidor",
    };
  }
  // } else {
  //   return res.redirect("/");
  // }
});
router.get("/add/plant", async (req, res) => {
  // let decoder = new TextDecoder('utf-8');
  // if (req.session.token) {
  const provinces = await Province.findAll({
    include: [{ model: Cantons }],
    order: [["name", "ASC"]],
  });
  //console.log(provinces);
  res.render("addPlants", { title: "Agregar", provinces });
  // } else {
  //   return res.redirect("/");
  // }
});

router.get("/plant/edit/:scientificname", async (req, res) => {
  // if (req.session.token) {
  try {
    const { scientificname } = req.params;

    let plant = {};
    const p = await Plant.findOne({
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
          model: PlantReference,
        },
      ],
    });
    if (p) {
      plant.name = p.name;
      plant.description = p.description;
      plant.scn = p.scientificname;
      plant.descriptionalumnos = p.descriptionalumnos;
      plant.images = p.images;
      console.log({ alumno: p.descriptionalumnos });
      console.log(plant.images);
      plant.parts = p.partplants;
      const reference = await getAllF(p.scientificname);
      plant.reference = reference;
      const provinces = await Province.findAll({
        include: [{ model: Cantons }],
        order: [["name", "ASC"]],
      });

      return res.render("editPlant", {
        title: "Edita Planta",
        provinces,
        plant,
      });
    }else
    {
      return res.redirect("/plant");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "ocurrio un problema con el servidor",
      data: [],
    });
  }
  // } else {
  //   return res.redirect("/");
  // }
});

//observation
router.get("/observation/:page?", async (req, res) => {
  console.log("entro");
  if (req.session.token) {
    let page = req.params.page || 1;
    if (isNaN(page)) {
      return res.redirect("/observation");
    }
    if (page < 1) {
      page = 1;
    }
    let perPage = 8;
    /* if (req.session.token) { */
    try {
      const observations = await Observation.findAndCountAll({
        offset: page * perPage - perPage,
        limit: perPage,
        include: [
          {
            model: Canton,
            include: {
              model: Province,
            },
          },
        ],
      });
      console.log("observations: ", observations.rows);
      return res.render("observation", {
        title: "home",
        observations: observations.rows,
        current: page,
        count: observations.count,
        pages: Math.ceil(observations.count / perPage),
      });
    } catch (error) {
      console.log(error);
      return {
        message: "ocurrio un problema con el servidor",
      };
    }
  } else {
    return res.redirect("/");
  }
  /*  } else {
 
         return res.render('signin')
     } */
});

router.get("/observation/edit/:id", async (req, res) => {
  if (req.session.token) {
    try {
      const { id } = req.params;
      const obs = await Observation.findByPk(id, {
        include: [
          {
            model: PartPlant,
            include: { model: Image },
          },
          {
            model: Image,
          },
        ],
      });
      console.log("partes:", obs.partplants);
      return res.render("editObservation", { obs, title: "Observacion" });
    } catch (error) {}
  } else {
    return res.redirect("/");
  }
});

//user
router.get("/user/:page?", async (req, res) => {
  if (req.session.token) {
    let page = req.params.page || 1;

    if (isNaN(page)) {
      return res.redirect("/user");
    }
    console.log(page);
    if (page < 1) {
      page = 1;
    }
    let perPage = 8;

    /* var plants = await getAllF(req);
            return res.render('index', { title: "home", plants}); */

    /* if (req.session.token) { */
    try {
      const users = await User.findAndCountAll({
        offset: page * perPage - perPage,
        limit: perPage,
      });
      console.log(users.rows);
      return res.render("user", {
        title: "home",
        users: users.rows,
        current: page,
        count: users.count,
        pages: Math.ceil(users.count / perPage),
      });
    } catch (error) {
      console.log(error);
      return {
        message: "ocurrio un problema con el servidor",
      };
    }
  } else {
    return res.redirect("/");
  }
});

router.post("/login", async (req, res, next) => {
  const { email, ci, password } = req.body;
  console.log(email, password);

  const userExist = await ifExist(ci, email);

  if (userExist) {
    console.log(userExist.dataValues);
    if (userExist.role != "admin") {
      return res.status(403).json({
        message: "dont permission",
      });
    }
    // let passwordHash = await bcryptjs.hash(password, 8); //esto es para guardarla
    let compare = await bcryptjs.compare(password, userExist.password);
    console.log("compare ", compare);
    if (compare) {
      const token = signToken(userExist.ci);
      req.session.token = token;
      const { password, ...user } = userExist.dataValues;
      console.log("user : ", user);
      return res.status(200).json({
        user,
        token,
        message: "correct credentials",
      });
    } else {
      return res.status(404).json({
        message: "password dont match",
      });
    }
  } else {
    return res.status(404).json({
      message: "user not found",
    });
  }
});

router.post("/logout", async (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.get("/", (req, res) => {
  if (req.session.token) {
    res.redirect("/plant");
  } else {
    return res.render("signin");
  }
});

//form to access
/* router.get('/signin', (req, res, next) => {
    console.log()
    if(req.session.token){
        return res.render('index');
    }
    return res.render('signin');
}) */

// form to register

router.get("/reset-password", (req, res) => {
  res.render("resetInterface");
});

router.post("/reset-password/:token", async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;
  jwt.verify(token, process.env.secret_reset, async (err, decoded) => {
    if (err) {
      console.log("invalido");
      return res.render("signin", { message: "link invalido o expirado..!" });
    } else {
      const { ci } = decoded;
      console.log("asd");
      const user = await ifExist(ci, ci);
      let passwordHash = await bcryptjs.hash(newPassword, 8);
      user.password = passwordHash;
      const updatedUser = await User.update(
        { password: passwordHash },
        { where: { ci } }
      );
      if (updatedUser[0]) {
        console.log("se cambio");
        return res.redirect("/");
      } else {
        console.log("no se cambio");
        return res.redirect("/");
      }
    }
  });
});

router.get("/reset-password/:token", async (req, res, next) => {
  const { token } = req.params;
  let identification = null;
  jwt.verify(token, process.env.secret_reset, async (err, decoded) => {
    if (err) {
      res.render("resetPassword", { identification });
    } else {
      const { ci } = decoded;
      console.log(ci);
      const user = await ifExist(ci, ci);
      console.log(user.dataValues);
      if (user.dataValues) {
        identification = user.dataValues.ci;
      }
      res.render("resetPassword", { identification });
    }
  });
});

export default router;
