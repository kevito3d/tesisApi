import express from 'express';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { isAuthenticated } from '../../api/auth/index'
import { getAllF } from '../../api/controllers/plantController'
import Image from '../../api/models/Image';
import PartPlant from '../../api/models/PartPlant';
import Plant from '../../api/models/Plant';
import User from '../../api/models/User';

const router = Router();


router.get('/user/:page?', async (req, res) => {
    var page = req.params.page || 1;

    if (page<1){
        page=1
    }
    var perPage = 8



    /* var plants = await getAllF(req);
        return res.render('index', { title: "home", plants}); */

    if (req.session.token) {
        try {
            const users = await User.findAndCountAll({
                offset: (page * perPage) - perPage, limit: perPage
            });
            console.log(users.rows);
            return res.render('user', { title: "home", users: users.rows,current:page,count: users.count , pages:Math.ceil(users.count / perPage), });

        } catch (error) {
            console.log(error);
            return ({
                message: "ocurrio un problema con el servidor",
            })
        }
    } else {

        return res.render('signin')
    }

});
router.get('/plant/:page?', async (req, res) => {

    var page = req.params.page || 1;

    if (page<1){
        page=1
    }
    var perPage = 7




    if (req.session.token) {
        try {
            const plants = await Plant.findAndCountAll({
                offset: (page * perPage) - perPage, limit: perPage
            });
            return res.render('index', { title: "home", plants: plants.rows,current:page,count: plants.count , pages:Math.ceil(plants.count / perPage), });

        } catch (error) {
            console.log(error);
            return ({
                message: "ocurrio un problema con el servidor",
            })
        }
    } else {

        return res.render('signin')
    }

});

router.get('/', async (req, res) => {

    

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