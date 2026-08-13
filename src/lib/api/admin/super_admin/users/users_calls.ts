import {UserMeta} from "@/types/super_admin_meta/users_meta/type";


type fetch_type = {
    filter?: (keyof UserMeta)[],
    user_id?: string
}
export async function getUsers({filter,user_id}:fetch_type){
    try{

        const res = await fetch("/api/admin/super_admin/users/GET", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({data:filter, id:user_id})
        });


        const {data, success, message} = await res.json();



        return ({success:success, message:message, data:data});

    }catch(e){
        console.log("Error Occured : ", e)
        return ({success:false, message:"Error", response:e});
    }
}



export async function deleteUser(){
    try{

        const res = await fetch("/api/admin/super_admin/users/DELETE", {
            method: "POST",
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


export async function updateUser(){
    try{

        const res = await fetch("/api/admin/super_admin/users/DELETE", {
            method: "POST",
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



export async function getAccountTypeMeta(){
    try{

        const res = await fetch("/api/admin/super_admin/users/account_type_meta/GET", {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
            },
            credentials: "include",
        });


        const {data, success, message} = await res.json();



        return ({success:success, message:message, data:data});

    }catch(e){
        console.log("Error Occured : ", e)
        return ({success:false, message:"Error", response:e});
    }
}


export async function getRoleTypeMeta({filter, projection}:{filter?:string, projection?:object}){
    try{

        const res = await fetch("/api/admin/super_admin/users/role_type_meta/POST", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({filter:filter, projection:projection}),
            credentials: "include",
        });


        const {data, success, message} = await res.json();



        return ({success:success, message:message, data:data});

    }catch(e){
        console.log("Error Occured : ", e)
        return ({success:false, message:"Error", response:e});
    }
}


export async function getPermissionsMeta({filter, projection}:{filter?:string, projection?:object}){
    try{

        const res = await fetch("/api/admin/super_admin/users/permissions_meta/POST", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({filter:filter, projection:projection}),
            credentials: "include",
        });


        const {data, success, message} = await res.json();



        return ({success:success, message:message, data:data});

    }catch(e){
        console.log("Error Occured : ", e)
        return ({success:false, message:"Error", response:e});
    }
}


export async function getAccountStatus(){
    try{

        const res = await fetch("/api/admin/super_admin/users/account_status/GET", {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
            },
            credentials: "include",
        });


        const {data, success, message} = await res.json();



        return ({success:success, message:message, data:data});

    }catch(e){
        console.log("Error Occured : ", e)
        return ({success:false, message:"Error", response:e});
    }
}
