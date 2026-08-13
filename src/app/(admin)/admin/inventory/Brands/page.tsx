"use client"

import {useRouter} from "next/navigation";
import {DataGrid, gridClasses, GridColDef} from "@mui/x-data-grid";
import {Typography, Switch, Button,Alert, Select, Option} from "@material-tailwind/react";


//FETCH
import getBrands from "@/lib/api/admin/inventory/brands";



import {ROUTES} from "@/lib/Routes/routes";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';

import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {brand_structure} from "@/types/inventory_meta/brands_meta/type";


//Custom
import Custom_Dialogue from "@/lib/ui/components/Dialogue";
import {TextField} from "@mui/material";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import {image_options} from "@/types/inventory_meta/product_meta/type";




function Data_grid({ rows, Dialogue_Handler, SetRowValue }: { rows: brand_structure[],Dialogue_Handler:Dispatch<SetStateAction<boolean>>, SetRowValue:Dispatch<SetStateAction<brand_structure | null >>  }) {

    const navigate = useRouter();

    

    const columns: GridColDef[] = [

        { field: "brand", headerName: "Brand", width: 100 },

        { field: "created_at", headerName: "Created At", width: 150 },

        { field: "status", headerName: "Status", width: 180,

        renderCell: (props) => (
            <div className={" flex items-center"} style={{

                height: "100%",
                width: "100%",

            }}>
                <div className={"inline-flex"} style={{
                    backgroundColor: props.value ? "mediumseagreen" : "red",
                    borderRadius: "5px",
                }}>
                    <Typography className={""} style={{
                        color: "white",
                        fontSize: "12px",
                        margin: "6px"
                    }} >{props.value ? "\u2022 Active":"\u2022 Disabled"}</Typography>
                </div>
            </div>

        )
        },

        {

            field: "Button",

            headerName: "OPS",

            minWidth: 141,

            renderCell: (props) => (

                <div className="flex-row">


                    <div

                        onClick={() => {

                            //navigate.push(ROUTES.INVENTORY_EDIT(props.row._id));
                            Dialogue_Handler((prev)=>!prev);
                            SetRowValue(props.row)


                        }}

                        className="!inline !p-2 !rounded-xl !border-2 !border-gray-200 hover:bg-gray-200 !mr-2 cursor-pointer"

                    >

                        <EditDocumentIcon

                            sx={{

                                width: "15px",

                                height: "15px",

                                color: "black",

                            }}

                        />

                    </div>

                    <div className="!inline !p-2 !rounded-xl !border-2 !border-gray-200 hover:bg-gray-200 !mr-2 cursor-pointer">

                        <DeleteIcon

                            sx={{

                                width: "15px",

                                height: "15px",

                                color: "indianred",

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



function Dialogue_Header(){
    return(
        <div className={"w-full"}>
            <Typography className={"font-bold mb-4"}>
                Edit Brand
            </Typography>
            <Divider/>
        </div>
    )
}

function Dialogue_Body({RowValue, SetRowValue}:{RowValue:brand_structure | null ,SetRowValue:Dispatch<SetStateAction<brand_structure | null >> }){

    const [label_title, setLabel_title] = useState<string>("Choose File")
    const [URL_PREVIEW, setURL_PREVIEW] = useState<string>("/logo/upload_logo_4000x4000.png")
    const [File, setFile] = useState<File | null>(null)


    //Alert
    const [alertOpen, setAlertOpen] = useState<boolean>(false);




    function handle_preview(file:File):string{
        return URL.createObjectURL(file);
    }

    //on change => we update the rows

    return(
        <div className="ml-4 mr-4">

            <>

                <Alert className={"relative w-full flex"} open={alertOpen} color={"amber"}>
                    <div className="!w-[100%] flex items-center">
                        <div className={"flex w-full gap-2"}>
                            <ErrorIcon/>
                            <Typography>Selected file is too large. Maximum allowed size is 2 MB.</Typography>
                        </div>
                    </div>

                    <div onClick={(e)=>{
                        setAlertOpen(false)
                    }} className={"absolute top-1/2 right-0 -translate-y-1/2 mr-4 rounded-2xl bg-transparent text-black cursor-pointer hover:opacity-50"}>

                        <CloseIcon/>
                    </div>


                </Alert>
            </>


            <div className="w-full h-full flex flex-col items-center justify-center">
                <label htmlFor={"brand-image"} className="w-[50%] h-[50%] p-2 m-4 rounded-xl border border-dashed border-gray300 bg-gray-100 flex flex-col justify-center items-center hover:bg-gray-200 cursor-pointer">

                    <Image width={150} height={150}  className="w-[50%] h-[50%] object-cover" src={URL_PREVIEW} alt={"Upload"}/>
                    <Typography variant="small">Max file size: 2 MB</Typography>
                    <input id="brand-image" className={"hidden"} type={"file"} accept={"image/*"}  onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        if(!e.target.files)
                            return;

                        if(e.target.files[0].size > 2097152){
                            setAlertOpen((prev)=>!prev)
                            return;
                        }
                        else {
                            setLabel_title(e.target.files[0].name);
                            setFile(e.target.files[0]);
                            setURL_PREVIEW(handle_preview(e.target.files[0]));
                        }


                    }}/>
                    {label_title}
                </label>
            </div>

            <div className="mb-4">
                <Typography className={"mb-2 font-bold"}>
                    Brand
                </Typography>
                <TextField className="w-full" placeholder={"Brand"} value={RowValue ? RowValue.brand : ""} onChange={(e)=>SetRowValue((prev)=>prev ? {...prev, brand:e.target.value} : prev)}/>
            </div>

            <div className={"flex justify-between"}>
                <Typography className={"font-bold"}>Status</Typography>
                <Switch checked={RowValue?.status} onChange={(e)=> SetRowValue((prev)=>prev ? {...prev, status:e.target.checked} : prev) } size={4} crossOrigin={()=>{}} color={"red"}/>
            </div>

        </div>
    )
}

function Dialogue_Footer({Dialogue_Handler}:{Dialogue_Handler:Dispatch<SetStateAction<boolean>>}){
    return(
        <div className={"w-full"}>
            <Divider/>
            <div className="mt-4 flex justify-end gap-4 ">
                <Button onClick={()=>Dialogue_Handler((prev)=>!prev)}>Cancel</Button>

                <Button className={"bg-red-700"}>Save Changes</Button>
            </div>
        </div>
    )
}



export default function Brands(){
    const [Brands, setBrands] = useState<brand_structure[]>([])

    //Dialog
    const [openDialogue, setOpenDialogue] = useState<boolean>(false);

    const [selectedRow, setSelectedRow] = useState<brand_structure | null>(null)

    
    //Dialog Brand Value
    const [RowValue, setRowValue] = useState<brand_structure | null>(null);


    //Select row, we open dialogue with values of that row


    useEffect(() => {
        let active = true;

        getBrands().then((res) => {
            if (active && res.success) {
                const brands = res.data as brand_structure[];
                //unique id for dataGRID
                brands.map((brand)=> brand.id = brand._id);
                setBrands(res.data);
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
                    Brands
                </Typography>

                <div className={"flex justify-between items-center"}>
                    <Typography variant={"paragraph"}>
                        Add, edit, and organize brands
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
                                Add Brand
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>

            <Data_grid rows={Brands} Dialogue_Handler={setOpenDialogue} SetRowValue={setRowValue}/>
            <Custom_Dialogue Handler={setOpenDialogue} Handler_Value={openDialogue} Header={<Dialogue_Header/>} Body={<Dialogue_Body RowValue={RowValue} SetRowValue={setRowValue}/>} Footer={<Dialogue_Footer Dialogue_Handler={setOpenDialogue}/>}/>
        </div>
    )
}