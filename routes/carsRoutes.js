const express = require('express');
const router = express.Router();
const Car = require('../models/Car'); 

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

module.exports = router;

