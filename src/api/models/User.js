import Sequelize from 'sequelize';
import { sequelize } from '../../config/database'

import Observation from './Observation';

const User = sequelize.define('users', {
    ci: {
        type: Sequelize.STRING,
        primaryKey: true
    },

    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        
    },
    phone: {
        type: Sequelize.STRING,
    },
    role:{
        type:Sequelize.STRING
    },
    
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
     
}, { timestamps: false })

User.hasMany(Observation, { foreignKey: 'ci', sourceKey: 'ci' })
Observation.belongsTo(User, { foreignKey: 'ci', sourceKey: 'ci' })

export default User;