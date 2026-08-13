"use client"

import {image_options, Item_Structure, ProductOption, SpecsBlock, Variant} from "@/types/inventory_meta/product_meta/type";
import generate_accordion from "@/lib/ui/components/Generate_Accordion";
import React, { useEffect, useReducer, useRef, useState} from "react";
import generate_color from "@/utils/color_generator";
import {Button, Option, Select, Typography} from "@material-tailwind/react";
import {Autocomplete, InputAdornment, TextField} from "@mui/material";
import Divider from "@mui/material/Divider";
import {v4 as uuidv4} from "uuid";
import {CustomChip} from "@/components/ui/custom_chip";
import {generate_new_id} from "@/lib/api/calls/generate_new_id";
import generate_new_sku from "@/utils/SKU_generator";
import Image from "next/image";
import Custom_Dialogue from "@/lib/ui/components/Dialogue";

//api
import PushItem from "@/lib/api/admin/inventory/push_item";


type product_information_type  = {
    item : Item_Structure;
    onChange: (patch:Item_Structure)=> void,
}

type VariantAction =  {type:"add"} | {type:"delete"; id:string} | {type:"update"; id:string; variant:Variant}



//Chip Functions
function on_chip_value_change(value:string, options:ProductOption[] | undefined , option_type:"Color" | "Storage", onChange: (patch:Item_Structure)=>void, setChipInputValue: React.Dispatch<React.SetStateAction<string>>):boolean  {
    if(value.includes(",")){
        const input_value:string = value.slice(0,-1).trim();
        if(input_value.length === 0)return false;
        //---------------No Options------------//
        if (!options) {
            onChange({options: [{name:option_type, values: [input_value]}]});
            setChipInputValue("");
            return false;
        }
        const option_type_index = options.findIndex(po=>po.name===option_type);
        //---------------Options exist but Color doesnt!------------//
        if(option_type_index === -1){
            const NextOptions = [...options,{name:option_type,values:[input_value]} ]
            onChange({options: NextOptions});
            setChipInputValue("");
            return false;
        }


        //---------------Option and Storage/Color Exist------------//
        //check if value exists
        if(options[option_type_index].values.includes(input_value))
        {
            setChipInputValue("")
            return false;
        }
        //po = {name:ds, values []}
        //Push new value
        // item.options[color_index].values.push(input_value);
        const NextOption = options.map((po,i)=>{
            return i === option_type_index ? {...po, values :[...po.values, input_value]} : po
        })
        onChange({options: NextOption});
        setChipInputValue("")
        return false;
    }
    else return true;

}

//General Functions
function getOptionValues (itemOption:ProductOption[] | undefined, name:string):string[]{
    if(!itemOption || name.length == 0) return [];
    const idx = itemOption.findIndex((po)=> po.name === name);
    return idx >= 0 ? itemOption![idx].values ?? [] : []
}


//Reducer for Variant Control
type VariantItem = {
    id: string;
    data?: Variant; // existing or undefined (new)
};
function variantReducer(state:VariantItem[], action:VariantAction) {
    switch (action.type){
        case "add":
            return [...state, { id: uuidv4(), data: undefined }];
        case "delete":
            return state.filter((entry) => entry.id !== action.id);
        case "update":
            return state.map((entry) =>
                {

                    return entry.id === action.id ? { ...entry, data: action.variant } : entry;
                }
            );
        default:
            return state;




    }
}




//JSX ELEMENT
const Product_Information = ({item,onChange}:product_information_type)=>{
    //Tags
    const [TAGS_TEXT_VALUE, setTAGS_TEXT_VALUE] = useState<string>("")
    //Colors
    const [OPTION_TEXT_VALUE, setOPTION_TEXT_VALUE] = useState<string>("")
    //Storage
    const [OPTION_STORAGE_TEXT_VALUE, setOPTION_STORAGE_TEXT_VALUE] = useState<string>("")

    function useColorMap(list: string[]) {
        //string:record,color
        const colorsRef = useRef<Record<string, string>>({});
        list.forEach(item => {
            if (!colorsRef.current[item]) {
                colorsRef.current[item] = generate_color();
            }
        });
        return colorsRef.current;

    }

    const tagColorMap = useColorMap(item.tags ?? []);
    const colorOptionMap =   useColorMap(getOptionValues(item.options, "Color"));
    const storageColorMap =  useColorMap(getOptionValues(item.options, "Storage"));
    return(<div>
        <Divider className="!mb-5"><Typography variant="h6" className="font-bold text-red-600">General Informations</Typography></Divider>
        <div className="grid grid-cols-2 gap-x-8">
            <div className="block w-full mb-5">
                    <Typography>Product Name*</Typography>
                    <TextField className="w-full !mt-2"  variant="outlined" type="text" value={item.title ?? ""} onChange={(e)=> onChange({title:e.target.value})}/>
                </div>

                <div className="block w-full mb-5">
                    <Typography>Description*</Typography>
                    <TextField className="w-full !mt-2" maxRows={6} minRows={3}  multiline={true}  variant="outlined" type="text" value={item.description ?? ""} onChange={(e)=> onChange({description:e.target.value})}/>
                </div>

                <div className="block w-full mb-5">
                    <Typography>Slug*</Typography>
                    <TextField className="w-full !mt-2"    variant="outlined" type="text" value={item.slug ?? ""} onChange={(e)=> onChange({slug:e.target.value})}/>
                </div>

                <div className="block w-full mb-5">
                    <Typography>Brand*</Typography>
                    <TextField className="w-full !mt-2"     variant="outlined" type="text" value={item.brand ?? ""} onChange={(e)=> onChange({brand:e.target.value})}/>
                </div>

                <div className="block w-full mb-5">
                    <Typography>Model*</Typography>
                    <TextField className="w-full !mt-2"    variant="outlined" type="text" value={item.model ?? ""} onChange={(e)=>onChange({model:e.target.value}) }/>
                </div>

                <div className="block w-full mb-5">
                    <Typography>Currency*</Typography>
                        <TextField className="w-full !mt-2"     variant="outlined" type="text" value={item.currency ?? ""} onChange={(e)=>onChange({currency:e.target.value})}/>
                </div>

                <div className="block w-full mb-5">
                    <Typography>Tags*</Typography>
                    <Autocomplete className={"w-full !mt-2"} multiple freeSolo options={[]}   inputValue={TAGS_TEXT_VALUE}  onInputChange={(e:React.SyntheticEvent,value,r)=>{

                        //Deletion check

                        //check no white space empty string
                        if(value.length > 0)
                            if (value.trim().length === 0) return;




                        if(value.includes(",")){
                            const input_value:string = value.slice(0,-1).trim();
                            if(input_value.length === 0)return


                            if(item.tags?.includes(input_value))
                            {
                                setTAGS_TEXT_VALUE("")
                                return;
                            }

                            onChange({tags: [...(item.tags ?? []) , input_value]})
                            setTAGS_TEXT_VALUE("")
                            return;
                        }
                        setTAGS_TEXT_VALUE(value)
                    }} value={item.tags ?? []} renderValue={(p,v)=> p.map((e,i)=>{


                        return (
                            <CustomChip key={e} input_value={e} type_chip={"TAG"} background_color={tagColorMap[e]} border_color={tagColorMap[e]} options={item.options} in_tags={item.tags} onChange={onChange}/>
                        )
                    })}
                                  renderInput={(params)=>(<TextField {...params} className="w-full" variant="outlined" type="text"/>
                                  )} />
                </div>

            </div>

        <Divider className="!mb-5"><Typography variant="h6" className="font-bold text-red-600">Variants</Typography></Divider>

            <div className="grid grid-cols-2 gap-8">
                <div className="block w-full mb-5">
                    <Typography>Color*</Typography>
                    <Autocomplete className={"w-full !mt-2"} multiple freeSolo options={[]}   inputValue={OPTION_TEXT_VALUE}
                                  onInputChange={(e:React.SyntheticEvent,value,r) =>{

                                      //Deletion check
                                      //Testing
                                      if(!on_chip_value_change(value, item.options, "Color", onChange, setOPTION_TEXT_VALUE)) return;
                                      /*if(value.includes(",")){
                                          const input_value:string = value.slice(0,-1).trim();
                                          if(input_value.length === 0)return


                                          //---------------No Options------------//
                                          if (!item.options) {
                                              onChange({options: [{name:"Color", values: [input_value]}]});
                                              setOPTION_TEXT_VALUE("");
                                              return;
                                          }
                                          //TODO Überpruf ob Color gibt.
                                          const color_index = item.options?.findIndex(po=>po.name==="Color");

                                          //---------------Options exist but Color doesnt!------------//

                                          if(color_index === -1){
                                              const NextOptions = [...item.options,{name:"Color",values:[input_value]} ]
                                              onChange({options: NextOptions});
                                              setOPTION_TEXT_VALUE("");
                                              return;
                                          }


                                          //---------------Option and Storage Exist------------//
                                          //check if value exists
                                          if(item.options[color_index].values.includes(input_value))
                                          {
                                              setOPTION_TEXT_VALUE("")
                                              return;
                                          }

                                          //po = {name:ds, values []}

                                          //Push new value
                                         // item.options[color_index].values.push(input_value);
                                          const NextOption = item.options.map((po,i)=>{
                                              return i === color_index ? {...po, values :[...po.values, input_value]} : po
                                          })

                                          onChange({options: NextOption});
                                          setOPTION_TEXT_VALUE("")
                                          return;
                                      }*/
                                      setOPTION_TEXT_VALUE(value)
                                  }}
                                  value={item.options?.find((po)=> po.name === "Color")?.values ?? []} renderValue={(p,v)=> p.map((e,i)=>{
                        return (
                            <CustomChip key={e} input_value={e} type_chip={"COLOR"} background_color={colorOptionMap[e]} border_color={colorOptionMap[e]} options={item.options} in_tags={item.tags} onChange={onChange}/>

                        )
                    })}
                                  renderInput={(params)=>(<TextField {...params}  className="w-full" variant="outlined" type="text"/>
                                  )} />
                </div>

                <div className=" block w-full mb-5 ">
                    <Typography>Storage*</Typography>
                    <Autocomplete className={"w-full !mt-2"} multiple freeSolo options={[]}   inputValue={OPTION_STORAGE_TEXT_VALUE}
                                  onInputChange={(e:React.SyntheticEvent,value,r)=>{
                        //Deletion check
                        //Testing
                        if(!on_chip_value_change(value, item.options, "Storage", onChange, setOPTION_STORAGE_TEXT_VALUE)) return;
                        /*if(value.includes(",")){

                            const input_value:string = value.slice(0,-1).trim();
                            if(input_value.length === 0)return

                            //---------------No Options------------//
                            if (!item.options) {
                                onChange({options: [{name:"Storage", values: [input_value]}]});
                                setOPTION_STORAGE_TEXT_VALUE("");
                                return;
                            }

                            //On Option exist => update  value
                            const storage_index = item.options.findIndex(po=>po.name==="Storage");

                            //---------------Options exist but Storage doesnt!------------//

                            if(storage_index === -1){
                                const NextOptions = [...item.options,{name:"Storage",values:[input_value]} ]
                                onChange({options: NextOptions});
                                setOPTION_STORAGE_TEXT_VALUE("");
                                return;
                            }


                            //---------------Option and Color Exist------------//
                            //check if value exists
                            if(item.options[storage_index].values.includes(input_value))
                            {
                                setOPTION_STORAGE_TEXT_VALUE("")
                                return;
                            }

                            //Push new value
                            const NextOption = item.options.map((po,i)=>{
                                return i === storage_index ? {...po, values :[...po.values, input_value]} : po
                            })

                            onChange({options: NextOption});
                            setOPTION_STORAGE_TEXT_VALUE("")
                            return;
                        }*/
                        setOPTION_STORAGE_TEXT_VALUE(value)
                    }} value={item.options?.find((po)=> po.name === "Storage")?.values ?? []} renderValue={(p,v)=> p.map((e,i)=>{

                        return (
                            <CustomChip key={e} input_value={e} type_chip={"STORAGE"} background_color={storageColorMap[e]} border_color={storageColorMap[e]} options={item.options} in_tags={item.tags} onChange={onChange}/>
                            )
                    })}
                                  renderInput={(params)=>(<TextField {...params}  className="w-full" variant="outlined" type="text"/>
                                  )} />
                </div>
            </div>
    </div>)
}


//Types
type NewVariantProps = {
    Colors: string[];
    Storage: string[];
    Brand: string;
    Model: string;
    VariantCount: number;
    VariantID: string;
    onChange: React.Dispatch<VariantAction>;
    onDelete: () => void;
};


function New_variant({Colors, Storage, Brand, Model, VariantCount,VariantID,onChange, onDelete}:NewVariantProps) {
    const id_generating_message = "Generating ..."
    const [newID, setNewID] = useState<string>(id_generating_message);
    const [SKU, setSKU] = useState<string>("");
    const [SelectedStorage, setSelectedStorage] = useState<string>("");
    const [SelectedColor, setSelectedColor] = useState<string>("");
    const [Stock, setStock] = useState<number>(0)
    const [Price, setPrice] = useState<string>("0.00")
    const [DialogueOpen, setDialogueOpen] = useState<boolean>(false)


    useEffect(() => {
        generate_new_id().then((response)=>{
            if (response && response.success)
                setNewID(response.data)
        })
    }, []);


    useEffect(() => {
        if(newID === id_generating_message)
            return;

        if(!SKU || !SelectedColor ||!SelectedStorage)return;

        //when values change
        const va:Variant = {_id:newID, sku:SKU, price:Number(Price), stock:Stock, options: {"Color": SelectedColor, "Storage": SelectedStorage} }

        console.log("Values changed, should onChange trigger")


        onChange({type:"update", id:VariantID, variant: va});
    }, [newID, SKU, SelectedColor, SelectedStorage, Stock, Price, onChange, VariantID]);

    return (
        <div className="p-4 mb-4  border-dotted border-2 border-gray-200  rounded-xl bg-gray-100 bg-opacity-50 ">
            <div className="flex justify-between">
                <Typography variant="h6" className="mb-2">Variant {VariantCount}</Typography>
                <Typography variant={"small"} className="mb-2 hover:underline text-red-500 cursor-pointer" onClick={(e)=>{
                    onDelete();
                }}>Remove</Typography>
            </div>
            <div className="grid grid-cols-4 gap-8">
                <div className=" flex w-full mb-5">
                    <Autocomplete
                        className="w-full"
                        disablePortal
                        onChange={(_,value)=>setSelectedColor(value ?? "")}
                        options={Colors}
                        renderInput={(params) => <TextField {...params} label="Colors" />}
                    />
                </div>
                <div className=" flex w-full mb-5">
                    <Autocomplete
                        className="w-full"
                        onChange={(_,value)=>setSelectedStorage(value ?? "")}
                        disablePortal
                        options={Storage}
                        renderInput={(params) => <TextField {...params} label="Storage" />}
                    />
                </div>
                <TextField value={SKU} label={"SKU"} slotProps={
                    {
                        input : {
                            endAdornment: <InputAdornment position={"end"}>
                                <Button disabled={!(SelectedStorage.length > 0) || !(SelectedColor.length > 0)} onClick={(e)=>setSKU(generate_new_sku(Brand,SelectedColor,Model,SelectedStorage))} className={"bg-red-500"}>Generate</Button>
                            </InputAdornment>
                        }
                    }
                }
                ></TextField>
                <TextField  disabled={true} value={newID} label="VARIANT ID"/>
            </div>

            <Divider  sx={{margin: "20px",}}>
                <Typography variant="small">Pricing</Typography>
            </Divider>
            <div className="grid grid-cols-2 gap-8">
                <TextField   value={Stock}  onChange={(e)=>setStock(Number(e.target.value))} label="Stock"/>
                <TextField value={Price} onChange={(e)=>setPrice(e.target.value)} label={"Price"} />
            </div>
            <Divider  sx={{margin: "20px",}}>
                <Typography variant="small">Product Images</Typography>
            </Divider>

            <div>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${image_options.length + 1}, minmax(0,1fr))`,
                    gap: "16px"
                }} className="w-full h-full">
                    <div   className="w-full flex">
                        <div
                            onClick={()=> setDialogueOpen(!DialogueOpen)}
                            className="p-2 rounded-xl border border-dashed border-gray-300 bg-gray-100 flex flex-col justify-center items-center hover:bg-gray-200 cursor-pointer">
                            <Image width={150} height={150}  className="w-[100%] h-[100%] object-cover" src={"/logo/upload_logo_4000x4000.png"} alt={"Upload"}/>
                        </div>
                    </div>
                </div>
            </div>

            {
                <Custom_Dialogue Handler={setDialogueOpen}
                                 Handler_Value={DialogueOpen}
                                 Header={<Typography variant="h5">Add Image</Typography>}
                                 Body={
                                     <div className="w-full h-full flex flex-col items-center justify-center">
                                         <div className="w-[50%] h-[50%] p-2 m-4 rounded-xl border border-dashed border-gray300 bg-gray-100 flex flex-col justify-center items-center hover:bg-gray-200 cursor-pointer">
                                             <Image width={150} height={150}  className="w-[50%] h-[50%] object-cover" src={"/logo/upload_logo_4000x4000.png"} alt={"Upload"}/>
                                             <Typography variant="small">Max file size: 50 MB</Typography>
                                         </div>
                                         <div className="w-[50%] h-[50%] ">
                                             <Select label={"Variant"}>
                                                 {image_options.map((v,i)=>{
                                                     return (<Option  key={i}>{v}</Option>)
                                                 })}
                                             </Select>
                                         </div>
                                     </div>
                                 }
                                 Footer={(<div className="grid grid-cols-2 gap-4">
                                     <Button>Submit</Button>
                                     <Button className={"bg-red-700"} onClick={()=> setDialogueOpen(!DialogueOpen) }>Cancel</Button>
                                 </div>)}
                />
            }
        </div>

    )
}

const Product_Variants = ({item, onVariantChange}:{item:Item_Structure,onVariantChange:(ChangedVariants:Variant[])=>void }) => {
    //Types






    //Variables
    const [variants, dispatch ] = useReducer(variantReducer, [])




    useEffect(() => {
        //if variants change, update our VARIANTS

        //e is type of e means it has id and data ? then type combination/override
        const ds = variants.filter((e): e is typeof e & {data:Variant} => e.data !== undefined).map((e,i)=>e.data)
        onVariantChange(ds)
    }, [onVariantChange, variants]);


    return (
        <div>
            <div className="mb-5">
                <Button onClick={()=>dispatch({type:"add"})}>Add Variant</Button>
            </div>

            {variants.map((variant,i)=> {
                //Pass the items to it
                //first we get the already set items
                    return (<div key={variant.id} className="grid grid-rows-1 gap-5">
                        <New_variant  onChange={dispatch}  Colors={getOptionValues(item.options,"Color") ?? []} Storage={getOptionValues(item.options,"Storage") ?? []} Brand={item.brand ?? ""}  Model={item.model ?? ""} VariantCount={i+1} VariantID={variant.id} onDelete={()=>{
                            dispatch({type:"delete", id: variant.id})
                        }}/>
                    </div>)
            })}

        </div>
    )
}


const Product_Specification = ({item, onChange}: product_information_type)=>{
    const fields = ["screen_size", "ram", "camera", "battery", "os", "release_year", "warranty_months"]

    //const [inSpecsDataOnChange, setInSpecsDataOnChange] = useState<SpecsBlock | undefined >(item.specs ?? {})

    /*useEffect(() => {
        if(!item.specs)return;
        if(item.specs != inSpecsDataOnChange)
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setInSpecsDataOnChange(item.specs);
    }, [item.specs]);*/


    return (
        <div className={"w-full grid grid-cols-2 gap-5"}>
            {fields.length > 0 && fields.map((field)=> {


                const fieldKey = field as keyof SpecsBlock;

                return (<div key={field} className=" flex w-full">
                    <TextField className={"w-full"} onChange={(e)=>{

                        onChange({...item, specs:{...item.specs, [fieldKey]:e.target.value}})



                        /*setInSpecsDataOnChange((prev)=> {
                            if(!prev) return undefined;
                            return { ...prev, [fieldKey] : e.target.value }
                        })*/
                    }}
                               label={field.charAt(0).toUpperCase() + field.slice(1).replaceAll("_", " ")}/>
                </div>)
            })}
        </div>
    )
}





export default function AddItem(){
    //Default
    const HEADER:string[] = ["Product Information", "Variants", "Specifications"]


    //Empty Template
    const [ITEM, setITEM] = useState<Item_Structure>({})






    const onVariantChange = React.useCallback((Changedvariants:Variant[])=>{
        setITEM((prev)=>prev? {...prev, variants: Changedvariants }: prev);
    }, [])


    const canSubmit = Boolean(ITEM.title && ITEM.slug && ITEM.brand && ITEM.model && ITEM.currency && ITEM.variants && ITEM.variants.length > 0)

    return (
        <div>
            {generate_accordion({Data: {Header: HEADER, Content: [
                        <Product_Information key={0} item={ITEM} onChange={(patch:Item_Structure)=>setITEM((prev)=> prev ? {...prev, ...patch} : prev )} />,    
                        <Product_Variants key={1} item={ITEM} onVariantChange={onVariantChange} />,
                        <Product_Specification key={2} item={ITEM} onChange={(patch:Item_Structure)=>setITEM((prev)=>prev ? {...prev, ...patch} : prev)}/>
                    ]}})}
            <div className="w-full flex flex-row justify-end mt-5">
                <Button disabled={!canSubmit} className="mr-4" onClick={()=>{
                    PushItem(ITEM).then(()=>{});
                }}>Submit</Button>
                <Button className="bg-red-700">Cancel</Button>
            </div>
        </div>
    )

}
