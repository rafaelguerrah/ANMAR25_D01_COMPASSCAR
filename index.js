const express = require('express');
const app = express();
const cors = require('cors');
const carrosRoutes = require('./routs/carros'); 

const port = 3000;

const connection = require('./config/database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

// Rota principal
app.get('/', (req, res) => {
    res.status(200).json({
        message: "API em funcionamento",
        status: "OK",
        database: connection.authenticated ? "Conectado" : "Desconectado"
    });
});

// Usando as rotas de carros
app.use('/carros', carrosRoutes);

// rotas nao encontrada
app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada" });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});



