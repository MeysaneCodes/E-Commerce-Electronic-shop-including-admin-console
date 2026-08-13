"use client"

import React, {useState} from 'react';
//Components
import {TextField} from "@mui/material"
import {Button, Typography} from "@material-tailwind/react";
import {Radio} from '@mui/material';
import {textfieldSx} from "@/lib/ui/sx/sx_text_field";

//input validation
import CustomStepper from "@/components/ui/signup_stepper/stepper";


//otp field
import {unstable_OneTimePasswordField as OneTimePasswordField} from "radix-ui";


//EMAIL SENDING
import {Errors_list, Success_List} from "@/lib/api/sign_up_api_messages/sign_up_message_list";
import router from "next/navigation";
import {validate_signup_inputs, validate_email} from "@/utils/sign_up_validation";
import {Otp_messages_list} from "@/lib/api/sign_up_api_messages/otp_messages_list";
import {ROUTES} from "@/lib/Routes/routes";



//Change when deploying

export default function SignupPage() {
    //stepper
    const [step, setStep] = useState<number>(0);


    //user infos
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [birthDay, setBirthDay] = useState<Date | undefined >(undefined);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [email, setEmail] = useState('');

    //OTP INPUT
    const [otp_input, setOtp_input] = useState<string>("");
    const [otp_helperText, setOtp_helperText] = useState<string>("");



    //Input
    const [firstName_helpertext, setFirstName_helpertext] = useState<string>("");
    const [lastName_helpertext, setLastName_helpertext] = useState<string>("");
    const [email_helpertext, setEmail_helpertext] = useState<string>("");
    const [password_helpertext, setPassword_helpertext] = useState<string>("");
    const [confirmPassword_helpertext, setConfirmPassword_helpertext] = useState<string>("");
    const [birthday_helpertext, setBirthday_helpertext] = useState<string>("Bitte gib dein Geburtsdatum ein, um zu bestätigen, dass du mindestens 18 Jahre alt bist.");

    //backend input
    const [DataValid_helpertext, setDataValid_helpertext] = useState<string>("");
    

    //OTP INPUT
    //Radio
    const [salutationIndex, setSalutationIndex] = useState<number>(0);
    const salutations = ["Herr", "Frau", "Keine Angabe"];

    const navigate = router.useRouter();




    const onSubmit = async (email: string, index: number) => {

        //RESET TO DEFAULT
        setEmail_helpertext("");



            //TODO with RESEND SEND EMAIL
            //Send 6 words mail to the server.


            if (index === 0) {
                //Input Validation before sending to backend
                const {success, message} = validate_email(email);

                if(!success){
                    //email not valid
                    setEmail_helpertext(message);
                    return;
                }else setEmail_helpertext(message);






                try {
                    const res = await fetch(`/api/auth/signup/send_otp`, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({email: email}),
                    });

                    const {success, message} = await res.json();


                    if (success) {

                        console.info("6 digits code has been sent to the user, Message : " + message);
                        setStep((perv) => perv + 1);

                    } else {
                        if(message === Errors_list.emailNotValid ){
                            setEmail_helpertext(message);
                        }


                        if(message === Errors_list.emailExistsAlready){
                            setEmail_helpertext(message);
                        }

                        if(message === Otp_messages_list.TOO_MANY_REQUEST){
                            setEmail_helpertext(message)
                        }

                        console.warn("Error occurred when trying to reach otp. Message : " + message);
                    }
                } catch (e:unknown) {
                    console.log("Error occurred when trying to reach otp API" + String(e));
                }

            }
            else if (index === 1) {


                try {
                    const res = await fetch(`/api/auth/signup/verify_otp`, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({input_otp_code: otp_input, email: email}),
                    });

                    const {success, message} = await res.json();

                    if (success) {
                        console.info("Success, Message : " + message);
                        setStep((perv) => perv + 1);
                    }else {

                        if(message === Otp_messages_list.NOT_VALID_CREDENTIALS)
                            setOtp_helperText(Otp_messages_list.NOT_VALID_CREDENTIALS);




                        console.warn("Error occurred when trying to reach verify-otp API");
                    }
                } catch (e) {
                    console.error("Error occurred when trying to reach verify-otp API, Error : " + e);
                }

                //setStep(2);


                //TODO TEST ONLY
                /* post_Signup(email, password, password).then(r  =>{
                     console.log("signup : " + r);
                 });*/
            }
            else {
                //Input Validation


                const isValid = validate_signup_inputs(
                    {
                        UserInfos: {
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            password: password,
                            repeated_password: confirmPassword,
                            birthday: birthDay,
                        },

                        helperText: {
                            setFirstname_helperText:setFirstName_helpertext,
                            setLastname_helperText: setLastName_helpertext,
                            setEmail_helperText: setEmail_helpertext,
                            setPassword_helperText: setPassword_helpertext,
                            setConfirmPassword_helperText: setConfirmPassword_helpertext,
                            setBirthday_helperText: setBirthday_helpertext,
                        }
                    });


                //need to return
                if(!isValid)
                    return;


                //submitting the registration form
                const response = await fetch(`/api/auth/signup/create_user_account`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        salutation:salutations[salutationIndex],
                        firstname: firstname,
                        lastname: lastname,
                        birthDay: birthDay,
                        email: email,
                        password: password,
                    }),
                });

                //handle account linked with this email already exists
                const {success,message} = await response.json();
                if (success) {
                    if(message === Errors_list.emailExistsAlready){
                        //TODO show error above input
                    }else if (message === Success_List.account_created){
                        console.info("Account created successfully.");
                        navigate.push("/");
                    }
                }else {
                    //TODO show error
                    //double check of the last input

                    if(message === Errors_list.INPUT_NOT_VALID){
                        setDataValid_helpertext(message);
                    }
                }


            }





    }
    return (
        <div className="w-full flex min-h-screen bg-background text-foreground  justify-center p-5">
            <div className={"w-full max-w-[450px]"}>
                <div className="text-center mb-5">
                    <Typography  variant="h6">
                        Ich bin Neukunde
                    </Typography>
                </div>

                <div className="w-full flex items-center justify-center mb-10 ">
                    <CustomStepper stepperIndex={step}/>
                </div>


                <div className={`${step === 0 ? "" : "hidden"}`}>
                    <div className="text-center flex  w-full items-center justify-center mb-5">
                        <Typography className="w-[400px]">
                            Gib unten deine E-Mail-Adresse ein: Wir senden dir einen 6-stelligen Code zu, um sie zu
                            verifizieren und dein Konto zu sichern.
                        </Typography>
                    </div>

                    <div className=" flex w-full mb-5">
                        <TextField className="w-full" sx={textfieldSx}  label="E-mail Addresse"   variant="outlined" type="email" error={email_helpertext.length > 0} helperText={email_helpertext}
                                   onChange={(e)=>setEmail(e.target.value)}/>
                    </div>

                    <div className="w-full">
                        <Button
                            onClick={() => onSubmit(email, 0)}
                            className="bg-primary text-primary-foreground hover:bg-brand-700 w-full">
                            Weiter
                        </Button>

                        <div className="mt-5">
                            <Typography variant="paragraph" className="text-muted-foreground flex justify-center items-center">
                                Du hast bereits ein Online-Konto?
                            </Typography>
                        </div>


                        <Button onClick={()=>navigate.push(ROUTES.LOGIN)} className="w-full mt-2 bg-secondary text-secondary-foreground hover:bg-accent">
                            Hier Einloggen
                        </Button>
                    </div>
                </div>

                <div className={`${step === 1 ? "" : "hidden"}`}>
                    <div className="w-full   mb-5">
                        <Typography className="w-[400px]">
                            Bitte prüfe jetzt deine Mailbox! Gib den 6-stelligen Verifizierungs-Code ein,
                            der an {email} gesendet wurde.
                        </Typography>

                        <Typography variant="paragraph" className="">
                            Der Code läuft nach 5 Minuten ab.
                        </Typography>
                    </div>

                    <div className="mt-5">
                        <Typography
                            onClick={() => setStep(0)}
                            variant="paragraph" className="font-bold select-none cursor-pointer">
                            E-Mail-Adresse ändern
                        </Typography>
                    </div>

                    <Typography variant="paragraph" className="mt-5">
                        Den 6-stelligen Verifizierungs-Code eingeben
                    </Typography>
                    <div className=" flex items-center w-full mb-5 mt-2 ">


                        <OneTimePasswordField.Root
                            onValueChange={(v)=>setOtp_input(v)}
                            name="otp" className="flex gap-2 flex-nowrap border-none ">

                            {Array.from({length: 6}).map((_, i) => {
                                return (
                                    <OneTimePasswordField.Input
                                        key={i}
                                        className="bg-secondary text-secondary-foreground  h-[60px] w-10  text-center items-center
                                        justify-center rounded  p-0 text-[30px] leading-none
                                         outline-none   selection:text-primary hover:shadow-[0_0_0_1px_hsl(var(--ring))]
                                        focus:shadow-[0_0_0_2px_hsl(var(--primary))]"/>
                                )
                            })}
                            <OneTimePasswordField.OneTimePasswordFieldHiddenInput value={otp_input}/>
                        </OneTimePasswordField.Root>

                    </div>

                    <div>
                        <Typography className={"text-destructive"} hidden={!(otp_helperText.length > 0)}>
                            {otp_helperText}
                        </Typography>
                    </div>

                    <Typography
                        onClick={() => onSubmit(email, 0)}
                        className="font-bold mb-10 select-none cursor-pointer" variant="small">
                        Neuen Code zusenden
                    </Typography>

                    <div className="w-full">
                        <Button
                            disabled={!(otp_input.length === 6)}
                            onClick={() => onSubmit(email, 1)}
                            className="bg-primary text-primary-foreground hover:bg-brand-700 w-full">
                            Absenden
                        </Button>

                    </div>
                </div>


                <div className={`${step === 2 ? "" : "hidden"} w-full `}>

                    <div className="w-full">
                        {/*Salutation*/}
                        <div className="w-full mb-5">
                            <Typography variant={"h6"} className="font-bold mb-2">
                                Wähle deine Anrede
                            </Typography>
                            <div className=" flex items-center ">

                                {salutations.map((value,index) => {
                                    return (
                                        <div key={index} className="inline-flex items-center">
                                            <Radio
                                                onClick={()=>setSalutationIndex(index)}
                                                sx={{
                                                    color: "hsl(var(--foreground))",
                                                    '&.Mui-checked': {
                                                        color: "hsl(var(--primary))",
                                                    }

                                                }} checked={salutationIndex === index}/>

                                            <Typography>
                                                {value}
                                            </Typography>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>

                        <div>
                            <div className="w-full mb-5">
                                <TextField    className="w-full" sx={textfieldSx}  label="Vorname" variant="outlined" type="text" error={firstName_helpertext.length > 0} helperText={firstName_helpertext}
                                            onChange={(e)=>{
                                                setFirstname(e.target.value);
                                                setFirstName_helpertext("");
                                            }}/>
                            </div>

                            <div className="w-full mb-5">
                                <TextField className="w-full" sx={textfieldSx}  label="Nachname" variant="outlined" type="text" error={lastName_helpertext.length > 0} helperText={lastName_helpertext}
                                           onChange={(e)=>{
                                               setLastname(e.target.value);
                                               setLastName_helpertext("");
                                           }}/>
                            </div>

                            <div className="w-full mb-5">
                                <TextField className="w-full" sx={textfieldSx}  label="" defaultValue={""}  variant="outlined" type="date" error={birthday_helpertext.length > 0} helperText={birthday_helpertext}
                                           onChange={(e)=>{
                                               setBirthDay(new Date(e.target.value));
                                               setBirthday_helpertext("");
                                           }}/>
                            </div>

                            <div className="w-full mb-5">
                                <TextField className="w-full" sx={textfieldSx}  label="Passwort" variant="outlined" type="password" error={password_helpertext.length > 0} helperText={password_helpertext}
                                           onChange={(e)=>{
                                               setPassword(e.target.value);
                                               setPassword_helpertext("");
                                           }}/>
                            </div>

                            <div className="w-full mb-2">
                                <TextField className="w-full"  sx={textfieldSx}   label="Passwort wiederholen" variant="outlined" type="password"  error={confirmPassword_helpertext.length > 0}  helperText={confirmPassword_helpertext}
                                           onChange={(e)=>{
                                               setConfirmPassword(e.target.value);
                                               setConfirmPassword_helpertext("");
                                           }}/>
                            </div>

                            <Typography onChange={()=>setDataValid_helpertext("")} className="mb-5 text-destructive" variant="small"  hidden={!(DataValid_helpertext.length > 0)}>
                                {DataValid_helpertext}
                            </Typography>

                            <div className="w-full mb-5">
                                <Button
                                    onClick={()=> onSubmit(email,2)}
                                    className="w-full bg-primary text-primary-foreground hover:bg-brand-700">
                                    Jetzt Registrieren
                                </Button>
                            </div>
                        </div>



                    </div>


                </div>


            </div>
        </div>
    );
}

