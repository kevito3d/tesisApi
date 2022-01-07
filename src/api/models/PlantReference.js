import Sequelize from "sequelize";
import { sequelize } from '../../database/database'


const PlantReference = sequelize.define("plantsreferences", {

    idcanton: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    scientificname: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    locality: {
        type: Sequelize.STRING,
    },
    


}, { timestamps: false });





export default PlantReference;
