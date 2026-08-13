export async function  getUser(){

    console.log("getUser");

    try {
        const response = await fetch(`/api/auth/user/GET`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const {success, user} = await response.json();
        console.log("backend: " + JSON.stringify(user));
        return user;


    }catch (error) {
        console.error("getUserAPI Error: " + error);
    }

}
