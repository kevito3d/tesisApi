import User from '../models/user.model';

export const createUser = async (req, res) => {
    const { id,
        first_name,
        last_name,
        email,
        password,
        phone } = req.body;
    try {
        const newUser = await User.create({
            id,
            first_name,
            last_name,
            email,
            password,
            phone
        });

        if (newUser) {
            res.status(201).json({
                message: 'User created successfully',
                data: {
                    id,
                    first_name,
                    last_name,
                    email,
                    phone
                }
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

export const getAll = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'email',  'phone']
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
    const { id } = req.params;

    try {
        const user = await User.findOne({
            where: { id }
        });

        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ocurrio un problema con el servidor",
            data: []
        })
    }
}

export const deletOne = async (req, res) => {
    const { id } = req.params;

    try {
        const userDeleted = await User.destroy({
            where: {
                id
            }
        });

        res.status(201).json({
            message: 'User deleted successfully',
            count: userDeleted
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "ocurrio un problema con el servidor",
            data: []
        })
    }
}

export const updateOne = async (req, res) => {
    const { id } = req.params;
    const {
        first_name,
        last_name,
        email,
        password,
        phone } = req.body;

    try {
        const updatedUser = await User.update({
            first_name,
            last_name,
            email,
            password,
            phone
        }, { where: { id } })

        if (updatedUser[0]) {
            res.status(200).json({
                message: 'User updated successfully',
                data: {
                    first_name,
                    last_name,
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