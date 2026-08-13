import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Typography} from "@material-tailwind/react";

//icons
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import {useState} from "react";

export function AlertDismissible({AlertMessage, isOpen}: {AlertMessage:string, isOpen:boolean}) {
    const [Open, setOpen] = useState<boolean>(isOpen)

    return (
        <Stack  sx={{ overflow: 'hidden',
            transition: 'max-height 700ms ease',
            maxHeight: Open ? '200px' : '0px',}} spacing={2}>
            <div className={`w-full bg-[#FFE9E6] flex flex-row justify-between p-3 ${Open ? "opacity-100" : "opacity-0"} transition-opacity ease-out duration-700`}>
                <div className="flex flex-row gap-3 items-center">
                    <WarningAmberOutlinedIcon sx={{
                        fill: "red",
                        width: "20px",
                        height: "20px",
                    }} />
                    <Typography variant="small">
                        {AlertMessage}
                    </Typography>
                </div>

                <CloseOutlinedIcon onClick={()=>setOpen(false)} className={"cursor-pointer"} sx={{
                    width: "20px",
                    height: "20px",
                }}/>
            </div>
        </Stack>
    );
}
