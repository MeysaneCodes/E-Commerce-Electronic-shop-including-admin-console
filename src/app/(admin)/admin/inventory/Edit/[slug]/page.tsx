"use client"


import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Chip,
    InputAdornment,
    TextField
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, {useEffect, useMemo, useRef, useState} from "react";
import {Button, Option, Select, Typography} from "@material-tailwind/react";
import {useParams} from "next/navigation";
import Image from "next/image"

//Layout
import generate_accordion from "@/lib/ui/components/Generate_Accordion"

//Helpers
import generate_color from "@/utils/color_generator";


//Query function
import {getItemById} from "@/lib/api/calls/products";
import {
    image_options,
    ImagesOption,
    Item_Structure,
    MediaBlock,
    ProductOption,
    SpecsBlock,
    Variant
} from "@/types/inventory_meta/product_meta/type";
import Divider from "@mui/material/Divider";


//Components
import Custom_Dialogue from "@/lib/ui/components/Dialogue";


//uuid
import {v4 as uuidv4} from "uuid"
import {generate_new_id} from "@/lib/api/calls/generate_new_id";
import {Electronics} from "@/lib/strings/brands";
import {CustomChip} from "@/components/ui/custom_chip";
type props_type = {
    Header : React.ReactNode,
    Content : React.ReactNode,
}

type Data_Type = {
    Header : string[],
    Content : React.ReactNode[]
}
const generate_accordion_alt = ({Data}:{Data:Data_Type}) => {


    return (
            <>
                {Array.from({length:Data["Header"].length}).map((v,i)=>{
                    return (
                        <Accordion key={i}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                            >
                                <Typography variant={"h6"} className="font-bold">
                                    {Data["Header"][i]}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {Data["Content"][i]}
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </>
    )
}

//General Functions
function getOptionValues (itemOption:ProductOption[] | undefined, name:string):string[]{
    if(!itemOption || name.length == 0) return [];
    const idx = itemOption.findIndex((po)=> po.name === name);
    return idx >= 0 ? itemOption![idx].values ?? [] : []
}

type product_information_type  = {
    onChange: (patch:Item_Structure)=> void,
    item:Item_Structure,
}
const Product_Information = ({item, onChange}:product_information_type)=>{

    const [TAGS_TEXT_VALUE, setTAGS_TEXT_VALUE] = useState<string>("")
    //Colors
    const [OPTION_TEXT_VALUE, setOPTION_TEXT_VALUE] = useState<string>("")
    //Storage
    const [OPTION_STORAGE_TEXT_VALUE, setOPTION_STORAGE_TEXT_VALUE] = useState<string>("")



    function onChip_Delete(value:string, chip_type:"COLOR" | "STORAGE" | "TAG"){

        if(chip_type ==="COLOR"){
            if(!item.options)return;

            //const op = item.options;
            const color_index = item.options?.findIndex(po=>po.name==="Color");
            item.options[color_index] = {
                name: item.options[color_index]["name"],
                values: item.options[color_index].values.filter((color_value) => color_value !== value)
            };

            console.log("updated Color: " , item.options);
            //  op[storage_index] = item.options[storage_index].values.filter((storage_value)=>storage_value!==value);

            onChange({options: item.options});

        }
            //setInColorOptions((prev)=>(prev.filter(v=>v!==value)));



        else if(chip_type === "TAG")
            onChange({tags: ((item.tags ?? []).filter(v=>v!==value))})
            //setTAGS((prev)=>(prev.filter(v=>v!==value)));

        else if(chip_type === "STORAGE"){
            if(!item.options)return;

            //const op = item.options;
            const storage_index = item.options?.findIndex(po=>po.name==="Storage");
            console.log("error here", item.options[0] )
            item.options[storage_index] = {
                name: item.options[storage_index]["name"],
                values: item.options[storage_index].values.filter((storage_value) => storage_value !== value)
            };

            console.log("updated stroage: " , item.options);
           //  op[storage_index] = item.options[storage_index].values.filter((storage_value)=>storage_value!==value);

            onChange({options: item.options});
        }

            //setInStorageOptions((prev)=>(prev.filter(v=>v!==value)));

        else
            console.warn("No Chip type found");
    }
    function useColorMap(list: string[]) {
        //string:record,color
        //stringtag, color
        const colorsRef = useRef<Record<string, string>>({});
        list.forEach(item => {
            if (!colorsRef.current[item]) {
                colorsRef.current[item] = generate_color();
            }
        });
        return colorsRef.current;
       /* return useMemo(() => {
            list.forEach(item => {
                if (!colorsRef.current[item]) {
                    colorsRef.current[item] = generate_color();
                }
            });

            return colorsRef.current;
        }, [list]);*/
    }

    const tagColorMap = useColorMap(item.tags ?? []);
    const colorOptionMap =   useColorMap(getOptionValues(item.options, "Color"));
    const storageColorMap =  useColorMap(getOptionValues(item.options, "Storage"));
    return(<div>

        <div className="grid grid-rows-1 gap-5">
            <Typography variant={"paragraph"}>
                General
            </Typography>
            <div className="grid grid-cols-2 gap-8">

                <div className=" flex w-full mb-5">
                    <TextField className="w-full"  label="Product ID"   disabled={true} variant="outlined" type="text" value={item._id ? item._id : ""} onChange={(e)=>onChange({_id:e.target.value})}/>
                    {/*<TextField className="w-full"  label="Product ID"   disabled={true} variant="outlined" type="text" value={PRODUCT_ID ? PRODUCT_ID : ""} onChange={(e)=>setPRODUCT_ID(e.target.value)}/>*/}
                </div>

                <div className=" flex w-full mb-5">
                    <TextField className="w-full"  label="Product Name"   variant="outlined" type="text" value={item.title} onChange={(e)=> onChange({title:e.target.value})}/>
                </div>

                <div className=" flex w-full mb-5">
                    <TextField className="w-full"  multiline={true} label="Description"   variant="outlined" type="text" value={item.description} onChange={(e)=> onChange({description:e.target.value})}/>
                </div>

                <div className=" flex w-full mb-5">
                    <TextField className="w-full"  label="Slug"   variant="outlined" type="text" value={item.slug} onChange={(e)=> onChange({slug:e.target.value})}/>
                </div>

                <div className=" flex w-full mb-5">
                    <TextField className="w-full"  label="Brand"   variant="outlined" type="text" value={item.brand} onChange={(e)=> onChange({brand:e.target.value})}/>
                </div>

                <div className=" flex w-full mb-5">
                    <TextField className="w-full"  label="Model"   variant="outlined" type="text" value={item.model} onChange={(e)=>onChange({model:e.target.value}) }/>
                </div>

                <div className=" flex w-full mb-5">
                    <TextField className="w-full"  label="Currency"   variant="outlined" type="text" value={item.currency} onChange={(e)=>onChange({currency:e.target.value})}/>
                </div>

                <div className=" flex w-full mb-5 ">
                    <Autocomplete className={"w-full"} multiple freeSolo options={[]}   inputValue={TAGS_TEXT_VALUE}  onInputChange={(e:React.SyntheticEvent,value,r)=>{

                        //Deletion check

                        if (value.length < TAGS_TEXT_VALUE.length) {
                            if (value.length === 0)
                                console.log("Empty now")
                        }

                        if(value.includes(",")){
                            console.log("values are" + value)
                            onChange({tags: [...(item.tags ?? []) , value.slice(0,-1)]})
                            setTAGS_TEXT_VALUE("")
                            return;
                        }
                        setTAGS_TEXT_VALUE(value)
                    }} value={item.tags} renderValue={(p,v)=> p.map((e,i)=>{


                        return (
                            <CustomChip key={e} input_value={e} type_chip={"TAG"} background_color={tagColorMap[e]} border_color={tagColorMap[e]} options={item.options} in_tags={item.tags} onChange={onChange}/>
                        )
                    })}
                                  renderInput={(params)=>(<TextField {...params} label={"Tags"} className="w-full" variant="outlined" type="text"/>
                                  )} />
                </div>

            </div>
        </div>

        <div className="grid grid-rows-1 gap-5 mt-5">
            <Divider/>
            <Typography variant={"paragraph"}>
                Variants
            </Typography>
            <div className="grid grid-cols-2 gap-8">
                <div className=" flex w-full mb-5 ">
                    <Autocomplete className={"w-full"} multiple freeSolo options={[]}   inputValue={OPTION_TEXT_VALUE}
                                  onInputChange={(e:React.SyntheticEvent,value,r) =>{
                        //console.log("values are" + r)

                        //Deletion check

                        if (value.length < OPTION_TEXT_VALUE.length) {
                            if (value.length === 0)
                                console.log("Empty now")
                        }

                        if(value.includes(",")){


                            if (!item.options) {
                                console.warn("No options found");
                                return;
                            }

                            console.log("values are" + value)
                            const input_value:string = value.slice(0,-1);
                            const color_index = item.options?.findIndex(po=>po.name==="Color");
                            //check if value exists
                            if(item.options[color_index].values.filter((v)=>v === input_value).length > 0)
                            {
                                console.log("Value already exists");
                                setOPTION_TEXT_VALUE("")
                                return;
                            }
                            //Push new value
                            item.options[color_index].values.push(input_value);

                            item.options[color_index] = {
                                name: item.options[color_index]["name"],
                                values: item.options[color_index].values
                            };
                            onChange({options: item.options});
                            setOPTION_TEXT_VALUE("")
                            return;
                        }
                        setOPTION_TEXT_VALUE(value)
                    }} value={item.options && item.options.length > 0 ? (item.options?.[item.options?.findIndex(po=>po.name==="Color")].values) : []} renderValue={(p,v)=> p.map((e,i)=>{


                        return (
                            <CustomChip key={e} input_value={e} type_chip={"COLOR"} background_color={colorOptionMap[e]} border_color={colorOptionMap[e]} options={item.options} in_tags={item.tags} onChange={onChange}/>
                        )
                    })}
                                  renderInput={(params)=>(<TextField {...params} label={"Colors"} className="w-full" variant="outlined" type="text"/>
                                  )} />
                </div>

                <div className=" flex w-full mb-5 ">
                    <Autocomplete className={"w-full"} multiple freeSolo options={[]}   inputValue={OPTION_STORAGE_TEXT_VALUE}  onInputChange={(e:React.SyntheticEvent,value,r)=>{
                        //Deletion check

                        if (value.length < OPTION_STORAGE_TEXT_VALUE.length) {
                            if (value.length === 0)
                                console.log("Empty now")
                        }

                        if(value.includes(",")){

                            if (!item.options) {
                                console.warn("No options found");
                                return;
                            }

                            console.log("values are" + value)
                            const input_value:string = value.slice(0,-1);
                            const storage_index = item.options?.findIndex(po=>po.name==="Storage");

                            //check if value exists
                            if(item.options[storage_index].values.filter((v)=>v === input_value).length > 0)
                                {
                                    console.log("Value already exists");
                                    setOPTION_STORAGE_TEXT_VALUE("")
                                    return;
                                }

                            //Push new value
                            item.options[storage_index].values.push(input_value);

                            item.options[storage_index] = {
                                name: item.options[storage_index]["name"],
                                values: item.options[storage_index].values
                            };
                            onChange({options: item.options});
                            setOPTION_STORAGE_TEXT_VALUE("")
                            return;
                        }
                        setOPTION_STORAGE_TEXT_VALUE(value)
                    }} value={item.options && item.options.length > 0 ? (item.options?.[item.options?.findIndex(po=>po.name==="Storage")].values) : []} renderValue={(p,v)=> p.map((e,i)=>{


                        return (
                            <CustomChip key={e} input_value={e} type_chip={"STORAGE"} background_color={storageColorMap[e]} border_color={storageColorMap[e]} options={item.options} in_tags={item.tags} onChange={onChange}/>
                        )
                    })}
                                  renderInput={(params)=>(<TextField {...params} label={"Storage"} className="w-full" variant="outlined" type="text"/>
                                  )} />
                </div>
            </div>
        </div>

    </div>)
}


function New_variant({Colors, Storage, Brand, Model, VariantCount, VariantID, onDelete}:{Colors:string[], Storage:string[], Brand:string, Model:string, VariantCount:number, VariantID:string, onDelete:()=>void}) {
    const [newID, setNewID] = useState<string>("Generating ...");
    const [SKU, setSKU] = useState<string>("");
    const [SelectedStorage, setSelectedStorage] = useState<string>("");
    const [SelectedColor, setSelectedColor] = useState<string>("");

    const [Stock, setStock] = useState<number>(0)
    const [Price, setPrice] = useState<string>("0.00")

    const [DialogueOpen, setDialogueOpen] = useState<boolean>(false)


    // const NEW_SKU = generate_new_sku(Brand,Colors[0],Model, Storage[0]);


    useEffect(() => {
        generate_new_id().then((response)=>{
            if (response && response.success)
                setNewID(response.data)
        })
    }, []);

    return (
        <div className="p-4 mb-4 bordr border-dotted border-2 border-gray-200  rounded-xl bg-gray-100 bg-opacity-50 ">
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
                        onInputChange={(e,v,r)=>setSelectedColor(v)}
                        options={Colors}
                        renderInput={(params) => <TextField {...params} label="Colors" />}
                    />
                </div>
                <div className=" flex w-full mb-5">
                    <Autocomplete
                        className="w-full"
                        onInputChange={(e,v,r)=>setSelectedStorage(v)}
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
                            className="p-2 rounded-xl border border-dashed border-gray300 bg-gray-100 flex flex-col justify-center items-center hover:bg-gray-200 cursor-pointer">
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


function Already_Existed_variants({Color, Storage,inSKU,Stock, VariantCount, VariantID, onDelete, Media}:{Color:string,Stock:number,inSKU:string, Storage:string, VariantCount:number,Media:MediaBlock | undefined, VariantID:string, onDelete:()=>void}) {
    //const [newID, setNewID] = useState<string>("Generating ...");
    const [SKU] = useState<string>(inSKU);
    const available_variants = Object.keys(Media?.images?.[Color] ?? []);
    const [images_options_available, setImages_options_available] = useState<string[]>(()=> image_options.filter((i)=> !available_variants.includes(i)))
    const [DialogueOpen, setDialogueOpen] = useState<boolean>(false)


    //Uploaded File
    const [label_title, setLabel_title] = useState<string>("Choose File")
    const [File, setFile] = useState<File | null>(null)
    const [URL_PREVIEW, setURL_PREVIEW] = useState<string>("/logo/upload_logo_4000x4000.png")

    // console.log("Keys are",     Object.keys(MediaBlock.images));
    // const NEW_SKU = generate_new_sku(Brand,Colors[0],Model, Storage[0]);


    function handle_preview(file:File):string{
        return URL.createObjectURL(file);
    }

    useEffect(() => {
      /*  generate_new_id().then((response)=>{
            if (response && response.success)
                setNewID(response.data)
        })*/
    }, []);


    //clean up
    useEffect(() => {
        return ()=>{
            if(URL_PREVIEW && URL_PREVIEW.length > 0)
                URL.revokeObjectURL(URL_PREVIEW);
        }
    }, [URL_PREVIEW]);

    return (
        <div className="p-4 mb-4 bordr border-dotted border-2 border-gray-200  rounded-xl bg-gray-100 bg-opacity-50 ">

            {
                <Custom_Dialogue Handler={setDialogueOpen}
                                 Handler_Value={DialogueOpen}
                                 Header={<Typography variant="h5">Add Image</Typography>}
                                 Body={
                                     <div className="w-full h-full flex flex-col items-center justify-center">
                                         <label htmlFor={"product-image"} className="w-[50%] h-[50%] p-2 m-4 rounded-xl border border-dashed border-gray300 bg-gray-100 flex flex-col justify-center items-center hover:bg-gray-200 cursor-pointer">

                                                 <Image width={150} height={150}  className="w-[50%] h-[50%] object-cover" src={URL_PREVIEW} alt={"Upload"}/>
                                                 <Typography variant="small">Max file size: 50 MB</Typography>
                                                 <input id="product-image" className={"hidden"} type={"file"} accept={"image/*"}  onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                                     if(!e.target.files)
                                                         return;
                                                     setLabel_title(e.target.files[0].name);
                                                     setFile(e.target.files[0]);
                                                     setURL_PREVIEW(handle_preview(e.target.files[0]));
                                                 }}/>
                                                {label_title}
                                         </label>
                                         <div className="w-[50%] h-[50%] ">
                                             <Select label={"Variant"}>
                                                 {images_options_available.map((v,i)=>{
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
            <div className="flex justify-between">
                <Typography variant="h6" className="mb-2">Variant {VariantCount}</Typography>
                <Typography variant={"small"} className="mb-2 hover:underline text-red-500 cursor-pointer" onClick={(e)=>{
                    onDelete();
                }}>Remove</Typography>
            </div>
            <div className="grid grid-cols-4 gap-x-8">
                <div className=" flex w-full">
                    <TextField className={"w-full"} disabled={true} label={"Color"} value={Color}/>
                </div>
                <div className=" flex w-full">
                    <TextField className={"w-full"} disabled={true} label={"Storage"} value={Storage}/>
                </div>
                <TextField value={SKU} label={"SKU"} disabled={true}
                ></TextField>
                <TextField  disabled={true} value={VariantID} label="VARIANT ID"/>
            </div>
            <Divider  sx={{margin: "20px",}}>
                <Typography variant="small">Pricing</Typography>
            </Divider>
            <div className="grid grid-cols-2 gap-8">
                <TextField   value={Stock} label="Stock"/>
                <TextField value={"0.99"} label={"Price"} />
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
                    {available_variants.map((v,i)=>{
                        let img_url:string;
                        if(Media && Media.images){
                             type key = keyof ImagesOption
                             const va:key = v as key;

                             img_url = Media.images[Color][va] ?? "/logo/upload_logo_4000x4000.png"
                        }else img_url = "/logo/upload_logo_4000x4000.png"

                        return (
                            <div key={i} className="p-2 rounded-xl border border-dashed border-gray300 bg-gray-100 flex flex-col justify-center items-center hover:bg-gray-200 cursor-pointer">
                                <Image width={150} height={150}  className="w-[100%] h-[100%] object-cover" src={img_url} alt={"Image"}/>
                            </div>
                        )
                    })}
                    <div   className="w-full flex">
                        <div
                            onClick={()=> setDialogueOpen(!DialogueOpen)}
                            className="p-2 rounded-xl border border-dashed border-gray300 bg-gray-100 flex flex-col justify-center items-center hover:bg-gray-200 cursor-pointer">
                            <Image width={150} height={150}  className="w-[100%] h-[100%] object-cover" src={"/logo/upload_logo_4000x4000.png"} alt={"Upload"}/>
                        </div>
                    </div>
                </div>
            </div>

{/*
            <div className="w-full flex">
                <Button onClick={()=>setDialogueOpen(!DialogueOpen)}>Add Image</Button>
                {
                    <Custom_Dialogue Handler={setDialogueOpen}
                                  Handler_Value={DialogueOpen}
                                  Header={<Typography variant="h5">Add Image</Typography>}
                                  Body={
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <div className="w-[50%] h-[50%] p-2 m-4 rounded-xl border border-dashed border-gray300 bg-gray-100 flex flex-col justify-center items-center hover:bg-gray-200 cursor-pointer">
                                <img className="w-[50%] h-[50%] object-cover" src={"/logo/upload_logo_4000x4000.png"} alt={"Upload"}/>
                                <Typography variant="small">Max file size: 50 MB</Typography>
                            </div>
                            <div className="w-[50%] h-[50%] ">
                                <Select label={"Variant"}>
                                    {images_options_available.map((v,i)=>{
                                        return (<Option  key={i}>{v}</Option>)
                                    })}
                                </Select>
                            </div>
                        </div>
                }
                                  Footer={(<div className="grid grid-cols-2 gap-4">
                                      <Button>Submit</Button>
                                      <Button className={"bg-red-700"} onClick={()=> setDialogueOpen(!DialogueOpen) }>Cancel</Button>
                                  </div>)} />
                    }


                <Autocomplete renderInput={(params)=>(<TextField {...params} label={"Image options"}></TextField>)} options={image_options}/>

                {image_options.map((v,i)=>(
                    <div  key={i}  className="w-[150px] h-[150px] m-4 rounded-xl border border-dashed border-gray300 bg-gray-100 flex flex-col justify-center items-center hover:bg-gray-200">
                        <img className="w-[70px] h-[70px] object-cover" src={"/logo/upload_logo_4000x4000.png"} alt={"Upload"}/>
                        <Typography variant="small">{v} Image</Typography>
                    </div>
                ))}


            </div>
*/}


        </div>
    )
}

function generate_new_sku (Brand:string, Color:string, Model:string, Storage:string){
    const BRAND_SKU = Electronics.getBrandCode(Brand);
    const COLOR_SKU = Electronics.getColor(Color);
    const MODEL_SKU = Electronics.getModelCode(Model);
    return BRAND_SKU + "-" + MODEL_SKU + "-" + Storage + "-" + COLOR_SKU;
}


const Product_Variants = ({item,ExistingVariants,Colors, Storage,Model, Brand}:{ item:Item_Structure,ExistingVariants:Variant[] | undefined,Colors:string[], Storage:string[],Model:string, Brand:string})=>{



    type VariantItem = {
        id: string;
        data?: Variant; // existing or undefined (new)
    };


    const [variants, setVariants] = useState<VariantItem[]>(
        () =>
            ExistingVariants?.map((v) => ({
                id: uuidv4(),
                data: v,
            })) ?? []
    );




    function onDelete(id:string){
        setVariants((prev)=> (prev.filter(v=> v.id !== id)))
    }




    return (
        <div>
            <div className="mb-5">
                <Button  onClick={(e)=> setVariants((prev)=> [...prev, {id:uuidv4(),data:undefined}])} >Add Variant</Button>
            </div>

            {variants.map((variant,i)=> {
                //Pass the items to it
                //first we get the already set items
                if(variant.data){
                    return (<div key={variant.id} className="grid grid-rows-1 gap-5">
                        <Already_Existed_variants
                                                  Color={variant.data.options["Color"]}
                                                  Storage={variant.data.options["Storage"]}
                                                  inSKU={variant.data.sku} Stock={variant.data.stock}
                                                  VariantCount={i} VariantID={variant.data._id}
                                                  Media={item.media} onDelete={()=>{onDelete(variant.id);}}
                        />
                    </div>)
                }else {
                    return (<div key={variant.id} className="grid grid-rows-1 gap-5">
                        <New_variant  Colors={Colors} Storage={Storage} Brand={Brand}  Model={Model} VariantCount={i} VariantID={variant.id} onDelete={()=>{
                            onDelete(variant.id);
                        }}/>
                    </div>)
                }

            })}
            <div className="w-full flex flex-row items-end justify-end">
                <Button>
                    Apply
                </Button>
            </div>
        </div>
    )
}

const Specification = ({specs}: { specs: SpecsBlock | undefined})=>{
    const fields = specs ? Object.keys(specs) : []
    const [inSpecsDataOnChange, setInSpecsDataOnChange] = useState<SpecsBlock | undefined >(specs ?? {})

    useEffect(() => {
        if(!specs)return;
        if(specs != inSpecsDataOnChange)
            // eslint-disable-next-line react-hooks/set-state-in-effect
        setInSpecsDataOnChange(specs);
    }, [specs]);


    return (
        <div className={"w-full grid grid-cols-2 gap-5"}>
            {fields.length > 0 && fields.map((field)=> {


                 const fieldKey = field as keyof SpecsBlock;

                return (<div key={field} className=" flex w-full">
                    <TextField className={"w-full"} onChange={(e)=>{

                        setInSpecsDataOnChange((prev)=> {
                            if(!prev) return undefined;
                            return { ...prev, [fieldKey] : e.target.value }
                        })
                    }}
                               label={field.charAt(0).toUpperCase() + field.slice(1).replaceAll("_", " ")} value={inSpecsDataOnChange ? inSpecsDataOnChange[fieldKey] : ""}/>
                </div>)
            })}
        </div>
    )
}

export default function EditItem(){
    //Default Variable
    const HEADER:string[] = ["Product Information", "Variants", "Specifications"]


    const {slug} = useParams<{ slug: string }>();
    //Original
    const [item, setItem] = useState<Item_Structure|null>(null);
    //Copy, Editable
    const [draft, setDraft] = useState<Item_Structure | null>(null);

    //Variants State
    const [OPTIONS, setOPTIONS] = useState<string[]>(["Black", "White"])
    const [OPTIONS_STORAGE, setOPTIONS_STORAGE] = useState<string[]>(["256GB", "520GB","1TB"])




    useEffect(() => {
        getItemById(slug).then((i)=>{
            setItem(i? i.data : null);
            setDraft(i ? i.data : null);
        })
    }, [slug]);

    useEffect(() => {
        console.log("updated: ", draft)
    }, [draft]);



    //check if slug correspond to product we have in our db if not skipp.



    return (<div>

        {item && draft && generate_accordion({Data:{Header:HEADER, Content:[
            <Product_Information
                    key={0}
                    item={draft}
                    onChange={(patch:Item_Structure)=>setDraft((prev)=> prev ? {...prev, ...patch} : prev )}
                    />,

                    <Product_Variants key={item._id ?? item.slug} item={item} ExistingVariants={item.variants} Colors={OPTIONS} Storage={OPTIONS_STORAGE} Brand={item.brand ?? ""} Model={item.model ?? ""} />,

                    <Specification key={2} specs = {item.specs}/>
                ]}})}
    </div>)
}