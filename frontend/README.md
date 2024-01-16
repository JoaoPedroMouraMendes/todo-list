# FRONT-END 💻

Aqui se encontra toda parte visual do site, focando em que você tenha uma boa experiência dentro do site.

## Parte técnica 👩‍💻

Para que você possa fazer o site funcionar corretamente na sua máquina é necessário que o back-end esteja já inicializado na sua máquina local.

Para evitar problemas com o CORS sugiro que use um servidor local para o front-end também, como o Live Server do VSCode.

## Perda de dados

Os dados são sempre deletados ao recarregar a página, para remover essa função siga o caminho:

- frontend
- js
- modules
- TodoList.js

Dentro de TodoList remova o método "this.removeAllTask()" do método "init()".

```javascript 
init() {
        if (this.createButton && this.todoList) {
            // Remove todas as tarefas já criadas
            this.removeAllTask(); // *Remova essa linha

            this.addCreateTaskEvent();
            this.getTasks();
        }
    }
```

## Tecnologias usadas

- JavaScript 📝
- HTML 🌐
- CSS 🎨
