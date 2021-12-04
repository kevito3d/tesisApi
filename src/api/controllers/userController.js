import User from "../models/User";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

const signToken = (email) => {
    return jwt.sign({
        email
    }, 'mi-secreto', {
        expiresIn: 60 * 60 * 24 * 365
    });
}

//TODO si el tocken vence hacer que en el fron lo redirecione tengoq ue hacer que el token exipe en menos tiempo para probar eso
export const login = async (req, res, next) => {
    const {
        email,
        // user,
        password
    } = req.body;
    const userExist=await ifExist(email);
   
    if (userExist) {
        // let passwordHash = await bcryptjs.hash(password, 8); //esto es para guardarla
        let compare = await bcryptjs.compare(password, userExist.password);
        console.log(compare);
        if (compare) {
            const token = signToken(userExist.email);
            req.session.token = token;
            const {password, ...user} = userExist.dataValues;
            console.log("user : ",user);
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

export const ifExist = async (ci) => {
    const user = await User.findByPk(ci/* {
        where: {
            email, // and
            $or: [{
                "email": email
            },
            {
                "user": user
            }
            ]
        }
    } */);
    return user;
}


export const createUser = async (req, res) => {
    const {
        ci,
        firstname,
        lastname,
        email,
        phone,
        password, } = req.body;

    try {
        const userExist = await ifExist(ci);
        if (!userExist) {
            console.log(email, password);
            let passwordHash = await bcryptjs.hash(password, 8);
            console.log(passwordHash);
            const newUser = await User.create({
                ci,
                firstname,
                lastname,
                email,
                password:passwordHash,
                phone
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
            res.status(500).json({
                message: 'User exist',
            })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'ocurrio un problema con el servidor',
            data: {}
        })
    }

}
export const deletOne = async (req, res) => {
    const { ci } = req.params;

    try {
        const userExist=await ifExist(ci);
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
            message: "ocurrio un problema con el servidor",
        })
    }
}




export const getAll = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['ci', 'firstname', 'lastname', 'email',  'phone']
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
        if(user){
            return res.json({user})
        }else{
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



export const setOne = async (req, res) => {
    const { ci } = req.params;
    const {
        firstname,
        lastname,
        email,
        password,
        phone } = req.body;

    try {
        const updatedUser = await User.update({
            firstname,
            lastname,
            email,
            password,
            phone
        }, { where: { ci } })

        if (updatedUser[0]) {
            res.status(200).json({
                message: 'User updated successfully',
                data: {
                    firstname,
                    lastname,
                    email,
                    phone
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