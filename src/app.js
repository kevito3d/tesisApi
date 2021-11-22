import express  from "express";
import morgan from 'morgan';
import cors from 'cors'

//import rooutes
import plant from './routes/plant'
import images from './routes/image'
import MPlant from "./routes/mplant";
import user from "./models/User";

const app= express();

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

//routes
app.use('/api/plant', plant);
app.use('/api/image',images);
app.use('/api/mplant',MPlant);
// app.use('/api/user',user)


export default app;