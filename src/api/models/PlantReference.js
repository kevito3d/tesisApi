import Sequelize from "sequelize";
import { sequelize } from '../../database/database'


const PlantReference = sequelize.define("plantsreferences", {

    idparish: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    scientificname: {
        type: Sequelize.STRING,
    },
    


}, { timestamps: false });





export default PlantReference;
