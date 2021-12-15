import Sequelize from "sequelize";
import { sequelize } from '../../../database/database'
import Parish from "./Parishs";


const Canton = sequelize.define("cantons", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    idprovince:{
        type:Sequelize.INTEGER,
        allowNull:null,
    }


}, { timestamps: false });

Canton.hasMany(Parish, { foreignKey: 'id', sourceKey: 'idcanton' });
Parish.belongsTo(Canton, { foreignKey: 'id', sourceKey: 'idcanton' });




export default Canton;
