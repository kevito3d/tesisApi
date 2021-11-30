import express  from "express";
import morgan from 'morgan';
import cors from 'cors'
import session from 'express-session'
import path from 'path';
import engine from 'ejs-mate';
import cookieParser from "cookie-parser";

//import rooutes
import index from './web/routes/index';
import plant from './api/routes/plant'
import images from './api/routes/image'
import MPlant from "./api/routes/mplant";
import MImage from './api/routes/mimage'

import user from './api/routes/user';



const app= express();


//setings
app.set('views', path.join(__dirname, './web/views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3001);
app.use(express.static(path.join(__dirname, './web/public')));

//middlewares
app.use(morgan('dev'))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });

app.use(express.json());
app.use(cors());
app.use(session({
  secret : "my secret key joptionpane 2.0",
  resave : false,
  saveUninitialized: true,
  cookie:{}
  
}))

//routes
app.use('/', index);
app.use('/api/plant', plant);
app.use('/api/image',images);
app.use('/api/mplant',MPlant);
app.use('/api/mimage',MImage);
app.use('/api/user', user);
/* para cualquier ruta que no exista */
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});
// app.use('/api/user',user)


export default app;