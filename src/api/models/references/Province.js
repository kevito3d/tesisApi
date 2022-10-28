import Sequelize from "sequelize";
import { sequelize } from '../../../config/database'
import Canton from "./Canton";


const Province = sequelize.define("provinces", {
    id: {
        type: Sequelize.INTEGER ,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },



}, {
    // client_encoding: 'UTF8',
    // collate: 'utf8_unicode_ci',
    timestamps: false,


});

Province.hasMany(Canton, { foreignKey: 'idprovince', sourceKey: 'id' });
Canton.belongsTo(Province, { foreignKey: 'idprovince', sourceKey: 'id' });




export default Province;
