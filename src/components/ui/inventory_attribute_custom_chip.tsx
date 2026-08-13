
import React from "react";
import {Chip} from "@mui/material";
import {InventoryAttributesType} from "@/types/inventory_meta/inventory_options_meta/type";


//onchip_delete_args_type
type CHIP_ARGS_TYPE = {
    attribute_name:InventoryAttributesType["name"],
    attribute_value:string,
    attribute_values: InventoryAttributesType["values"],
    onChange: (patch:InventoryAttributesType) => void,
}


type CHIP_DELETE_ARGS_TYPE = {
    attribute_name:InventoryAttributesType["name"],
    attribute_value_to_delete:string,
    attribute_values: InventoryAttributesType["values"],
    onChange: (patch:InventoryAttributesType) => void,
}




function onChip_Delete({attribute_name, attribute_value_to_delete, attribute_values, onChange}:CHIP_DELETE_ARGS_TYPE){
    //value within each name to be deleted
        //256GB, within Storage
        onChange({name:attribute_name,values: ((attribute_values ?? []).filter(v=>v!==attribute_value_to_delete))})
}


export function InventoryAttributeCustomChip({attribute_name,attribute_value,attribute_values, onChange }:CHIP_ARGS_TYPE, ){



    return(
        <Chip style={{}} className={"!mr-2"} key={attribute_value} variant={"outlined"} label={attribute_value} onDelete={()=> onChip_Delete({attribute_name:attribute_name, attribute_value_to_delete: attribute_value, attribute_values:attribute_values, onChange:onChange})}/>
    )
}