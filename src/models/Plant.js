import Sequelize from "sequelize";
import { sequelize } from '../database/database'
import Image from './Image'
const Plant = sequelize.define("plants", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    scientific_name: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.TEXT
    }

}, { timestamps: false })

Plant.hasMany(Image, { foreignKey: 'plantId', sourceKey: 'id' });
Image.belongsTo(Plant, { foreignKey: 'plantId', sourceKey: 'id' });


export default Plant;