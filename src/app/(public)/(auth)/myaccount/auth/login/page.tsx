"use client"

import React, {useState} from 'react';
import {Typography,Button} from "@material-tailwind/react";
import {useRouter} from "next/navigation";
import {CaretDownIcon} from "@radix-ui/react-icons"
import {TextField} from "@mui/material"
import {validate_email} from "@/utils/sign_up_validation";
import {Errors_list} from "@/lib/api/sign_up_api_messages/sign_up_message_list";
import {HttpStatus} from "@/lib/api/Http_status/http_status";
import {textfieldSx} from "@/lib/ui/sx/sx_text_field";








async function postLogin(
    inEmail: string,
    inPassword: string,
    setEmailHelperText:React.Dispatch<React.SetStateAction<string>>,
    setPasswordHelperText:React.Dispatch<React.SetStateAction<string>>):Promise<{success:boolean, message:string, status?: number}> {

    const {success, message}  = validate_email(inEmail);


    //Email & Password Check

    //Email template check
    if(!success){
        if(message === Errors_list.emailNotValid){
            setEmailHelperText(Errors_list.emailNotValid);
            return {success:false, message:message};
        }
    }

    try{
        const response =  await fetch(`/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({
                email: inEmail,
                password: inPassword,
            })
        });

        const {success, message, status} = await response.json();


        //error handling
        if(!success){
            if (message === Errors_list.EMAIL_PASSWORD_NOT_VALID){
                setPasswordHelperText(Errors_list.EMAIL_PASSWORD_NOT_VALID);
            }

            if (message === Errors_list.emailNotValid){
                setEmailHelperText(Errors_list.emailNotValid)
            }

            return {success:false, message:message, status:status};
        }else {
            return {success:true, message:message, status:status};
        }




    }catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        console.log("[CLIENT] [LOGIN] Error occurred when Fetching : " + msg);
        return {success:false, message:msg, status: HttpStatus.INTERNAL_SERVER_ERROR};
    }
}




export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [emailHelperText, setEmailHelperText] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordHelperText, setPasswordHelperText] = useState<string>("");
    const navigate = useRouter();


    const handleSubmit = async (email:string,password:string) => {

        try {
            const result = await postLogin(email, password, setEmailHelperText, setPasswordHelperText);

            if (result.success) {
                navigate.push("/");
                return;
            }

            if (result.status === HttpStatus.INTERNAL_SERVER_ERROR) {
                navigate.push("/not-found");
            }

        }catch (error:unknown){
            const message = error instanceof Error ? error.message : String(error);
            console.error("[CLIENT] [LOGIN] : " + message);
        }
    };



        return (

            <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 py-10 scrollbar-hide sm:px-6">
                <p
                    onClick={()=>navigate.push("/")}
                    className="absolute left-4 top-4 flex items-center justify-center underline text-foreground select-none cursor-pointer sm:left-10 sm:top-5">

                    <CaretDownIcon className="flex rotate-90 size-5"/>
                    Zurück
                </p>



                <div className={`w-full max-w-[450px] bg-card  rounded shadow-xl p-4 border-2 sm:p-5 ${emailHelperText.length > 0 || passwordHelperText.length > 0 ? "border-destructive" : "border-border" }`}>
                    <div className="mb-6 text-card-foreground">
                        <Typography variant="h4" className="text-2xl font-bold sm:text-3xl">
                            Ich bin bereits Kunde
                        </Typography>
                        <Typography className={"text-card-foreground"}>
                            Logge dich jetzt ein, um alle Vorteile des myTemplate Kundenkontos wahrzunehmen.
                        </Typography>
                    </div>


                    <div className="w-full bg-card rounded pt-4 pb-6 sm:pt-6 sm:pb-8">
                        <div className="w-full mb-5">
                            <TextField className="w-full"
                                       sx={textfieldSx}
                                       label="E-mail Addresse" variant="outlined" type="email" error={emailHelperText.length > 0} helperText={emailHelperText}
                                       onChange={(e)=>{
                                           setEmail(e.target.value)
                                           setEmailHelperText("");
                                       }}/>
                        </div>

                        <div className="w-full">
                            <TextField className="w-full" label="Passwort" variant="outlined" type="password" error={passwordHelperText.length > 0} helperText={passwordHelperText}
                                       sx={textfieldSx}
                                       onChange={(e)=>{
                                           setPassword(e.target.value)
                                           setPasswordHelperText("");
                                       }}/>
                        </div>

                        <Button
                            onClick={()=>handleSubmit(email,password)}
                            className="w-full mt-3 bg-primary text-primary-foreground hover:bg-brand-700">
                            Einloggen
                        </Button>


                        <div className="mt-10 text-center">
                            <p className="text-muted-foreground">Du hast noch kein Online-Konto?</p>
                            <button
                                onClick={()=>navigate.push("/myaccount/auth/signup")}
                                type="button"
                                className="w-full gap-1 flex bg-secondary border-border mt-2 sm:mt-4 border-2 hover:bg-accent items-center justify-center text-secondary-foreground font-bold py-2 px-4 rounded focus:outline-none"
                            >
                                <CaretDownIcon className="flex rotate-[270deg] size-5"/>
                                Jetzt registrieren
                            </button>
                        </div>

                    </div>
                </div>


            </div>
        );
    }


