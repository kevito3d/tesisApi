import Sequelize from "sequelize";
import { sequelize } from '../../../config/database'
import Observation from "../Observation";
import PlantReference from "../PlantReference";

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

Canton.hasMany(PlantReference, { foreignKey: 'idcanton', sourceKey: 'id' });
PlantReference.belongsTo(Canton, { foreignKey: 'idcanton', sourceKey: 'id' });

Canton.hasMany(Observation, { foreignKey: 'idcanton', sourceKey: 'id' });
Observation.belongsTo(Canton, { foreignKey: 'idcanton', sourceKey: 'id' });




export default Canton;
