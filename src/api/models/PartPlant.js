import Sequelize from "sequelize";
import { sequelize } from '../../database/database'

import Image from './Image'
const   PartPlant = sequelize.define("partplants", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    
    name: {
        type: Sequelize.STRING,
    },

    description: {
        type: Sequelize.STRING,
    },

    scientificname: {
        type: Sequelize.STRING,
        allowNull:true
    },

    idobservation: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

}, { timestamps: false })

PartPlant.hasMany(Image, { foreignKey: 'idpartplant', sourceKey: 'id' });
Image.belongsTo(PartPlant, { foreignKey: 'idpartplant', sourceKey: 'id' });



export default PartPlant;