"use client"


//List all users including admin, devs,  clients, employees.


//Datagrid











import {useRouter} from "next/navigation";
import {DataGrid, gridClasses, GridColDef} from "@mui/x-data-grid";
import {Typography, Switch, Button,Alert, Select, Option} from "@material-tailwind/react";


//FETCH
import getInventoryCategories from "@/lib/api/admin/inventory/inventory_categories";



import {ROUTES} from "@/lib/Routes/routes";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import React, {Dispatch, SetStateAction, useEffect, useState} from "react";


//Custom
import Custom_Dialogue from "@/lib/ui/components/Dialogue";
import {TextField} from "@mui/material";
import Divider from "@mui/material/Divider";
import {categories_structure} from "@/types/inventory_meta/inventory_categories_meta/type";
import {getUsers} from "@/lib/api/admin/super_admin/users/users_calls";
import {StatusMeta, UserMeta} from "@/types/super_admin_meta/users_meta/type";




function Data_grid({ rows, Dialogue_Handler, SetRowValue }: { rows: UserMeta[],Dialogue_Handler:Dispatch<SetStateAction<boolean>>, SetRowValue:Dispatch<SetStateAction<UserMeta | null >>  }) {

    const navigate = useRouter();



    const columns: GridColDef[] = [

        { field: "name", headerName: "USER", width: 100 },

        { field: "email", headerName: "EMAIL", width: 150 },

        { field: "role", headerName: "ROLE", width: 100 },


        { field: "status", headerName: "STATUS", width: 180,

            renderCell: (props) => {
            let div_color;
            switch (props.value as StatusMeta){
                case "Active":
                    div_color = "mediumseagreen";
                    break;
                case "Inactive":
                    div_color = "red";
                    break;
                case "Blocked":
                    div_color = "darkorange";
                    break;

                default:
                    div_color = "red";
            }

                return (
                    <div className={" flex items-center"} style={{

                        height: "100%",
                        width: "100%",

                    }}>
                        <div className={"inline-flex"} style={{
                            backgroundColor: div_color,
                            borderRadius: "5px",
                        }}>
                            <Typography className={""} style={{
                                color: "white",
                                fontSize: "12px",
                                margin: "6px"
                            }} >{`\u2022 ${props.value}` }</Typography>
                        </div>
                    </div>

                )
            }
        },

        { field: "created_at", headerName: "CREATED AT", width: 100 },


        {

            field: "Button",

            headerName: "OPS",

            minWidth: 141,

            renderCell: (props) => (

                <div className="flex-row">


                    <div

                        onClick={() => {

                            navigate.push(ROUTES.USER_EDIT(props.row._id));
                            SetRowValue(props.row)


                        }}

                        className="!inline !p-2 !rounded-xl !border-2 !border-gray-200 hover:bg-gray-200 !mr-2 cursor-pointer"

                    >

                        <RemoveRedEyeOutlinedIcon

                            sx={{

                                width: "15px",

                                height: "15px",

                                color: "black",

                            }}

                        />

                    </div>

                    <div className="!inline !p-2 !rounded-xl !border-2 !border-gray-200 hover:bg-gray-200 !mr-2 cursor-pointer">

                        <MoreVertIcon

                            sx={{

                                width: "15px",

                                height: "15px",

                            }}

                        />

                    </div>

                </div>

            ),

        },

    ];

    return (

        <div


            style={{
                marginTop: "2px",
                height: "100%",

                width: "100%",

            }}

        >

            <DataGrid

                columns={columns}

                rows={rows}

                disableRowSelectionOnClick

                sx={{

                    fontSize: "12px",

                    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:

                        {

                            outline: "none",

                        },

                    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:

                        {

                            outline: "none",

                        },

                }}

            />

        </div>

    );

}





export default function Users(){
    const [Users, setUsers] = useState<UserMeta[]>([])

    //Dialog
    const [openDialogue, setOpenDialogue] = useState<boolean>(false);



    //Dialog Brand Value
    const [RowValue, setRowValue] = useState<UserMeta | null>(null);


    //Select row, we open dialogue with values of that row


    useEffect(() => {
        let active = true;


        getUsers({filter:["_id", "name","role", "email", "created_at", "status"]}).then((res) => {
            if (active && res.success) {

                const users = res.data as UserMeta[];
                //unique id for dataGRID //map with eiding the original
                users.map((user_meta)=> user_meta.id = user_meta._id);
                setUsers(res.data);
            }
        });

        return () => {
            active = false;
        };
    }, []);


    useEffect(() => {
        console.log("Row value:", RowValue )
    }, [RowValue]);


    return (
        <div className={"h-screen flex flex-col"} style={{
            width:"100%",

        }} >
            <div className={"mb-2"}>
                <Typography className={"font-bold"}>
                    Users
                </Typography>

                <div className={"flex justify-between items-center"}>
                    <Typography variant={"paragraph"}>
                        Add, edit, and organize Users
                    </Typography>

                    <div className={"flex gap-2 "}>
                        <Button className={"bg-white p-2 border-[2px] border-gray-100"}>
                            <RefreshIcon sx={{
                                width:"15px",
                                height:"15px",
                                color:"black"
                            }}/>
                        </Button>
                        <Button className={"flex gap-2 p-2 bg-[#ff0000] items-center"}>
                            <AddIcon sx={{
                                width:"15px",
                                height:"15px"
                            }}/>
                            <Typography className={"text-[12px]"}>
                                Add User
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>

            <Data_grid rows={Users} Dialogue_Handler={setOpenDialogue} SetRowValue={setRowValue}/>
        </div>
    )
}