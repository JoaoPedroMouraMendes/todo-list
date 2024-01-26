const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const confirmPasswrod = document.querySelector("#confirm-password");
const notificationSection = document.querySelector("#notification");
const notificationText = document.querySelector("#notification span");
const load = document.querySelector(".load");
import { dbURL } from "./settings.js";

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    load.style.display = "block";

    // Verifica se os capos foram preenchidos
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
    } else if (confirmPasswrod.value.length === 0) {
        load.style.display = "none";
        notificationSection.style.display = "block";
        notificationText.textContent = "Confirme sua senha";
        return;
    } else if (password.value !== confirmPasswrod.value) {
        load.style.display = "none";
        notificationSection.style.display = "block";
        notificationText.textContent = "As senhas estão diferentes";
        return;
    }

    await fetch(`${dbURL}/auth/register`, {
        method: "POST",
        body: JSON.stringify({ username: username.value, password: password.value }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }).then(async (response) => {
        const status = await response.json();
        // Verifica se tudo ocorreu certo
        if (status.ok) {
            load.style.display = "none";
            location.assign("/pages/login.html");
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