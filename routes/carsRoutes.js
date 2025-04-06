const express = require('express');
const router = express.Router();
const { Car, CarItem } = require('../models');
const { Op } = require('sequelize');


router.post('/api/v1/cars', async (req, res) => {
    const { brand, model, year, plate } = req.body;

    const errors = [];


    if (!brand) errors.push("brand is required");
    if (!model) errors.push("model is required");
    if (!year) errors.push("year is required");
    if (!plate) errors.push("plate is required");

    const currentYear = new Date().getFullYear();
    const validMinYear = currentYear - 10 + 1;
    if (year && (year < validMinYear || year > currentYear + 1)) {
        errors.push(`year must be between ${validMinYear} and ${currentYear + 1}`);
    }
    const plateRegex = /^[A-Z]{3}-[0-9][A-J0-9][0-9]{2}$/;
    if (plate && !plateRegex.test(plate)) {
        errors.push("plate must be in the correct format ABC-1C34");
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {

        const existingCar = await Car.findOne({ where: { plate } });
        if (existingCar) {
            return res.status(409).json({
                errors: ["car already registered"]
            });
        }


        const car = await Car.create({ brand, model, year, plate });

        res.status(201).json({
            id: car.id,
            brand: car.brand,
            model: car.model,
            year: car.year,
            plate: car.plate,
            created_at: car.createdAt
        });
    } catch (err) {
        console.error("Error creating car:", err);
        res.status(500).json({ error: "Internal server error while creating car" });
    }

});

router.put('/api/v1/cars/:id/items', async (req, res) => {
    const { id } = req.params;
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ errors: ["items is required"] });
    }

    if (items.length > 5) {
        return res.status(400).json({ errors: ["items must be a maximum of 5"] });
    }

    if (new Set(items).size !== items.length) {
        return res.status(400).json({ errors: ["items cannot be repeated"] });
    }

    try {
        const car = await Car.findByPk(id);
        if (!car) {
            return res.status(404).json({ errors: ["car not found"] });
        }


        await CarItem.destroy({ where: { car_id: id } });


        const carItems = items.map(itemName => ({
            name: itemName,
            car_id: id
        }));

        await CarItem.bulkCreate(carItems);

        return res.status(204).send();
    } catch (err) {
        console.error("Error updating car items:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/api/v1/cars/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const car = await Car.findByPk(id, {
            include: {
                model: CarItem,
                as: 'items',
                attributes: ['name']
            }
        });

        if (!car) {
            return res.status(404).json({
                errors: ['car not found']
            });
        }

        const itemNames = car.items.map(item => item.name);

        return res.status(200).json({
            id: car.id,
            brand: car.brand,
            model: car.model,
            year: car.year,
            plate: car.plate,
            created_at: car.createdAt,
            items: itemNames
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: ['internal server error'] });
    }
});

router.get('/api/v1/cars', async (req, res) => {
    try {
        let { year, final_plate, brand, page, limit } = req.query;

        
        page = parseInt(page);
        limit = parseInt(limit);

        if (!page || page < 1) page = 1;
        if (!limit || limit < 1) limit = 5;
        if (limit > 10) limit = 10;

        const offset = (page - 1) * limit;

       
        const where = {};

        if (year) {
            where.year = { [Op.gte]: parseInt(year) };
        }

        if (final_plate) {
            where.plate = { [Op.like]: `%${final_plate}` };
        }

        if (brand) {
            where.brand = { [Op.like]: `%${brand}%` };
        }

        
        const { count, rows } = await Car.findAndCountAll({
            where,
            limit,
            offset,
            order: [['id', 'ASC']]
        });

        const totalPages = Math.ceil(count / limit);

        return res.status(200).json({
            count,
            pages: totalPages,
            data: rows
        });

    } catch (error) {
        console.error('Error while fetching cars.:', error);
        return res.status(500).json({ error: 'Error while fetching cars..' });
    }
});

router.patch('/api/v1/cars/:id', async (req, res) => {
    const { id } = req.params;
    let { brand, model, year, plate } = req.body;

    const errors = [];

    try {
        
        if (brand !== undefined && brand !== null && brand.trim() === '') brand = undefined;
        if (model !== undefined && model !== null && model.trim() === '') model = undefined;
        if (year !== undefined && year !== null && year === '') year = undefined;
        if (plate !== undefined && plate !== null && plate.trim() === '') plate = undefined;

        
        if (brand && !model) {
            errors.push("model must also be informed");
        }

       
        if (year) {
            const parsedYear = parseInt(year);
            if (parsedYear < 2015 || parsedYear > 2025) {
                errors.push("year must be between 2015 and 2025");
            } else {
                year = parsedYear;
            }
        }

        
        if (plate && !/^[A-Z]{3}-\d[A-Z]\d{2}$/.test(plate)) {
            errors.push("plate must be in the correct format ABC-1C34");
        }

        
        if (plate) {
            const existingCar = await Car.findOne({
                where: { plate, id: { [Op.ne]: id } }
            });

            if (existingCar) {
                return res.status(409).json({ errors: ["car already registered"] });
            }
        }

       
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        
        const car = await Car.findByPk(id);
        if (!car) {
            return res.status(404).json({ errors: ["car not found"] });
        }

        
        if (brand) car.brand = brand;
        if (model) car.model = model;
        if (year) car.year = year;
        if (plate) car.plate = plate;

        await car.save();

        return res.status(204).send(); 

    } catch (error) {
        console.error("Erro ao atualizar carro:", error);
        return res.status(500).json({ errors: ["internal server error"] });
    }
});

router.delete('/api/v1/cars/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const car = await Car.findByPk(id, {
            include: ['carItems'], 
        });

        if (!car) {
            return res.status(404).json({
                errors: ["car not found"],
            });
        }

        if (car.carItems && car.carItems.length > 0) {
            for (const item of car.carItems) {
                await item.destroy();
            }
        }

        await car.destroy();

        return res.status(204).send();

    } catch (error) {
        console.error('Error while deleting car.', error);
        return res.status(500).json({
            errors: ["an internal server error occurred"],
        });
    }
});

module.exports = router;