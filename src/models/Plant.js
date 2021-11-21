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
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    }

}, { timestamps: false })

Plant.hasMany(Image, { foreignKey: 'plant_id', sourceKey: 'id' });
Image.belongsTo(Plant, { foreignKey: 'plant_id', sourceKey: 'id' });


export default Plant;