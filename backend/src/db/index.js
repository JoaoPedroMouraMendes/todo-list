// "Banco de dados"
class DB {
    constructor() {
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    editTodo(id, editions) {
        const index = this.findTodoById(id);
        if (index > -1)
            this.todos[index] = { id: id, ...editions };
        // Retorna a tarefa editada
        return this.todos[index];
    }

    deleteTodo(id) {
        const index = this.findTodoById(id);
        let deletedTodo;
        if (index > -1)
            deletedTodo = this.todos.splice(index, 1);
        // Retorna a tarefa deletada
        return deletedTodo;
    }

    deleteAllTodos() {
        const previousTodos = this.todos;
        this.todos = [];
        // Retorna todas as tarefas deletadas
        return previousTodos;
    }

    findTodoById(id) {
        return this.todos.findIndex((row) => row.id === id);;
    }
}

const db = new DB();

module.exports = db;