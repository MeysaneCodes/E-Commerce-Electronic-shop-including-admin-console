"use client"


import {Button, Checkbox, List, ListItem, Typography} from "@material-tailwind/react";
import AddIcon from "@mui/icons-material/Add";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {StatusMeta, UserMeta} from "@/types/super_admin_meta/users_meta/type";
import {useRouter} from "next/navigation";
import {DataGrid, gridClasses, GridColDef} from "@mui/x-data-grid";
import {ROUTES} from "@/lib/Routes/routes";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    getAccountStatus,
    getAccountTypeMeta, getPermissionsMeta,
    getRoleTypeMeta,
    getUsers
} from "@/lib/api/admin/super_admin/users/users_calls";
import {RoleMeta} from "@/types/super_admin_meta/roles_type/type";
import {randomInt} from "crypto";
import {PermissionMeta} from "@/types/super_admin_meta/permissions_type/type";
import {DropDown_Custom} from "@/components/ui/DropDown";


function Data_grid({ rows }: { rows: RoleMeta[] | undefined }) {

    const navigate = useRouter();



    const columns: GridColDef[] = [

        { field: "name", headerName: "ROLE NAME", width: 200},

        { field: "key", headerName: "ROLE KEY", width: 150, renderCell: (props)=>{
            return(
                <div className={"w-full h-full flex items-center"}>
                    <Typography variant={"small"} className={"rounded-xl bg-gray-100 p-2"}>
                        {props.value}
                    </Typography>
                </div>
            )
            } },

        { field: "role", headerName: "USERS", width: 100, renderCell: props => {
                return(
                    <div className={"w-full h-full flex items-center"}>
                        <Typography variant={"small"}>
                            {Math.floor(Math.random() * 100)}
                        </Typography>
                    </div>
                )

            } },


        { field: "is_active", headerName: "STATUS", width: 180,

            renderCell: (props) => {
                let div_color;
                if(props.value)
                    div_color = "mediumseagreen";
                else
                    div_color = "red";


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
                            }} >{`\u2022 ${props.value ? "active" : "inactive"}` }</Typography>
                        </div>
                    </div>

                )
            }
        },

        {

            field: "Button",

            headerName: "ACTIONS",

            minWidth: 141,

            renderCell: (props) => (

                <div className="flex-row">


                    <div

                        onClick={() => {

                            navigate.push(ROUTES.USER_EDIT(props.row._id));
                            //SetRowValue(props.row)


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

        }

    ];

    return (

        <div


            style={{
                marginTop: "2px",
                height: "500px",

                width: "100%",

            }}

        >

            <DataGrid

                columns={columns}

                rows={rows}


                autoPageSize={true}

                onPaginationModelChange={(model, details)=>{
                    console.log(model.page);
                }}

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



function Data_grid_permissions({ rows }: { rows: PermissionMeta[] | undefined }) {

    const navigate = useRouter();



    const columns: GridColDef[] = [

        { field: "name", headerName: "PERMISSION NAME", width: 200},

        { field: "key", headerName: "PERMISSION KEY", width: 150, renderCell: (props)=>{
                return(
                    <div className={"w-full h-full flex items-center"}>
                        <Typography variant={"small"} className={"rounded-xl bg-gray-100 p-2"}>
                            {props.value}
                        </Typography>
                    </div>
                )
            } },

        { field: "module", headerName: "Module", width: 100, renderCell: props => {
                return(
                    <div className={"w-full h-full flex items-center"}>
                        <Typography variant={"small"}>
                            {props.value}
                        </Typography>
                    </div>
                )

            } },


        { field: "is_active", headerName: "STATUS", width: 180,

            renderCell: (props) => {
                let div_color;
                if(props.value)
                    div_color = "mediumseagreen";
                else
                    div_color = "red";


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
                            }} >{`\u2022 ${props.value ? "active" : "inactive"}` }</Typography>
                        </div>
                    </div>

                )
            }
        },

        {

            field: "Button",

            headerName: "ACTIONS",

            minWidth: 141,

            renderCell: (props) => (

                <div className="flex-row">


                    <div

                        onClick={() => {

                            navigate.push(ROUTES.USER_EDIT(props.row._id));
                            //SetRowValue(props.row)


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

        }

    ];

    return (

        <div


            style={{
                marginTop: "2px",
                height: "500px",

                width: "100%",

            }}

        >

            <DataGrid

                columns={columns}

                rows={rows}


                autoPageSize={true}

                onPaginationModelChange={(model, details)=>{
                    console.log(model.page);
                }}

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



function Permission_managment_container ({Modulename}:{Modulename:string}){
    const pn = ["Create","Edit","View","Delete"]


    return (
        <div className={"w-full"}>
            <div className={"mb-4"}>
                <Typography variant={"h5"} className={"font-bold"}>
                    {Modulename} Permissions
                </Typography>
                <Typography variant={"small"}>
                    Manage permissions for {Modulename} module
                </Typography>

            </div>

            <div className={"w-full grid grid-cols-7 gap-4 bg-gray-100 p-2"}>
                <div className={"col-span-3"}>
                    <Typography className={"font-bold"} variant={"small"}>
                        PERMISSIONS
                    </Typography>
                </div>
                    {pn.map((e,i)=>(<Typography key={i} className={"font-bold"} variant={"small"}>
                        {e}
                    </Typography>))}
            </div>

            <div className={"w-full grid grid-cols-7 gap-4 p-2 mt-2"}>
                <Typography className={"col-span-3 font-bold"} variant={"small"}>
                    {Modulename}
                </Typography>

                {pn.map((e,i)=>(<Checkbox key={i} defaultChecked={true} crossOrigin={undefined}/>))}

            </div>



        </div>
    )
}

function Permissions_managment({ModuleName}:{ModuleName:string}){

    const pn = ["Create","Edit","View","Delete"]





    switch (ModuleName){
        case "User":
            return <Permission_managment_container Modulename={ModuleName} key={ModuleName}/>

        case "suppliers":
            return <Permission_managment_container Modulename={ModuleName} key={ModuleName}/>

        case "invoices":
            return <Permission_managment_container Modulename={ModuleName} key={ModuleName}/>

        case "frontend":
            return <Permission_managment_container Modulename={ModuleName} key={ModuleName}/>

        case "profile":
            return <Permission_managment_container Modulename={ModuleName} key={ModuleName}/>

        default:
            return <Permission_managment_container  Modulename={ModuleName} key={ModuleName}/>
    }





}



function Permission_Overview({Roles, Permissions}:{Roles:RoleMeta[], Permissions:PermissionMeta[]}){
    const [selected, setSelected] = useState<number>(0);

    const select = (index:number)=>setSelected(index);


    const modules = Array.from(new Set(Permissions.map((item) => item.module)))

            return (<div className={"w-full h-full min-h-0  flex flex-row gap-5"}>

                    <div className={"h-full min-h-0 overflow-y-scroll"}>
                        <List className={""}>
                    {modules.map((e,i)=>(<ListItem key={i} className={`group focus:bg-red-100 ${selected == i ? "bg-red-100" : ""} `} selected={selected == i} onClick={() => select(i)}>
                        <Typography className={`${selected == i ? "text-[#ff0000]" : ""} `}>{e}</Typography>
                    </ListItem>))}
                </List>
            </div>
            <div className={"w-full"}>
                <div>
                    <Permissions_managment ModuleName={modules[selected]}/>
                </div>
            </div>

        </div>



    )
}

export default function Roles_and_permissions_page() {

    const [RolesList, setRolesList] = useState<RoleMeta[] | undefined>(undefined);
    const [PermissionsList, setPermissionsList] = useState<PermissionMeta[] | undefined >(undefined);




    useEffect(() => {

        async function fetch(){
            //TODO loading skeleton ?
            try {
                //const acc_type_res = await getAccountTypeMeta();
                //const user_res = await getUsers({filter:["_id", "name"]});
                const {data, success} = await getRoleTypeMeta({projection:{}});
                const perm_res = await getPermissionsMeta({projection:{}});

                data.map((e:RoleMeta)=>e.id = e._id);
                perm_res.data.map((e:PermissionMeta)=>e.id = e._id);


                console.log("check this:", data)
                setRolesList(data);
                console.log("cc2:", perm_res.data)
                setPermissionsList(perm_res.data)

                //const status = await getAccountStatus();
            }catch (e){

            }finally {


            }
        }


        fetch();

    }, []);




    return (
        <div className={"w-full h-full flex flex-col gap-6"}>
            <div className={"w-full grid grid-cols-2 gap-6"}>
                <div className={"w-full h-full border-2 border-gray-200 shadow-sm rounded-lg flex flex-col gap-4"}>
                    <div className={"flex justify-between items-center p-6 bg-red-100 border-b-2 border-gray-200"}>
                        <div>
                            <Typography className={"font-bold"} variant={"h6"}>
                                Roles
                            </Typography>
                            <Typography variant={"small"}>
                                Manage user roles and their access level
                            </Typography>
                        </div>

                        <Button className={"bg-[#ff0000] inline-flex gap-2"}>
                            <AddIcon sx={{width:"15px", height:"15px"}}/>
                            <Typography className={"text-[12px] font-bold"}>
                                Add Role
                            </Typography>
                        </Button>
                    </div>



                    <div>
                        <Data_grid rows={RolesList}/>
                    </div>
                </div>
                <div className={"w-full h-full border-2 border-gray-200 shadow-sm rounded-lg flex flex-col gap-4"}>
                    <div className={"flex justify-between items-center p-6 bg-red-100 border-b-2 border-gray-200"}>
                        <div>
                            <Typography className={"font-bold"} variant={"h6"}>
                                Permissions
                            </Typography>
                            <Typography variant={"small"}>
                                Manage system permissions.
                            </Typography>
                        </div>

                        <Button className={"bg-[#ff0000] inline-flex gap-2"}>
                            <AddIcon sx={{width:"15px", height:"15px"}}/>
                            <Typography className={"text-[12px] font-bold"}>
                                Add Permission
                            </Typography>
                        </Button>
                    </div>



                    <div>
                        <Data_grid_permissions rows={PermissionsList}/>
                    </div>
                </div>
            </div>


            <div className={"h-[400px]"}>
                {RolesList && PermissionsList && (<div className={"w-full h-full border-2 border-gray-200 shadow-sm rounded-lg flex flex-col gap-6"}>
                    <div className={"flex  justify-between items-center p-6 bg-red-100 border-b-2 border-gray-200"}>
                        <div>
                            <Typography className={"font-bold"} variant={"h6"}>
                                Role Permission Overview
                            </Typography>
                            <Typography variant={"small"}>
                                View and manage permissions for a specific role.
                            </Typography>
                        </div>

                        <div className={"flex flex-row items-center gap-4 "}>
                            <Typography>
                                Select Role :
                            </Typography>
                            <DropDown_Custom
                                onClick={()=>{}} SelectedItem={RolesList ? RolesList[0].name :  ""}
                                MenuItems={RolesList ? RolesList.map((e)=>e.name) : []} input_label={""} VariantStyle={"outlined"}/>
                        </div>
                    </div>



                    <div className={"w-full min-h-0 overflow-hidden flex-1  flex-row gap-4"}>
                        <Permission_Overview Roles={RolesList} Permissions={PermissionsList}/>
                    </div>
                </div>)}
            </div>
        </div>
    )
}