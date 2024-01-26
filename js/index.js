import DisplayToday from "./modules/DisplayToday.js";
import CreateButton from "./modules/CreateButton.js";
import TodoList from "./modules/TodoList.js";
import ProgressBar from "./modules/ProgressBar.js";
import { dbURL } from "./settings.js";
console.log("test");
const displayToday = new DisplayToday("#today-date");
displayToday.init();

const createButton = new CreateButton("#add-task");
createButton.init();

const todoList = new TodoList("#add-task", "#task-list", dbURL);
todoList.init();

const progressBar = new ProgressBar("#progress-bar", todoList);
progressBar.init();