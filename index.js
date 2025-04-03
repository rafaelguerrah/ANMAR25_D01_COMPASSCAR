const express = require('express');
const app = express();
const port = 3000;
const connection = require('./config/database'); 
const carRoutes = require('./routes/carRoutes'); 

require('dotenv').config();

app.use(express.json());
app.use(carRoutes); 

app.get('/', (req, res) => {
    res.send("testando...");
});

connection
    .sync()
    .then(() => {
        app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
    })
    .catch((err) => console.error(err));