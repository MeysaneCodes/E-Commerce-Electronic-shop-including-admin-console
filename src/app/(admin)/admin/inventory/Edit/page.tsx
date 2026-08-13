"use client"

import Admin_SearchBar from "@/components/layout/admin_layout/Search_bar";

import {useRouter} from "next/navigation";
import {DataGrid, gridClasses, GridColDef} from "@mui/x-data-grid";
import {ROUTES} from "@/lib/Routes/routes";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import DeleteIcon from "@mui/icons-material/Delete";
import {getAllItems_Inventory} from "@/lib/api/calls/products";
import {useState, useEffect, Dispatch, SetStateAction} from "react";

import search_inventory from "@/lib/api/admin/inventory/search";
import {Item_Structure} from "@/types/inventory_meta/product_meta/type";
import {Rows} from "lucide-react";



type InventoryGridRow = {

    id: number;

    _id: string;

    sku: string;

    model: string;

    options: string;

    brand: string;

    price: number;

    qty: number;

    created_by?: string;

};

//each products variant will be transformed to a single row
function flattenProductsToRows(products: Item_Structure[]): InventoryGridRow[] {
    const rows: InventoryGridRow[] = [];
    let id_dummy = 0;

    products.forEach((item) => {

        const values = {

            model: item.model ?? "-",

            brand: item.brand ?? "-",

        };

        item.variants?.forEach((variant) => {

            rows.push({

                ...values,

                _id: String(variant._id),

                id: id_dummy,

                sku: variant.sku,

                price: variant.price,

                qty: variant.stock,

                options:

                    variant.options["Color"] + "/" + variant.options["Storage"],

                created_by: "Admin",

            });

            id_dummy++;

        });

    });

    return rows;

}




function Data_grid({ rows }: { rows: InventoryGridRow[] }) {

    const navigate = useRouter();

    const columns: GridColDef[] = [

        { field: "id", headerName: "ID", width: 100 },

        { field: "sku", headerName: "SKU", width: 150 },

        { field: "model", headerName: "Model", width: 180 },

        { field: "options", headerName: "Options", width: 160 },

        { field: "brand", headerName: "Brand", width: 160 },

        { field: "price", headerName: "Price", width: 120 },

        { field: "qty", headerName: "Quantity", width: 120 },

        { field: "created_by", headerName: "Created By", width: 160 },

        {

            field: "Button",

            headerName: "OPS",

            minWidth: 141,

            renderCell: (props) => (

                <div className="flex-row">

                    <div

                        onClick={() => {

                            navigate.push(ROUTES.PRODUCT(props.row.sku));

                        }}

                        className="!inline !rounded-xl !p-2 !border-2 !border-gray-200 hover:bg-gray-200 !mr-2 cursor-pointer"

                    >

                        <RemoveRedEyeOutlinedIcon

                            sx={{

                                width: "15px",

                                height: "15px",

                                color: "black",

                            }}

                        />

                    </div>

                    <div

                        onClick={() => {

                            navigate.push(ROUTES.INVENTORY_EDIT(props.row._id));

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






export default function EditPage() {

    const [search, setSearch] = useState("");

    const [products, setProducts] = useState<Item_Structure[]>([]);

    const [gridRows, setGridRows] = useState<InventoryGridRow[]>([]);

    useEffect(() => {

        setGridRows(flattenProductsToRows(products));

    }, [products]);





    useEffect(() => {

        if (search.trim().length === 0) {

            setProducts([]);

            return;

        }

        const timer = setTimeout(() => {

            search_inventory(search).then((res) => {

                if (res.success) {

                    setProducts(res.response);

                }

            });

        }, 600);

        return () => clearTimeout(timer);

    }, [search]);

    return (

        <div className="w-full h-screen flex flex-col">

            <div className="w-full flex items-center justify-center mb-5">

                <Admin_SearchBar

                    value={search}

                    onValueChange={setSearch}

                    placeHolder="Search inventory by SKU, product name, brand, or model"

                    max_width="50%"

                    additional_params={{ padding: "" }}

                />

            </div>



            <Data_grid rows={gridRows} />

        </div>

    );

}