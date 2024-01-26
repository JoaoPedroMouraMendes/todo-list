const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const notificationSection = document.querySelector("#notification");
const notificationText = document.querySelector("#notification span");
const load = document.querySelector(".load");
import { dbURL } from "./settings.js";

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    load.style.display = "block";

    if (username.value.length === 0) {
        load.style.display = "none";
        notificationSection.style.display = "block";
        notificationText.textContent = "Insira um nome de usuário";
        return;
    } else if (password.value.length === 0) {
        load.style.display = "none";
        notificationSection.style.display = "block";
        notificationText.textContent = "Insira uma senha";
        return;
    }

    await fetch(`${dbURL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ username: username.value, password: password.value }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }).then(async (response) => {
        const status = await response.json();

        // Verifica se tudo ocorreu certo
        if (status?.token) {
            load.style.display = "none";
            localStorage.setItem("token", status.token);
            location.href = `${location.hostname}:5500/index.html`;
            return;
        }
        load.style.display = "none";
        // Notifica o usuário o erro
        notificationSection.style.display = "block";
        notificationText.textContent = status.msg;
    }).catch((error) => {
        console.log(error);
        load.style.display = "none";
        notificationSection.style.display = "block";
        notificationText.textContent = "Erro no servidor, tente novamente mais tarde!";
    })
});