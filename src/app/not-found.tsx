"use client"

import {Typography, Button} from "@material-tailwind/react"
import {useRouter} from "next/navigation";

export default function NotFound(){

    const navigate = useRouter();


    return(
        <div className="w-screen h-screen">
            <div className="w-full h-full flex flex-col items-center justify-center">
                    <Typography  className="mb-5" variant="h5" color={"red"}>
                        Ups! Etwas ist schiefgelaufen!
                    </Typography>

                <Typography className="mb-5" variant="paragraph" color={"black"}>
                        Leider ist ein technischer Fehler aufgetreten, wir grübeln bereits an der Lösung.
                    </Typography>

                    <Button
                        color={"red"}
                        className="text-white"
                        onClick={()=>navigate.refresh()}
                    >
                        Seite neuladen
                    </Button>

                <Typography variant={"small"}>
                        Error 404
                    </Typography>
            </div>

        </div>
    )
}