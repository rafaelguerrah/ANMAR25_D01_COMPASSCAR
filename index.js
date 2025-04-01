const express = require('express');
const app = express();


const port = process.env.PORT || 3000;


const connection = require('./config/database');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.get('/', (req, res) => {
    res.status(200).json({
        message: "API em funcionamento",
        status: "OK",
        database: connection.authenticated ? "Conectado" : "Desconectado"
    });
});

/
app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada" });
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
    console.log(`Acesse: http://localhost:${port}`);
});


module.exports = app;

