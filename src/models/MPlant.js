import Sequelize from "sequelize";
import { sequelize } from '../database/database'
import MImage from './MImage'
const MPlant = sequelize.define("mplants", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    names: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },

    latitud: {
        type: Sequelize.STRING,
        allowNull: false
    },
    longuitud: {
        type: Sequelize.STRING,
        allowNull: false
    },
    plant_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

}, { timestamps: false })

MPlant.hasMany(MImage, { foreignKey: 'plant_id', sourceKey: 'id' });
MImage.belongsTo(MPlant, { foreignKey: 'plant_id', sourceKey: 'id' });




export default MPlant;