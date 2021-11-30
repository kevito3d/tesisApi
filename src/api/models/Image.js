import Sequelize from "sequelize";
import { sequelize } from '../../database/database'


const Image = sequelize.define("images", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    plant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }

}, { timestamps: false })

export default Image;
