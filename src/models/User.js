import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

// import Pets from './pet.model';

const User = sequelize.define('users', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    }
}, { timestamps: false })

// User.hasMany(Pets, { foreingKey: 'owner', sourceKey: 'id' })
// Pets.belongsTo(User, { foreingKey: 'owner', sourceKey: 'id' })

export default User;