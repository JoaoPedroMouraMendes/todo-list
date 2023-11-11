const express = require("express");
const router = express.Router();
// "Banco de dados"
const db = require("../db/index.js");
// Usado para criar ids aleatórios
const crypto = require("crypto");

// ROTAS
router.get("/", (req, res) => {
    try {
        res.status(200).json(db.todos);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.post("/", (req, res) => {
    try {
        const todo = {
            checked: req.body.checked,
            description: req.body.description,
            id: crypto.randomUUID()
        };

        db.addTodo(todo);
        res.status(200).json(db.todos);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", (req, res) => {
    try {
        const id = req.params.id;
        const todo = db.editTodo(id, req.body);
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", (req, res) => {
    try {
        const id = req.params.id;
        const todo = db.deleteTodo(id);
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;