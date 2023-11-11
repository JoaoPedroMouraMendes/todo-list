export default class ProgressBar {

    constructor(progressBar, todoList) {
        this.progressBar = document.querySelector(progressBar);

        this.todoList = todoList;
    }

    updateProgressBar() {
        // Separa as tarefas finalizadas das ainda em andamento
        let completedTasks = 0;
        const { allTasks } = this.todoList;
        allTasks.forEach(task => {
            if (task.checked) completedTasks++;
        });

        // Calculo da porcentagem
        const percentageTasksCompleted = 100 * completedTasks / allTasks.length;
        // Atualiza a barra de progresso
        this.progressBar.style.width = `${percentageTasksCompleted}%`;
    }

    init() {
        if (this.progressBar)
            document.addEventListener("updateTask", () => this.updateProgressBar());
    }
}