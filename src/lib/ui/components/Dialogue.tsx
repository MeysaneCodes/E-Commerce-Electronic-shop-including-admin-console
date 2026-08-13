import React, {useState} from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";



type props = {
    Handler: React.Dispatch<React.SetStateAction<boolean>>,
    Handler_Value: boolean,
    Header: React.ReactNode,
    Body: React.ReactNode,
    Footer: React.ReactNode,
}

export default function Custom_Dialogue({Handler,Handler_Value,Header, Body, Footer}:props){



    return (
        <Dialog handler={()=> Handler(!Handler_Value)} open={Handler_Value}>
            <DialogHeader>
                {Header}
            </DialogHeader>

            <DialogBody>
                {Body}
            </DialogBody>

            <DialogFooter>
                {Footer}
            </DialogFooter>
        </Dialog>
    )




}