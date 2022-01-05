import Sequelize from "sequelize";
import { sequelize } from '../../database/database'
import Image from "./Image";

import PartPlant from './PartPlant'
const Observation = sequelize.define("observations", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },

    longitude: {
        type: Sequelize.FLOAT,
    },
    latitude: {
        type: Sequelize.FLOAT,
    },

    locality: {
        type: Sequelize.STRING,
    },

    checked: {
        type: Sequelize.BOOLEAN,
    },

    verified: {
        type: Sequelize.BOOLEAN,
    },

    ci:{
        type:Sequelize.STRING
    },

    idcanton: {
        type: Sequelize.INTEGER,
    },

    scientificname: {
        type: Sequelize.STRING,
        allowNull:false
    }


}, { timestamps: false })


Observation.hasMany(PartPlant, { foreignKey: 'idobservation', sourceKey: 'id'});
PartPlant.belongsTo(Observation, { foreignKey: 'idobservation', sourceKey: 'id' });

Observation.hasMany(Image, { foreignKey: 'idobservation', sourceKey: 'id' });
Image.belongsTo(Observation, { foreignKey: 'idobservation', sourceKey: 'id' });




export default Observation;