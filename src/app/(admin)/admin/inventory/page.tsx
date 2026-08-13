"use client"

//Routes
import {ROUTES} from "@/lib/Routes/routes";

import { DataGrid, GridRowsProp, GridColDef, gridClasses} from '@mui/x-data-grid';
import {useEffect, useState} from "react";

import {getAllItems_Inventory} from "@/lib/api/calls/products"

import {Item_Structure} from "@/types/product_type";
import Button from "@mui/material/Button";
import { useRouter } from 'next/navigation'


///////////////////////Structure//////////////////
type AllItems_Structure = Item_Structure[];
///////////////////////Structure//////////////////


const rows_d: GridRowsProp = [
    {
        id: 1,
        sku: "EL-SON-1001",
        product_name: "Wireless Headphones",
        category: "Electronics",
        brand: "Sony",
        price: 199.99,
        unit: "Piece",
        qty: 120,
        created_by: "Admin",
        OP: "Yeah"
    },
    {
        id: 2,
        sku: "EL-APP-2001",
        product_name: "AirPods Pro",
        category: "Electronics",
        brand: "Apple",
        price: 249.99,
        unit: "Piece",
        qty: 75,
        created_by: "Admin",
    },
];

const Operations = ()=>{
    return (
        <div className=" grid grid-cols-3 justify-center items-center gap-3">
            <Button className="bg-red-500 text-black">Edit</Button>
            <Button className="bg-white">DELETE</Button>
        </div>
    )
}
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteIcon from '@mui/icons-material/Delete';




const Data_grid = ()=> {

    const controller_sig = new AbortController();
    const [rows, setRows] = useState<object[]>([])

    const navigate = useRouter();


    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "sku", headerName: "SKU", width: 100 },
        { field: "model", headerName: "Model", width: 150 },
        { field: "options", headerName: "Options", width: 150},
        { field: "brand", headerName: "Brand", width: 180 },
        { field: "price", headerName: "Price", width: 120 },
        // { field: "unit", headerName: "Unit", width: 120 },
        { field: "qty", headerName: "Quantity", width: 120 },
        { field: "created_by", headerName: "Created By", width: 160 },
        { field: "Button", headerName: "OPS", minWidth: 141, renderCell: (props) => (
                <div className={"flex-row"}>
                    <div
                        onClick={(e)=>{
                            //TODO productpage url per SKU
                            console.log(props.row)
                            navigate.push(ROUTES.PRODUCT(props.row["sku"]))
                        }}

                        className={"!inline !rounded-xl !p-2 !border-2 !border-gray-200  hover:bg-gray-200 !mr-2"}><RemoveRedEyeOutlinedIcon sx={{
                        width: "15px",
                        height: "15px",
                        color: "black",
                    }}/></div>  <div
                    onClick={(e)=>{
                        console.log(props.row)
                        navigate.push(ROUTES.INVENTORY_EDIT(props.row["_id"]))
                    }}

                    className={"!inline !p-2 !rounded-xl !border-2 !border-gray-200  hover:bg-gray-200 !mr-2"}><EditDocumentIcon sx={{
                    width: "15px",
                    height: "15px",
                    color: "black",
                }}/></div>  <div className={"!inline  !p-2 !rounded-xl !border-2 !border-gray-200 hover:bg-gray-200 !mr-2"}><DeleteIcon sx={{
                    width: "15px",
                    height: "15px",
                    color: "indianred",
                }}/></div>
                </div>) },

    ];



    //Check which category. if phones create its looping system. if other otherwise

    //Check

    //loop -> general thing id, brand -> name -> variants

    const [init, setInit] = useState<boolean>(false);

    useEffect(() => {


        if(init)return
        getAllItems_Inventory({signal:controller_sig.signal}).then(data => {
            //console.log("data", data);
            if(data){
                const initial_row:object[] = []
                let id_dummy = 0;
                data.forEach((item,index)=>{
                    const values:{category?:string, brand:string, model?:string} = {model : item.model ?? "-", brand: item.brand ?? "-"}
                    item.variants?.forEach((v,i)=>{
                        console.log("id is:", item._id)
                        initial_row.push({
                            ...values,
                            _id: v._id,
                            id : id_dummy,
                            sku : v.sku,
                            price : v.price,
                            qty : v.stock,
                            options :  v.options["Color"]+ "/" + v.options["Storage"],
                        });
                        id_dummy++;
                    })


/*
                    item.options?.colors.forEach((color_option,i)=>{
                         //console.log("Name is: " + color_option.name)
                         values["product_name"]= color_option.name;
                        color_option.variants.forEach((variants,i)=>{
                            initial_row.push({
                                id : id_dummy,
                                product_name : color_option.name,
                                brand: item.brand ?? "-",
                                sku: variants.sku,
                                price: variants.price,
                                qty: variants.stock,
                                category:"Phones"
                            });

                            id_dummy++;
                        })
                    })
*/
                })
                console.log("after loop: " + JSON.stringify(initial_row))
                setRows(initial_row)
                setInit(true)
                //  console.log(rows)
            }
            else {
                console.log("Error : No data available")
            }
        })
    }, [init]);

    //setRows(rows);

    return (
        <div style={
            {
                height: '300',
                width: '100%',
            }
        }>
            <DataGrid columns={columns} rows={rows} disableRowSelectionOnClick={true} sx={{
                fontSize: "12px",
                [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                    outline: 'none',
                },
                [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                    {
                        outline: 'none',
                    },

            }}/>

        </div>
    )
}

export default function Inventory() {
    return(
        <div>
            Inventory
            <Data_grid/>
        </div>
    )
}