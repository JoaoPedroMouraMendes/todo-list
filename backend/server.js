const express = require("express");
const app = express();

const PORT = 3030;

const todos = [];

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Olá");
});

app.post("/", async (req, res) => {
    try {
        const todo = {checked: req.body.checked, description: req.body.description};
        todos.push(todo);
        res.status(200).json(todos);
    } catch(error) {
        res.status(400).send(error);
    }
});

app.listen(PORT, () => {
    console.log("Servidor inicializado em: http://localhost:3030");
});