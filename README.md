# CompassCar API 🚘

API REST para gerenciamento de carros, construída com **Node.js**, **Express**, **Sequelize** e **MySQL**.

## 📦 Funcionalidades

- ✅ Criar, listar, atualizar e excluir carros
- 🔎 Filtros de busca: ano, marca, final da placa
- 📄 Paginação de resultados
- ✅ Validações e mensagens de erro
- 📂 Estrutura pronta para expansão com itens de carro (carItems)

---

## 🛠 Tecnologias usadas

- Node.js
- Express
- MySQL
- Sequelize (ORM)
- Nodemon (dev)

---

## 🚀 Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/rafaelguerrah/ANMAR25_D01_COMPASSCAR.git
cd compasscar
````
2. Instale as dependências:
````bash
npm install
`````
3. Configure o banco de dados em config/database.js:
````js
module.exports = {
  development: {
    username: 'root',
    password: '',
    database: 'compasscar',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
````
4. Execute as migrações ou crie as tabelas no MySQL manualmente (dependendo do seu setup).
   
5. Inicie a aplicação:
   ````
   npm start
   ````
  A API estará disponível em: http://localhost:3000
 
 ---
 
## 📚 Endpoints
Criar carro
````http
POST /api/v1/cars
````
Listar carros com filtros e paginação
````http
GET /api/v1/cars
````
Query Params:

- year: retorna carros com ano >=

- final_plate: filtra pelo final da placa

- brand: busca parcial da marca

- page: número da página

- limit: limite por página (máx. 10)

  Atualizar carro
````http
  PATCH /api/v1/cars/:id
````

Deletar carro
````http
DELETE /api/v1/cars/:id
````
---

## ⚠️ Validações
year: entre 2015 e 2025

plate: formato ABC-1C34

Se brand for enviada, model também é obrigatório

## 🧪 Testes (via Insomnia ou Postman)
Você pode testar os endpoints com ferramentas como:

 - Postman

- Insomnia

 ## 📁 Estrutura de Pastas
 ````bash
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
````


---

🧠 Autor
Feito por Rafael Guerra Santos











