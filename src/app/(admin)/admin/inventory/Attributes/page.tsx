"use client"

import {brand_structure} from "@/types/inventory_meta/brands_meta/type";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {DataGrid, gridClasses, GridColDef} from "@mui/x-data-grid";
import {Alert, Button, Switch, Typography} from "@material-tailwind/react";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import {Autocomplete, TextField} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import Custom_Dialogue from "@/lib/ui/components/Dialogue";
import {InventoryAttributesType} from "@/types/inventory_meta/inventory_options_meta/type";
import getInventoryAttributes from "@/lib/api/admin/inventory/inventory_attributes";
import {CustomChip} from "@/components/ui/custom_chip";
import {InventoryAttributeCustomChip} from "@/components/ui/inventory_attribute_custom_chip";



function Data_grid({ rows, Dialogue_Handler, SetRowValue }: { rows: InventoryAttributesType[],Dialogue_Handler:Dispatch<SetStateAction<boolean>>, SetRowValue:Dispatch<SetStateAction<InventoryAttributesType | null >>  }) {

    const navigate = useRouter();



    const columns: GridColDef[] = [

        { field: "name", headerName: "Attribute", width: 100 },
        { field: "values", headerName: "Values", width: 250 },

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
function Dialogue_Header({RowValue}:{ RowValue:InventoryAttributesType | null }) {
    return(
        <div className={"w-full"}>
            <Typography className={"font-bold mb-4"}>
                Edit {RowValue?.name} Attribute
            </Typography>
            <Divider/>
        </div>
    )
}
function Dialogue_Body({RowValue, SetRowValue, onChange}:{RowValue:InventoryAttributesType | null ,SetRowValue:Dispatch<SetStateAction<InventoryAttributesType | null >>, onChange:(patch:InventoryAttributesType)=>void }){

    const [ATTRIBUTE_TEXT_VALUE, setATTRIBUTE_TEXT_VALUE] = useState<string>("")





    //on change => we update the rows

    //TODO changes should be applied when clicking on Save changes, Currently it changes after we change value
    return(
        <div className="ml-4 mr-4">


            <div className="mb-4">
                <Typography className={"mb-2 font-bold"}>
                    Attribute
                </Typography>
                <TextField className="w-full" placeholder={"Attribute"} value={RowValue ? RowValue.name : ""} onChange={(e)=>SetRowValue((prev)=>prev ? {...prev, name:e.target.value} : prev)}/>
            </div>

            <div className="block w-full mb-5">
                <Typography>Values*</Typography>
                <Autocomplete className={"w-full !mt-2"} multiple freeSolo options={[]} inputValue={ATTRIBUTE_TEXT_VALUE} onInputChange={(e:React.SyntheticEvent,value,r)=>{

                    //Deletion check

                    //check no white space empty string
                    if(value.length > 0)
                        if (value.trim().length === 0) return;




                    if(value.includes(",")){
                        const input_value:string = value.slice(0,-1).trim();
                        if(input_value.length === 0)return


                        if((RowValue?.values ?? []).includes(input_value))
                        {
                            setATTRIBUTE_TEXT_VALUE("")
                            return;
                        }

                        //Assign to local variable

                        //TODO Change when submitting
                        onChange({name:RowValue?.name, values: [...(RowValue?.values ?? []), input_value]})


                        //onChange({tags: [...(item.tags ?? []) , input_value]})
                        setATTRIBUTE_TEXT_VALUE("")
                        return;
                    }
                    setATTRIBUTE_TEXT_VALUE(value)
                }} value={RowValue?.values ?? []} renderValue={(p, v)=> p.map((e, i)=>{


                    return (
                        <InventoryAttributeCustomChip key={e} attribute_name={RowValue?.name} attribute_value={e} attribute_values={RowValue?.values} onChange={onChange}/>
                    )
                })}
                              renderInput={(params)=>(<TextField {...params} className="w-full" variant="outlined" type="text"/>
                              )} />
            </div>


            <div className={"flex justify-between"}>
                <Typography className={"font-bold"}>Status</Typography>
                <Switch checked={RowValue?.status} onChange={(e)=> SetRowValue((prev)=>prev ? {...prev, status:e.target.checked} : prev) } size={4} crossOrigin={()=>{}} color={"red"}/>
            </div>

        </div>
    )
}
function Dialogue_Footer({RowValue, Dialogue_Handler, onSave}:{RowValue : InventoryAttributesType | null , Dialogue_Handler:Dispatch<SetStateAction<boolean>>, onSave: (row:InventoryAttributesType)=>void}){
    return(
        <div className={"w-full"}>
            <Divider/>
            <div className="mt-4 flex justify-end gap-4 ">
                <Button onClick={()=>Dialogue_Handler((prev)=>!prev)}>Cancel</Button>

                <Button onClick={()=>{
                    if(!RowValue)return;
                    onSave(RowValue);
                    Dialogue_Handler(false);
                }} className={"bg-red-700"}>Save Changes</Button>
            </div>
        </div>
    )
}


export default function InventoryAttributes(){
    const [InventoryAttributes, setInventoryAttributes] = useState<InventoryAttributesType[]>([]);


    //Dialog
    const [openDialogue, setOpenDialogue] = useState<boolean>(false);

    const [selectedRow, setSelectedRow] = useState<InventoryAttributesType | null>(null)


    //Dialog Brand Value
    const [RowValue, setRowValue] = useState<InventoryAttributesType | null>(null);


    //Select row, we open dialogue with values of that row


    useEffect(() => {
        let active = true;

        getInventoryAttributes().then((res) => {
            if (active && res.success) {
                console.log("came", res.data)
                const attributes = res.data as InventoryAttributesType[];
                //unique id for dataGRID
                attributes.map((brand)=> brand.id = brand._id);
                setInventoryAttributes(res.data);
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
                    Attributes
                </Typography>

                <div className={"flex justify-between items-center"}>
                    <Typography variant={"paragraph"}>
                        Add, edit, and organize Attributes
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
                                Add Attribute
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>

            <Data_grid rows={InventoryAttributes} Dialogue_Handler={setOpenDialogue} SetRowValue={setRowValue}/>
            <Custom_Dialogue Handler={setOpenDialogue} Handler_Value={openDialogue} Header={<Dialogue_Header RowValue={RowValue}/>} Body={<Dialogue_Body RowValue={RowValue} SetRowValue={setRowValue}
                onChange={(patch:InventoryAttributesType)=>{
                   // setInventoryAttributes((prev)=> prev.map((i,e)=>i.name === patch.name ? {...i, values:patch.values} :i) )

                    //To display on dialogue
                    setRowValue((prev) =>
                        prev?.name === patch.name ? { ...prev, values: patch.values } : prev
                    );


                }}/>} Footer={<Dialogue_Footer RowValue={RowValue} onSave={(row)=>{

                setInventoryAttributes((prev)=> prev.map((i,e)=>i._id === row._id ? row :i) )

            }} Dialogue_Handler={setOpenDialogue}/>}/>
        </div>
    )
}