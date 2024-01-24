const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const confirmPasswrod = document.querySelector("#confirm-password");
const notificationSection = document.querySelector("#notification");
const notificationText = document.querySelector("#notification span");

const authURL = "http://localhost:3000";

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Verifica se os capos foram preenchidos
    if (username.value.length === 0) {
        notificationSection.style.display = "block";
        notificationText.textContent = "Insira um nome de usuário";
        return;
    } else if (password.value.length === 0) {
        notificationSection.style.display = "block";
        notificationText.textContent = "Insira uma senha";
        return;
    } else if (confirmPasswrod.value.length === 0) {
        notificationSection.style.display = "block";
        notificationText.textContent = "Confirme sua senha";
        return;
    } else if (password.value !== confirmPasswrod.value) {
        notificationSection.style.display = "block";
        notificationText.textContent = "As senhas estão diferentes";
        return;
    }

    await fetch(`${authURL}/auth/register`, {
        method: "POST",
        body: JSON.stringify({ username: username.value, password: password.value }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }).then(async (response) => {
        const status = await response.json();

        // Verifica se tudo ocorreu certo
        if (status.ok) {
            location.href(`http://${location.hostname}:5500/pages/login.html`);
            return;
        }
        // Notifica o usuário o erro
        notificationSection.style.display = "block";
        notificationText.textContent = status.msg;
    }).catch((error) => {
        console.log(error);
        notificationSection.style.display = "block";
        notificationText.textContent = "Erro no servidor, tente novamente mais tarde!";
    })
});