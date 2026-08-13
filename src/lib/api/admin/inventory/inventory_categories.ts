export default async function getInventoryCategories(){
    try{

        const res = await fetch("/api/admin/inventory/categories", {
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