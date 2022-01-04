import express from 'express';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { isAuthenticated } from '../../api/auth/index'
import Image from '../../api/models/Image';
import PartPlant from '../../api/models/PartPlant';
import Plant from '../../api/models/Plant';
import Province from '../../api/models/references/Province';
import User from '../../api/models/User';
import Cantons from "../../api/models/references/Canton";
import {getAllF} from '../../api/controllers/PlantReference';
import Observation from '../../api/models/Observation';
import Canton from '../../api/models/references/Canton';
import PlantReference from '../../api/models/PlantReference';

const router = Router();


router.get('/user/:page?', async (req, res) => {
    let page = req.params.page || 1;
    console.log(page);
    if (page < 1) {
        page = 1
    }
    let perPage = 8



    /* var plants = await getAllF(req);
        return res.render('index', { title: "home", plants}); */

    /* if (req.session.token) { */
        try {
            const users = await User.findAndCountAll({
                offset: (page * perPage) - perPage, limit: perPage
            });
            console.log(users.rows);
            return res.render('user', { title: "home", users: users.rows, current: page, count: users.count, pages: Math.ceil(users.count / perPage), });

        } catch (error) {
            console.log(error);
            return ({
                message: "ocurrio un problema con el servidor",
            })
        }
   /*  } else {

        return res.render('signin')
    } */

});

router.get('/observation/:page?', async (req,res) =>{
    let page = req.params.page || 1;
    console.log(page);
    if (page < 1) {
        page = 1
    }
    let perPage = 8
    /* if (req.session.token) { */
        try {
            const observations = await Observation.findAndCountAll({
                offset: (page * perPage) - perPage, limit: perPage,
                include:[
                    /* {model:} */
                ]
            });
            return res.render('observation', { title: "home", observarions: observations.rows, current: page, count: observations.count, pages: Math.ceil(observations.count / perPage), });

        } catch (error) {
            console.log(error);
            return ({
                message: "ocurrio un problema con el servidor",
            })
        }
   /*  } else {

        return res.render('signin')
    } */
})
router.get('/plant/edit/:scientificname', async (req, res) => {
    try {
        const { scientificname } = req.params;
        const provinces = await Province.findAll({
            include: [
                { model: Cantons }
            ],
            order: [
                ['name', 'ASC'],
            ],
        });
        let plant = {};
        const p = await Plant.findOne({
            where: {
                scientificname
            },
            include: [
                {
                    model: PartPlant
                },
                {
                    model: Image
                },
                {
                    model: Observation
                },
                {
                    model: PlantReference
                },

            ],
        });
        plant.name = p.name;
        plant.description = p.description;
        plant.scn = p.scientificname;
        plant.images = p.images
        console.log(p.description);
        
        plant.parts = await PartPlant.findAll({
            where: {
                scientificname: p.scientificname
            },
            include: {
                model: Image
            }
        })
        const reference = await getAllF(p.scientificname);
        plant.reference = reference;
        /* 
        console.log("references");
        console.log(plant.reference); */
        /* console.log(p.dataValues.plantsreferences);
        console.log("imprimiendo longuitud de images: ", plant.images.length); */
        const {viewImages} = require('../../public/js/helper')
        return res.render('editPlant', { title: "Edita Planta", provinces, plant, viewImages });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "ocurrio un problema con el servidor",
            data: []
        })
    }


});


router.get('/plant/:page?', async (req, res) => {

    let page = req.params.page || 1;
    console.log(page);
    if (page < 1) {
        page = 1
    }
    var perPage = 7




    // if (req.session.token) {
    try {
        const plants = await Plant.findAndCountAll({
            offset: (page * perPage) - perPage, limit: perPage
        });
        return res.render('index', { title: "home", plants: plants.rows, current: page, count: plants.count, pages: Math.ceil(plants.count / perPage), });

    } catch (error) {
        console.log(error);
        return ({
            message: "ocurrio un problema con el servidor",
        })
    }
    // } else {

    //     return res.render('signin')
    // }

});


router.post('/logout', async (req, res) => {
    req.session.destroy();
    res.redirect("/")

})

router.get('/', (req, res) => {



    /* var plants = await getAllF(req);
        return res.render('index', { title: "home", plants}); */

    if (req.session.token) {
        res.redirect("/plant")
    } else {

        return res.render('signin')
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
router.get('/signup', isAuthenticated, (req, res, next) => {
    if (req.session.role == 'admin') {

        return res.render('signup')
    } else {
        return res.redirect('/')
    }
})






export default router;