import {Item_Structure} from "@/types/inventory_meta/product_meta/type";
import {ProductOption} from "@/types/inventory_meta/product_meta/type";
import React from "react";
import {Chip} from "@mui/material";


//onchip_delete_args_type
type ON_CHIP_DELETE_ARGS = {
    chip_type : "COLOR" | "STORAGE" | "TAG",
    input_value: string,
    options: ProductOption[] | undefined,
    tags : string[] | undefined
    onChange: (patch:Item_Structure) => void,
}
function onChip_Delete({chip_type, input_value, options,tags, onChange}:ON_CHIP_DELETE_ARGS){
    const optionNameByChipType: Record<string,string> = {
        COLOR : "Color",
        STORAGE : "Storage",
    }

    if(chip_type === "TAG"){
        onChange({tags: ((tags ?? []).filter(v=>v!==input_value))})
        return;
    }

    if(!options)return;
    const targetName = optionNameByChipType[chip_type];
    const target_index = options.findIndex(po=>po.name===targetName);
    if(target_index === -1)return;
    const NextOption = options.map((option,index)=>{
        return index === target_index ? {...option, values: option.values.filter((target_value) => target_value !== input_value) } : option;
    })
    onChange({options: NextOption});
}

type CHIP_ARGS_TYPE = {
    input_value:string
    type_chip: "COLOR" | "STORAGE" | "TAG",
    background_color : string,
    border_color : string,
    options: ProductOption[] |undefined,
    in_tags: string[] |undefined,
    onChange: (patch:Item_Structure) => void,
}
export function CustomChip({input_value, in_tags, type_chip, options, background_color, border_color, onChange }:CHIP_ARGS_TYPE, ){
    return(
        <Chip style={{
            backgroundColor:background_color,
            borderColor: border_color
        }} className={"!mr-2"} key={input_value} variant={"outlined"} label={input_value} onDelete={()=> onChip_Delete({chip_type: type_chip, input_value: input_value, options: options, tags: in_tags, onChange:onChange})}/>
    )
}