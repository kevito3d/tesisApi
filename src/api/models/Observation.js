import Sequelize from "sequelize";
import { sequelize } from '../../database/database'

import PartPlant from './PartPlant'
const Observation = sequelize.define("observations", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },

    locale: {
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

    scientificname: {
        type: Sequelize.STRING,
        allowNull:false
    }


}, { timestamps: false })


Observation.hasMany(PartPlant, { foreignKey: 'idobservation', sourceKey: 'id'});
PartPlant.belongsTo(Observation, { foreignKey: 'idobservation', sourceKey: 'id' });




export default Observation;