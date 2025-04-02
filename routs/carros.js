const express = require('express');
const router = express.Router();

// Rota para listar carros
router.get('/', (req, res) => {
    res.json([
        { id: 1, modelo: "Civic", marca: "Honda" },
        { id: 2, modelo: "Corolla", marca: "Toyota" }
    ]);
});

// Rota para adicionar um carro
router.post('/', (req, res) => {
    const { modelo, marca } = req.body;
    res.status(201).json({ message: "Carro adicionado", modelo, marca });
});

module.exports = router;



//testando o codigo