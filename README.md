# CompassCar API 🚘

API REST para gerenciamento de carros e seus itens, construída com **Node.js**, **Express**, **Sequelize** e **MySQL**.

---

## 📦 Funcionalidades

- ✅ Criar, listar, atualizar e excluir carros
- ✅ Adicionar itens aos carros
- 📄 Paginação de resultados
- ✅ Validações e mensagens de erro
- 🛠️ Estrutura pronta para expansão

---

## 🛠 Tecnologias usadas

- **Node.js**
- **Express**
- **MySQL**
- **Sequelize (ORM)**
- **Nodemon** para desenvolvimento

---

## 🚀 Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-repositorio/compasscar.git
   cd compasscar
   ```
2. **Instale as dependências:**
  ```bash
  npm install
 ```
3. **Configure o banco de dados: No arquivo , defina as credenciais do MySQL:**
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
  4. **Inicie o servidor:**
  ```bash
  npm start
  ```
  5. A API estará disponível em: `http://localhost:3000/`

  ---
## 📚 Endpoints
## Criar um carro

**POST** `http://localhost:3000/api/v1/cars`

**Requerimento:**
```json
{
  "brand": "Ford",
  "model": "Mustang",
  "year": 2022,
  "plate": "ABC-1C34"
}
```
**Resposta:**
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
## Atualizar itens de um carro

**PUT** `http://localhost:3000/api/v1/cars/:id/items`

**Requerimento:**
``` json
{
  "items": ["Ar Condicionado", "Bancos de Couro"]
}
```
**Resposta:**
- 204 Sem Conteúdo: Atualização bem-sucedida.

## Buscar um carro por ID

**GET** `http://localhost:3000/api/v1/cars/:id`

**Resposta:**
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

## Listar carros com filtros e paginação
**GET** `http://localhost:3000/api/v1/cars`

**Query Params:**

- `id`: Pelo id do carro cadastrado nao banco de dados
- `year`: Ano do carro (filtra anos maiores ou iguais ao valor informado).
- `plate`: Parte final da placa (filtra carros que contenham os caracteres).
- `brand`: Marca do carro.

Exemplo: `http://localhost:3000/api/v1/cars?year=2018`

Resposta:
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

## Atualizar informações de um carro

 **PATH** `http://localhost:3000/api/v1/cars/:id`

Requerimento:
```json
{
  "brand": "Chevrolet",
  "model": "Camaro",
  "year": 2023,
  "plate": "XYZ-9G89"
}
```
Resposta:
- 204 Sem conteudo: Atualização bem-sucedida

## Excluir um carro
**DELETE** `http://localhost:3000/api/v1/cars/:id`

Resposta:
- 204 Sem conteudo: Exclusão bem-sucedida.

---

📁 Estrutura de Pastas
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
## ⚠️ Validações
- year: Deve estar entre 2015 e 2025.
- plate: Formato exigido é: ABC-1C24.
- items: Máximo de 5 por carro; não podem ser repetidos.

## 🧪 Teste
**Use ferramentas como Postman ou Insomnia para testar os endpoints. Certifique-se de configurar corretamente os headers e bodies das requisições**

---

🧠 Feito por Rafael Guerra Santos

### Como Usar
1. Salve o conteúdo acima em um arquivo chamado `README.md` na raiz do seu projeto.
2. Depois de salvar o arquivo, faça um commit no seu repositório GitHub.
3. Quando alguém acessar seu repositório no GitHub, este README será exibido como documentação principal.

Se precisar de mais ajustes ou algo adicional, é só falar! 😊

  














