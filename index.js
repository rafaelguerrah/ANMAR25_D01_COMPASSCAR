const express =  require('express');
const app =  express();
const port = 3000;
const Car = require('./models/Car');

const conection = require('./config/database');

require('dotenv').config();

app.use(express.json())

app.get('/', (req, res) =>{
    res.send("testando...")
});

app.post('/api/v1/car', async (req, res) => {
     const {brand, model, year, plate } = req.body

    try {
        const car = await Car.create({ brand, model, year, plate });
        res.status(201).json({ message: "Carro cadastrado com sucesso!", car });
    } catch (err) {
        console.error("Erro ao cadastrar:", err);
        res.status(500).json({ error: "Erro ao cadastrar carro." });
    }
});

app.get('/api/v1/car', async (req, res) => {
    try {
       
        const cars = await Car.findAll();
        res.status(200).json(cars); 
    } catch (err) {
        console.error("Erro ao buscar dados:", err);
        res.status(500).json({ error: "Erro ao buscar carros." });
    }
});
conection
    .sync()
    .then(() =>{
        app.listen(3000)
    })
    .catch((err) =>console.log(err))

