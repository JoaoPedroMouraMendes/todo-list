const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3030/auth/register", {
        method: "POST",
        body: JSON.stringify({ username: username.value, password: password.value }),
        headers: {
            "Content-Type": "application/json; chatset=UTF-8"
        }
    }).then(response => response.json()).catch(error => console.log(error));

    console.log(response);
})