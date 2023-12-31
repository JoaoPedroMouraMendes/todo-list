// IMPORTAÇÕES
const express = require("express");
const app = express();
const cors = require("cors");

const routerTodos = require("./src/routes/todos.js");

// CONFIGURAÇÕES
const PORT = 3030;
app.use(cors());

app.use(express.json());

// ROTAS
app.use("/", routerTodos);

// INICIALIZAR SERVER
app.listen(PORT, () => {
    console.log("Servidor inicializado em: http://localhost:3030");
});