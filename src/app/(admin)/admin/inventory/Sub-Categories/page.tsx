"use client"

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

import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";


//Custom
import Custom_Dialogue from "@/lib/ui/components/Dialogue";
import {MenuItem, TextField} from "@mui/material";
import Divider from "@mui/material/Divider";
import {sub_category_structure} from "@/types/inventory_meta/inventory_sub_category_meta/type";
import getInventorySubCategory from "@/lib/api/admin/inventory/inventory_sub_category";

import App_bar_DropDown_Custom, {DropDown_Custom} from "@/components/ui/DropDown";
import {categories_structure} from "@/types/inventory_meta/inventory_categories_meta/type";




function Data_grid({ rows, Dialogue_Handler, SetRowValue }: { rows: sub_category_structure[],Dialogue_Handler:Dispatch<SetStateAction<boolean>>, SetRowValue:Dispatch<SetStateAction<sub_category_structure | null >>  }) {

    const navigate = useRouter();



    const columns: GridColDef[] = [

        { field: "sub_category", headerName: "Sub-Category", width: 100 },

        { field: "category", headerName: "Category", width: 100 },

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
                Edit Category
            </Typography>
            <Divider/>
        </div>
    )
}




function Dialogue_Body({RowValue, SetRowValue}:{RowValue:sub_category_structure | null ,SetRowValue:Dispatch<SetStateAction<sub_category_structure | null >> }){

    const [categories, setCategories] = useState<string[] | null >(null);
    const isFetched = useRef<boolean>(false);

    //on change => we update the rows


    function onClick (){
        if(!isFetched.current){
            isFetched.current = true;
            getInventoryCategories().then((data)=>{
                if(data.success){
                    isFetched.current = false;
                    const categories = (data.data as categories_structure[]).map((item)=>item.category as string ) ?? ["Empty"];
                    setCategories(categories);
                }
            })


        }
    }

    return(
        <div className="ml-4 mr-4">

            <div className="mb-4">
                <Typography className={"mb-2 font-bold"}>
                    Category
                </Typography>
                
                <DropDown_Custom onClick={onClick} MenuItems={categories ?? ["Select Category"]} SelectedItem={""}
                                 input_label={null} VariantStyle={null}/>
            </div>

            <div className="mb-4">
                <Typography className={"mb-2 font-bold"}>
                    Sub Category
                </Typography>
                <TextField className="w-full !mb-4" placeholder={"Category"} value={RowValue ? RowValue.sub_category : ""} onChange={(e)=>SetRowValue((prev)=>prev ? {...prev, category:e.target.value} : prev)}/>
            </div>

            <div className="mb-4">
                <Typography className={"mb-2 font-bold"}>
                    Slug
                </Typography>
                <TextField className="w-full !mb-4" placeholder={"Category Slug"} value={RowValue ? RowValue.sub_category_slug : ""} onChange={(e)=>SetRowValue((prev)=>prev ? {...prev, category_slug:e.target.value} : prev)}/>
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
    const [Sub_Categories, setSub_Categories] = useState<sub_category_structure[]>([])

    //Dialog
    const [openDialogue, setOpenDialogue] = useState<boolean>(false);



    //Dialog Brand Value
    const [RowValue, setRowValue] = useState<sub_category_structure | null>(null);


    //Select row, we open dialogue with values of that row


    useEffect(() => {
        let active = true;

        getInventorySubCategory().then((res) => {
            if (active && res.success) {
                console.log("da", res.data);

                const sub_categories = res.data as sub_category_structure[];
                //unique id for dataGRID
                sub_categories.map((sub_category)=> sub_category.id = sub_category._id);
                setSub_Categories(res.data);
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
                    Categories
                </Typography>

                <div className={"flex justify-between items-center"}>
                    <Typography variant={"paragraph"}>
                        Add, edit, and organize Categories
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
                                Add Category
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>

            <Data_grid rows={Sub_Categories} Dialogue_Handler={setOpenDialogue} SetRowValue={setRowValue}/>
            <Custom_Dialogue Handler={setOpenDialogue} Handler_Value={openDialogue} Header={<Dialogue_Header/>} Body={<Dialogue_Body RowValue={RowValue} SetRowValue={setRowValue}/>} Footer={<Dialogue_Footer Dialogue_Handler={setOpenDialogue}/>}/>
        </div>
    )
}