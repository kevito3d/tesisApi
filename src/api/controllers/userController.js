import User from "../models/User";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
const { Op } = require("sequelize");

export const signToken = (ci) => {
    return jwt.sign({
        ci
    }, 'mi-secreto', {
        expiresIn: 60 * 60 * 24 * 365
    });
}

//TODO si el tocken vence hacer que en el fron lo redirecione tengoq ue hacer que el token exipe en menos tiempo para probar eso
export const login = async (req, res, next) => {
    const {
        email,
        ci,
        password
    } = req.body;
    console.log(email, password);

    const userExist = await ifExist(ci, email);

    if (userExist) {
        console.log("user: ",userExist.dataValues);
        console.log("user: ",userExist.dataValues.password.length);
        // let passwordHash = await bcryptjs.hash(password, 8); //esto es para guardarla
        let compare = await bcryptjs.compare(password, userExist.password);
        console.log("compare ", compare);
        if (compare) {
            const token = signToken(userExist.ci);
            req.session.token = token;
            const { password, ...user } = userExist.dataValues;
            console.log("user : ", user);
            return res.status(200).json({
                user,
                token,
                message: "correct credentials"
            });
        } else {
            return res.status(404).json({
                message: "password dont match",
            });
        }
    } else {
        return res.status(404).json({
            message: "user not found",
        });
    }
}

export const ifExist = async (ci, email) => {

    const user = await User.findOne({
        where: {// and
            [Op.or]: [
                { email: email },
                { ci: ci }
              ]
        }
    });
    return user;
}


export const createUser = async (req, res) => {
    const {
        ci,
        firstname,
        lastname,
        email,
        phone,
        role,  
        password, } = req.body;

    try {
        const userExist = await ifExist(ci,email);
        console.log(userExist);
        if (!userExist) {
            console.log(email, password);
            let passwordHash = await bcryptjs.hash(password, 8);
            console.log(passwordHash);
            const newUser = await User.create({
                ci,
                firstname,
                lastname,
                email,
                phone,
                password: passwordHash,
                role
            });

            if (newUser) {
                res.status(201).json({
                    message: 'User created successfully',
                    data: {
                        // id,
                        // first_name,
                        // last_name,
                        email,
                        // phone
                    }
                })
            }
        } else {
            res.status(409).json({
                message: 'Cedula o Correo ya registrados',
            })
        }


    } catch (error) {
        console.log(error)
        let message = 'ocurrio un problema con el servidor';
        if(error.original.code == '22001'){
            message = error.original;
        }
        res.status(500).json({
            message: message.toString(),
            data: {}
        })
    }

}
export const deletOne = async (req, res) => {
    const { ci } = req.params;

    try {
        const userExist = await ifExist(ci,ci);
        if (userExist) {

            const userDeleted = await User.destroy({
                where: {
                    ci
                }
            });
            res.status(201).json({
                message: 'User deleted successfully',
            })
        } else {
            res.status(404).json({
                message: 'User not found',
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error,
            message: "ocurrio un problema con el servidor",
        })
    }
}




export const getAll = async (req, res) => {
    try {
        const users = await User.findAndCountAll({
            offset: 0,
            limit: 5
        });
        res.status(200).json({
            data: users
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ocurrio un problema con el servidor",
            data: []
        })
    }
}

export const getOne = async (req, res) => {
    const { ci } = req.params;

    try {
        const user = await User.findOne({
            where: { ci }
        });
        if (user) {
            return res.json({ user })
        } else {
            res.status(404).json({
                data: "User no encontrado"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ocurrio un problema con el servidor",
            data: []
        })
   
    }
}


export async function getAllFilter(req, res) {
    try {
        const { filter } = req.params;
        console.log(filter);
        const users = await User.findAll({
            where: {
                [Op.or]: {
                    ci: {
                        [Op.like]: `%${filter}%`
                    },
                    lastname: {
                        [Op.like]: `%${filter}%`
                    },
                    firstname: {
                        [Op.like]: `%${filter}%`
                    },
                }

            }

        });
        return res.json({
            data: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ocurrio un problema con el servidor",
            data: []
        })
    }
}



export const setOne = async (req, res) => {
    const { ci } = req.params;
    const {
        firstname,
        lastname,
        email,
        phone,
        password,
        role } = req.body;

    try {
        const updatedUser = await User.update({
            firstname,
            lastname,
            email,
            phone,
            password,
            role
        }, { where: { ci } })

        if (updatedUser[0]) {
            res.status(200).json({
                message: 'User updated successfully',
                data: {
                    firstname,
                    lastname,
                    email,
                    phone,
                    role
                }
            })
        } else {
            res.status(404).json({ message: 'User not found!' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ocurrio un problema con el servidor",
            data: []
        })
    }

}

export const logOut = (req, res, next) => {
    delete req.session.token;
    res.send("chao mundo");
}