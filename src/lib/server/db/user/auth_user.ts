import {Collection} from "mongodb";
import bcrypt from 'bcrypt';
import {SignupUser} from "@/types/user_information_type";


type props = {
    db: Collection<Document>,
    email:string,
    password:string,
}

export async function getUser({db, email, password}: props) {
    try{
        const user = await db.findOne<SignupUser>({email: email});


        if(!user){return undefined;}

        const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
        if(isPasswordMatch){
            console.info("[SERVER] [LIB] Password match, Next: Check session!");
            return user;
        }else {
            console.info("[SERVER] [LIB] Password doesn't match! :" + isPasswordMatch)
            return undefined;
        }

    }catch (err){
        console.log("[SERVER] [LIB] Error occurred when fetching User :" + err);
    }
}



export async function isUserValid(){

}