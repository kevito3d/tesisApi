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

    scientificname: {
        type: Sequelize.STRING,
    },

    idpartplant:{
        type:Sequelize.INTEGER
    }

}, { timestamps: false })



export default Image;
