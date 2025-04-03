const express = require('express');
const app = express();
const port = 3000;
const connection = require('./config/database'); 
const carRoutes = require('./routes/carsRoutes'); 

require('dotenv').config();

app.use(express.json());
app.use(carRoutes); 

app.get('/', (req, res) => {
    res.send("API is running...");
});

connection
    .sync()
    .then(() => {
        app.listen(port, () => console.log(`Database connection failed: ${port}`));
    })
    .catch((err) => console.error(err));