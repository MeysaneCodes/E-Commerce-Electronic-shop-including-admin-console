export default async function getInventoryAttributes(){
    try{

        const res = await fetch("/api/admin/inventory/attributes", {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
            },
            credentials: "include"
        });


        const {data, success, message} = await res.json();



        return ({success:success, message:message, data:data});

    }catch(e){
        console.log("Error Occured : ", e)
        return ({success:false, message:"Error", response:e});
    }
}