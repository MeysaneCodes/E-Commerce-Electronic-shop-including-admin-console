import React from "react";
import * as z from "zod";
import {Errors_list} from "@/lib/api/sign_up_api_messages/sign_up_message_list";

interface client_infos {
    firstname:string,
    lastname: string,
    email: string,
    password: string,
    repeated_password: string,
    birthday?: Date,
}

interface helper_state_methods {
    setFirstname_helperText:React.Dispatch<React.SetStateAction<string>>;
    setLastname_helperText:React.Dispatch<React.SetStateAction<string>>;
    setEmail_helperText:React.Dispatch<React.SetStateAction<string>>;
    setPassword_helperText:React.Dispatch<React.SetStateAction<string>>;
    setConfirmPassword_helperText:React.Dispatch<React.SetStateAction<string>>;
    setBirthday_helperText:React.Dispatch<React.SetStateAction<string>>;

}

interface validate_signup_inputs_interface {
    UserInfos : client_infos;
    helperText?: helper_state_methods
}

function is18YearsOld(dateOfBirth: Date): boolean {
    const today = new Date();


    let age = today.getFullYear() - dateOfBirth.getFullYear();
    console.log("age is" + age);

    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    const dayDiff = today.getDate() - dateOfBirth.getDate();


    // If birth date is still ahead in this year → hasn't reached birthday yet
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age >= 18;
}
export  function validate_signup_inputs ({UserInfos, helperText}:validate_signup_inputs_interface):boolean{



    //First,Lastname

    const signup_schema = z.object({
        firstname: z.string().min(2, { error: "first name must be at least 2 characters long" }).trim(),
        lastname: z.string().min(2, { error: "last name must be at least 2 characters long" }).trim(),
        email: z.string().email({ error: "Please enter a valid email." }),
        password: z.string()
            .min(8, { error: "Password must Be at least 8 characters long" })
            .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
            .regex(/[0-9]/, { error: "Contain at least one number." })
            .trim(),
        repeated_password: z.string(),
        birthday: z.date().refine(is18YearsOld, {
            error: "You must be at least 18 years old to create an account.",
        }),
    }).refine((data) => data.password === data.repeated_password, {
        path: ["repeated_password"],
        error: "Passwords do not match.",
    });




    const {error, success, data} = signup_schema.safeParse(UserInfos);





    if(!success){
        const error_message =  z.treeifyError(error).properties;


        //firstname validation
        if(error_message &&  error_message.firstname){
            //set helpertext for firstname
            if(helperText)
            helperText.setFirstname_helperText(error_message.firstname.errors[0]);

        }else{
            if(helperText)
                helperText.setFirstname_helperText("");
        }


        //lastname Validation
        if(error_message &&  error_message.lastname){
            //set helpertext for lastname
            if(helperText)
                helperText.setLastname_helperText(error_message.lastname.errors[0]);
        }else{
            if(helperText)
                helperText.setLastname_helperText("");
        }


        //email Validation
        if(error_message &&  error_message.email){
            //set helpertext for email
            if(helperText)
                helperText.setEmail_helperText(error_message.email.errors[0]);
        }else{
            if(helperText)
                helperText.setEmail_helperText("");
        }

        //password Validation
        if(error_message &&  error_message.password){
            //set helpertext for password
            if(error_message.password.errors.length > 1){
                const  errorText   = error_message.password.errors.join("\n");
                if(helperText)
                    helperText.setPassword_helperText(errorText);
            }else {
                if(helperText)
                    helperText.setPassword_helperText(error_message.password.errors[0]);
            }

        }else{
            if(helperText)
                helperText.setPassword_helperText("");
        }


        //password-repeat Validation
        if (error_message && error_message.repeated_password) {
            if (helperText) {
                helperText.setConfirmPassword_helperText(error_message.repeated_password.errors[0]);
            }
        } else {
            if (helperText) {
                helperText.setConfirmPassword_helperText("");
            }
        }


        //birthday check
        if(error_message && error_message.birthday){
            if(helperText)
                helperText.setBirthday_helperText(error_message.birthday.errors[0]);
        }else {
            if(helperText)
                helperText.setBirthday_helperText("Bitte gib dein Geburtsdatum ein, um zu bestätigen, dass du mindestens 18 Jahre alt bist.")
        }

        return false;

    }else {
        //proccess forwared
        console.log("Success " + JSON.stringify(data));
        return  true;
    }


}


//server
export  function general_validation ({UserInfos}:validate_signup_inputs_interface){



    //First,Lastname

    const signup_schema = z.object({
        firstname: z.string().min(2,{error: "first name must be at least 2 characters long"}).trim(),
        lastname: z.string().min(2,{error: "last name must be at least 2 characters long"}).trim(),
        email: z.string().email({error:'Please enter a valid email.'}),
        password: z.string()
            .min(8, { error: 'Password must Be at least 8 characters long' })
            .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
            .regex(/[0-9]/, { error: 'Contain at least one number.' })
            .trim(),
        birthday: z.date().refine(is18YearsOld, {
            error: "You must be at least 18 years old to create an account."
        })
    });


    const {error, success, data} = signup_schema.safeParse(UserInfos);


    if(!success){
        const error_message =  z.treeifyError(error).properties;

        console.error("[SIGN UP] [VALIDATION] Error "+ JSON.stringify(error_message));

        if(error_message)return Errors_list.INPUT_NOT_VALID;


    }else {
        //proccess forwared
        console.log("Data validated");
        return undefined;
    }


}



type response_type = {
    success: boolean,
    message: string,
}

type password_response_type = {
    password_check_success: boolean,
    password_check_message: string,
}

export  function validate_email (email:string) : response_type {

    console.info("Email validation ...")



    //First,Lastname

    const signup_schema = z.object({
        email: z.string().email({error:Errors_list.emailNotValid}),
    });


    const {error, success, data} = signup_schema.safeParse({email:email});


    if(!success){
        const error_message =  z.treeifyError(error).properties;


        //email Validation
        if(error_message &&  error_message.email){
            console.info("[EMAIL CHECK] : " + error_message.email.errors[0]);
            return {
                success:false,
                message:error_message.email.errors[0],
            }
        }else{
            return {
                success:true,
                message:""
            }
        }

    }else {
        //proccess forwared
        console.info("[EMAIL CHECK] Email is valid");
        return {
            success:true,
            message:""
        }
    }


}

export function validate_password (password:string): password_response_type{


    const signup_schema = z.object({
        password: z.string()
            .min(8, { error: 'Password must Be at least 8 characters long' })
            .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
            .regex(/[0-9]/, { error: 'Contain at least one number.' })
            .trim()
    });

    const {error, success} = signup_schema.safeParse({password:password});


    if(!success){
        const password_error_messages =  z.treeifyError(error).properties;


        //password Validation
        if(password_error_messages &&  password_error_messages.password){
            if(password_error_messages.password.errors.length > 1)
                return {password_check_success:false, password_check_message: password_error_messages.password.errors.join("\n")}
            else
                return {password_check_success:false, password_check_message:password_error_messages.password.errors[0]};
        }else {
            console.error("[PASSWORD CHECK] unknown error occurred!")
            return {password_check_success:false, password_check_message:"[PASSWORD CHECK] unknown error occurred!"};
        }




    }else {
        //proccess forwared
        console.info("[PASSWORD CHECK] Password is valid");
        return {
            password_check_success:true,
            password_check_message:""
        }
    }

}
