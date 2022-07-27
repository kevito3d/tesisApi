import Sequelize from "sequelize";
import { sequelize } from '../../database/database'
import PartPlant from './PartPlant'
import Observation from './Observation'
import Image from './Image'
import PlantReference from "./PlantReference";
const Plant = sequelize.define("plants", {
    scientificname: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    descriptionalumnos:{
        type:Sequelize.STRING
    }
   

}, { timestamps: false })

 Plant.hasMany(PartPlant, { foreignKey: 'scientificname', sourceKey: 'scientificname'});
 PartPlant.belongsTo(Plant, { foreignKey: 'scientificname', sourceKey: 'scientificname' });
 
 Plant.hasMany(Observation, { foreignKey: 'scientificname', sourceKey: 'scientificname' });
 Observation.belongsTo(Plant, { foreignKey: 'scientificname', sourceKey: 'scientificname' });
 
 Plant.hasMany(Image, { foreignKey: 'scientificname', sourceKey: 'scientificname' });
 Image.belongsTo(Plant, { foreignKey: 'scientificname', sourceKey: 'scientificname' });
 
 Plant.hasMany(PlantReference, { foreignKey: 'scientificname', sourceKey: 'scientificname' });
 PlantReference.belongsTo(Plant, { foreignKey: 'scientificname', sourceKey: 'scientificname' });




export default Plant;