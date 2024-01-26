export default class TodoList {
    allTasks;

    constructor(createButton, todoList, dbURL) {
        this.createButton = document.querySelector(createButton);
        this.todoList = document.querySelector(todoList);
        this.dbURL = dbURL;

        this.updateTaskEvent = new CustomEvent("updateTask");
    }

    render(tasks) {
        // Limpa todas as tarefas
        this.todoList.innerHTML = "";
        // Renderiza todas as tarefas
        tasks.forEach(task => {
            this.todoList.innerHTML += `
            <li class="task ${task.checked ? "completed-task" : ""}" id="${task._id}">
                <input type="checkbox" ${task.checked ? "checked" : ""}>
                <p contenteditable spellcheck="false">${task.todoName}</p>
                <button class="delete-button">
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </button>
            </li>`;
        });
        // Adiciona o evento de editar as tarefas
        this.addUptadeTaskEvent();
        // Adiciona o evento de deletar task
        this.addDeleteTaskEvent();
    }

    async getTasks() {
        try {
            const resp = await fetch(`${this.dbURL}/todos`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            const tasks = await resp.json().then(userData => userData.todos);
            // Guarda as tasks
            this.allTasks = tasks;
            // Dispara o evento de quando as tasks são atualizadas
            document.dispatchEvent(this.updateTaskEvent);
            // Obtem as tarefas atualizadas
            this.render(tasks);
        } catch (error) {
            throw new Error(error);
        }
    }

    async createTask() {
        try {
            // Cria a tarefa
            await fetch(`${this.dbURL}/todo/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            // Obtem as tarefas atualizadas
            this.getTasks();
        } catch (error) {
            throw new Error(error);
        }
    }

    addCreateTaskEvent() {
        this.createButton.addEventListener("click", () => this.createTask());
    }

    async updateTask({ target }) {
        try {
            if (target instanceof HTMLParagraphElement && target.innerText === "") {
                target.innerText = "Digite sua tarefa...";
                return;
            }
            await fetch(`${this.dbURL}/todo/edit/${target.parentElement.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    newName: target instanceof HTMLParagraphElement
                        ? target.innerText
                        : target.nextElementSibling.innerText,
                    checked: target instanceof HTMLInputElement
                        ? target.checked
                        : target.previousElementSibling.checked
                })
            });
            // Obtem as tarefas atualizadas
            this.getTasks();
        } catch (error) {
            throw new Error(error);
        }
    }

    addUptadeTaskEvent() {
        const descriptions = document.querySelectorAll(".task p")
        descriptions.forEach(description => {
            description.addEventListener("blur", (event) => {
                this.updateTask(event);
            });
        });

        const checkboxes = document.querySelectorAll(".task input")
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("click", (event) => {
                this.updateTask(event);
            });
        });
    }

    async deleteTask({ currentTarget }) {
        try {
            await fetch(`${this.dbURL}/todo/delete/${currentTarget.parentElement.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            // Obtem as tarefas atualizadas
            this.getTasks();
        } catch (error) {
            throw new Error(error);
        }
    }

    addDeleteTaskEvent() {
        const deleteButton = document.querySelectorAll(".delete-button");
        deleteButton.forEach((deleteButton) =>
            deleteButton.addEventListener("click", (event) =>
                this.deleteTask(event)
            )
        );
    }

    init() {
        if (this.createButton && this.todoList) {
            this.addCreateTaskEvent();
            this.getTasks();
        }
    }
}