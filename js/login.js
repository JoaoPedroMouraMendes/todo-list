const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const notificationSection = document.querySelector("#notification");
const notificationText = document.querySelector("#notification span");

const authURL = "https://auth-backend-jade.vercel.app";

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (username.value.length === 0) {
        notificationSection.style.display = "block";
        notificationText.textContent = "Insira um nome de usuário";
        return;
    } else if (password.value.length === 0) {
        notificationSection.style.display = "block";
        notificationText.textContent = "Insira uma senha";
        return;
    }

    await fetch(`${authURL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ username: username.value, password: password.value }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }).then(async (response) => {
        const status = await response.json();

        // Verifica se tudo ocorreu certo
        if (status?.token) {
            localStorage.setItem("token", status.token);
            location.href(`http://${location.hostname}:5500/index.html`);
            return;
        }
        // Notifica o usuário o erro
        notificationSection.style.display = "block";
        notificationText.textContent = status.msg;
        clearInputs();
    }).catch((error) => {
        console.log(error);
        notificationSection.style.display = "block";
        notificationText.textContent = "Erro no servidor, tente novamente mais tarde!";
    })
});

function clearInputs() {
    username.value = "";
    password.value = "";
}