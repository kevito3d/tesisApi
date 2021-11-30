import Sequelize from 'sequelize';
import { sequelize } from '../../database/database'

// import Pets from './pet.model';

const User = sequelize.define('users', {
   
   /*  first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    }, */
    email: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
   /*  salt: {
        type: Sequelize.STRING
    } */
}, { timestamps: false })

// User.hasMany(Pets, { foreingKey: 'owner', sourceKey: 'id' })
// Pets.belongsTo(User, { foreingKey: 'owner', sourceKey: 'id' })

export default User;