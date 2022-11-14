import Sequelize from "sequelize";
import 'dotenv/config'
export const sequelize = new Sequelize(
    process.env.db_name,
    process.env.db_user,
    process.env.db_password,
    {
        host: process.env.db_host,
        dialect: process.env.db,
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000,
        },
        logging: false
    }
)
