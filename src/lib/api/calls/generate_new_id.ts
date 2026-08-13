export async function generate_new_id(){
    const res = await fetch(`/api/admin/generate_object_id/GET`, {
            method: "GET",
            credentials: "include",
        },
    );

    if(!res.ok){
        console.warn("Error Unknown : ", res.status);
        return false;
    }

    const {success,status,data} = await res.json();
    return {success,status,data};
}