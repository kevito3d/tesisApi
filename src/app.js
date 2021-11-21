import express  from "express";
import morgan from 'morgan';

//import rooutes
import plant from './routes/plant'
import images from './routes/image'

const app= express();

//middlewares
app.use(morgan('dev'))
app.use(express.json());

//routes
app.use('/api/plant', plant);
app.use('/app/image',images)


export default app;