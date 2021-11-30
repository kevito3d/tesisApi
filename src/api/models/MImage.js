import Sequelize from "sequelize";
import { sequelize } from '../../database/database'


const MImage = sequelize.define("mimages", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },

    mplant_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

}, { timestamps: false })

export default MImage;
