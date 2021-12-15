import Sequelize from "sequelize";
import { sequelize } from '../../../database/database'
import PlantReference from "../PlantReference";


const Parish = sequelize.define("parishs", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    idcanton:{
        type:Sequelize.INTEGER,
        allowNull:null,
    }


}, { timestamps: false });

Parish.hasMany(PlantReference, { foreignKey: 'idparish', sourceKey: 'id' });
PlantReference.belongsTo(Parish, { foreignKey: 'idparish', sourceKey: 'id' });




export default Parish;
