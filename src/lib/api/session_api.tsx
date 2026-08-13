export async function check_session():Promise<boolean>{

    try {
        const res = await fetch("/api/session", {
            method: "GET",
            credentials: "include"
        });

        const data = await res.json();
        return  data.LoggedIn;
    }catch (e) {
        console.error(e);
        return false;
    }
}