console.log("test");
import logged from "./modules/Auth.js";

init();

async function init() {
    // Verifica se o usuário está logado
    const status = await logged();
    if (!status) {
        location.assign(`/pages/login.html`);
    }
}