import Cantons from "../../models/references/Canton";
import Provinces from "../../models/references/Province";


export const createProvince = async (req, res) => {
    const { name } = req.body;

    try {

        const newProvince = await Provinces.create({
            name
        }, { fields: ['name'] });

        if (newProvince) {
            res.status(201).json({
                message: 'Province created successfully',
                data: { name }
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }

}

export const getProvinces = async (req, res) => {
    try {
        const provinces = await Provinces.findAll({
            include: [
                { model: Cantons }
            ],
            order: [
                ['name', 'ASC'],
            ],
        });
        console.log("provinces: ", provinces);
        res.status(200).json({
            count: provinces.length,
            data: provinces
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}

export const getOneProvince = async (req, res) => {
    const { id } = req.params;

    try {
        const province = await Provinces.findOne({
            where: { id },
            include: [
                {
                    model: Cantons,
                },
            ],
            order: [
                [Cantons, 'name', 'ASC'],
            ],
        });

        res.status(200).json(province)
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}

export const updateProvince = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {

        const updatedProvince = await Provinces.update({ name }, { where: { id } })

        if (updatedProvince[0]) {
            res.status(200).json({
                message: 'Province updated successfully',
                data: { name }
            })
        } else {
            res.status(404).json({ message: 'Province not found!' })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }

}

export const deletedProvince = async (req, res) => {
    const { id } = req.params;

    try {
        const provinceDeleted = await Provinces.destroy({
            where: {
                id
            }
        });

        res.status(200).json({
            message: 'Province deleted successfully',
            count: provinceDeleted
        })

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}