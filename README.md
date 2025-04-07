# CompassCar API 🚘

REST API for car and item management, built with **Node.js**, **Express**, **Sequelize** and **MySQL**.

---

## 📦 Features

- ✅ Create, list, update and delete cars
- ✅ Add items to cars
- 📄 Results pagination
- ✅ Validations and error messages
- 🛠️ Ready for expansion

---

## 🛠 Technologies Used

- **Node.js**
- **Express**
- **MySQL**
- **Sequelize (ORM)**
- **Nodemon** for development

---

## 🚀 How to Run the Project

1. **Clone the repository:**
   ```bash
   gh repo clone rafaelguerrah/ANMAR25_D01_COMPASSCAR
   cd compasscar
   
2. **Install dependencies::**
  ```bash
  npm install
 ```
3. **MySQL credentials with Sequelize::**
   ```javascript
   const { Sequelize } = require('sequelize');

    const sequelize = new Sequelize('compasscar', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false 
    });

    (async () => {
    try {
    await sequelize.authenticate();
    console.log('Connection established successfully with Sequelize');
    } catch (err) {
    console.error('Unable to connect to the database:', err);
    }
    })();
    ```
  3.1 **Create database tables:**
  ```sql
   CREATE DATABASE compasscar;

USE compasscar;

CREATE TABLE cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  brand VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  plate VARCHAR(255) NOT NULL UNIQUE,
  year INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cars_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  car_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (car_id) REFERENCES cars(id)
);
  ```
  4. **Start the server:**
  ```bash
  npm start
  ```
  5. API will be available at: `http://localhost:3000/`

  ---
## 📚 Endpoints
## Create a Car

**POST** `http://localhost:3000/api/v1/cars`

**Request:**
```json
{
  "brand": "Ford",
  "model": "Mustang",
  "year": 2022,
  "plate": "ABC-1C34"
}
```
**Response:**
- 201 Created:
```json
{
  "id": 1,
  "brand": "Ford",
  "model": "Mustang",
  "year": 2022,
  "plate": "ABC-1C34",
  "created_at": "2025-04-06T14:01:00.000Z"
}
```
## Update Car Items

**PUT** `http://localhost:3000/api/v1/cars/:id/items`

**Request:**
``` json
{
  "items": ["Air Conditioning", "Leather Seats"]
}
```
**Response:**
- 204  No Content

## Get Car by ID

**GET** `http://localhost:3000/api/v1/cars/:id`

**Response:**
``` json
{
  "id": 1,
  "brand": "Ford",
  "model": "Mustang",
  "year": 2022,
  "plate": "ABC-1C34",
  "created_at": "2025-04-06T14:01:00.000Z",
  "items": ["Air Conditioning", "Leather Seats"]
}
```

## List Cars with Filters and Pagination
**GET** `http://localhost:3000/api/v1/cars`

**Query Params:**

- `id`:  Filter by car ID
- `year`: Car year (filters years greater or equal)
- `plate`: Plate ending (filters plates containing characters)
- `brand`: Car brand

Example: `http://localhost:3000/api/v1/cars?year=2018`

Response:
- 200 ok
  
````json
{
  "count": 11,
  "pages": 3,
  "data": [
    {
      "id": 1,
      "brand": "Toyota",
      "model": "Corolla",
      "year": 2018,
      "plate": "ABC-1D23",
      "created_at": "2025-04-02T21:23:17.000Z",
      "updated_at": "2025-04-06T20:24:12.000Z"
    },
    {
      "id": 6,
      "brand": "Ferrari",
      "model": "Spide",
      "year": 2025,
      "plate": "NOP-6C23",
      "created_at": "2025-04-03T01:11:43.000Z",
      "updated_at": "2025-04-06T20:24:12.000Z"
    },
    ]};
  ````

## Update Car Information

 **PATH** `http://localhost:3000/api/v1/cars/:id`

Request:
```json
{
  "brand": "Chevrolet",
  "model": "Camaro",
  "year": 2023,
  "plate": "XYZ-9G89"
}
```
Response:
- 204 No Content

## Delete a Car
**DELETE** `http://localhost:3000/api/v1/cars/:id`

Response:
- 204 No Content

---

📁 Folder Structure
```
├── config/
│   └── database.js
├── models/
│   ├── car.js
│   ├── carItem.js
│   └── index.js
├── routes/
│   └── carsRoutes.js
├── index.js
├── package.json
└── README.md
```
---
##⚠️ Validations
- year: Must be between 2015 and 2025
- plate: Required format: ABC-1C24
- items: Maximum 5 per car; cannot be repeated

## 🔴Error Reference

⚠️ 400 Bad Request (Validation Errors)
```json
{
  "errors": [
    "🔹 brand is required",
    "🔹 model is required",
    "🔹 year is required",
    "🔹 plate is required",
    "🔹 year must be between {currentYear-9} and {currentYear+1}",
    "🔹 plate must be in the correct format ABC-1C34",
    "🔹 items is required",
    "🔹 items must be a maximum of 5",
    "🔹 items cannot be repeated",
    "🔹 model must also be informed"
  ]
}
```
🔍 404 Not Found
```json
{
  "errors": [
    "🚨 car not found"
  ]
}
```
⚔️ 409 Conflict
```json
{
  "errors": [
    "💥 car already registered"
  ]
}
```
🆘 500 Internal Server Error
```json
{
  "errors": [
    "❌ an internal server error occurred"
  ]
}
```
✅ Successful Responses
- 201 Created: 🟢 Car created successfully

- 200 OK: 🟢 Request processed successfully

- 204 No Content: 🟢 Operation successful (no response body)

---

## 🧪 Testing
**Use tools like Postman or Insomnia to test the endpoints. Make sure to configure request headers and bodies correctly**

---

 >> 🚗 Developed by Rafael Guerra Santos <<


  














