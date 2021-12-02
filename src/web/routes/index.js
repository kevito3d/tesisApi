import express from 'express';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { isAuthenticated } from '../../api/auth/index'
import { getAllF } from '../../api/controllers/plantController'

const router = Router();


router.get('/', async (req, res, next) => {

    var plants = await getAllF(req);
        return res.render('index', { title: "home", plants});

 /*    if (req.session.token) {
        console.log(req.session.token);
        var plants = await getAllF(req);
        return res.render('index', { title: "home", plants});
    } else {

        return res.render('signin')
    } */

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