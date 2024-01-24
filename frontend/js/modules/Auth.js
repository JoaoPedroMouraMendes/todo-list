const authURL = "http://localhost:3000";
export default async function logged() {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }

    return await fetch(`${authURL}/auth`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`
        }
    }).then(async (response) => {
        const status = await response.json();
        if (!status.ok) {
            return false;
        }
        return true;
    }).catch(error => {
        console.log(error);
        return false;
    });
}