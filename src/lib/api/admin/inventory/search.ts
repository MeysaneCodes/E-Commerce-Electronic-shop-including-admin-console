export default async function search_inventory(search_data:string){
    try{

        const res = await fetch("/api/admin/inventory/search", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({data:search_data.trim()})
        });


        const {data, success, message} = await res.json();



        return ({success:success, message:message, response:data});

    }catch(e){
        console.log("Error Occured : ", e)
        return ({success:false, message:"Error", response:e});
    }
}