import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Typography} from "@material-tailwind/react";
import React from "react";


type Data_Type = {
    Header : string[],
    Content : React.ReactNode[]
}

export default function generate_accordion ({Data}:{Data:Data_Type}) {
    return (
        <>
            {Array.from({length:Data["Header"].length}).map((v,i)=>{
                return (
                    <Accordion key={i}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                        >
                            <Typography variant={"h5"} className="font-bold">
                                {Data["Header"][i]}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {Data["Content"][i]}
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </>
    )
}
