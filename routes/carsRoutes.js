const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const CarItem = require('../models/CarItem'); 
const { Op } = require('sequelize'); 

router.post('/api/v1/car', async (req, res) => {
    const { brand, model, year, plate } = req.body;
    
    const errors = [];
    
    if(!brand) errors.push("brand is required");
    if(!model) errors.push("model is required");
    if(!year) errors.push("year is required");
    if(!plate) errors.push("plate is required");

    if(year && (year < 2015 || year > 2025)){
        errors.push("year must be between 2015 and 2025");
    }
    
    if(errors.length > 0){
        return res.status(400).json({errors});
    }

    try {
        const car = await Car.create({brand, model, year, plate});
        res.status(201).json({
            message: "Car registered successfully",
            car
        });
        console.log(`Car registered successfully: ${JSON.stringify(car)}`);
    } catch (err) {
        console.error("Error registering car:", err);
        res.status(500).json({ error: "Internal server error while registering car" });   
    }
});

router.get('/api/v1/car', async (req, res) => {
    try {
        const cars = await Car.findAll();
        res.status(200).json(cars);
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Error while fetching cars" });
    }
});

router.put('/api/v1/car/:id/items', async (req, res) => {
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

module.exports = router;