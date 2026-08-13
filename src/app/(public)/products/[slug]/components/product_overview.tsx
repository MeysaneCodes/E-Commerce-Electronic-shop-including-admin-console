"use client"

import {ColorOption} from "@/types/product_type";
import {Item_Structure,ImagesOption} from "@/types/inventory_meta/product_meta/type";
import {useEffect, useState} from "react";
import {Button, Card, CardBody, Typography} from "@material-tailwind/react";
import ToolTip_ui from "@/components/ui/Tooltip/tooltip";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Badge_layout from "@/components/ui/Badge";

export default function Product_Overview ({data,Images, Icons}:{data:Item_Structure | null |undefined, Images:ImagesOption | object, Icons:any})  {
    //const IMAGES = [IPHONE_PACK,IPHONE_UB,IPHONE_FR,IPHONE_B,IPHONE_BE];


    const imageEntries = Object.entries(Images).filter(
        (entry): entry is [string, string] =>
            typeof entry[1] === "string" && entry[1].length > 0
    );



    const [IMAGE_INDEX, setImageShow] = useState<number>(0);

    const currentImage = imageEntries[IMAGE_INDEX]?.[1] ?? "";


    const atStart = IMAGE_INDEX === 0;
    const atEnd = IMAGE_INDEX >= imageEntries.length - 1;




    return (

        <div className="p-2 sm:p-4 w-full overflow-y-auto scrollbar-hide">
            <Card className="bg-card p-4 text-card-foreground shadow-none sm:p-5">
                <CardBody>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <Typography variant="h4" className="font-bold">
                                {data?.title}
                            </Typography>
                        </div>
                        <div>
                            <img src={Icons.share_icon} alt={"Share"}/>
                        </div>
                    </div>

                    {/*Rating section*/}
                    <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">


                        <Stack>
                            <Rating color={"red"} name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly={true} sx={{
                                "& .MuiRating-iconFilled": {
                                    color: "hsl(var(--primary))",
                                }
                            }} />
                        </Stack>

                        {/*TODO Delete and create a logic ,Generate a number*/}
                        <p>{data?.rating}</p>
                        <p>({data?.review_count})</p>
                        <div className="flex">

                            <ToolTip_ui imgIndicator={Icons.info_Icon} alt_text={""}
                                        contentText={ "Die durchschnittliche Bewertung basiert auf " +
                                            "allen verfügbaren Produktbewertungen. Dabei werden auch Bewertungen " +
                                            "aus externen Quellen berücksichtigt (z. B. von der Website des Hersteller oder anderen Online-Shops, " +
                                            "die zu unserer Unternehmensgruppe gehören)Verifizierte Bewertungen sind mit dem Vermerk verifiziert gekennzeichnet."} toolTipPos={"tooltip-bottom"}/>

                        </div>

                        <div>
                            <Typography>
                                | Art.-Nr. {data?._id ?? ""} |
                            </Typography>
                        </div>

                        <div>
                            <Typography className="underline cursor-pointer">
                                {data?.brand}
                            </Typography>
                        </div>
                    </div>

                    <div>
                        <img className="w-5 aspect-auto" src={Icons.APPLE_LOGO} alt={data?.brand}/>
                    </div>

                    {/*//TODO create system for this to be based on db. dynamic addition for admin*/}
                    <Badge_layout badges={["Versandkostenfrei","myTemplate-Rabatt verfügbar" ]}/>

                    <div className="w-full ">
                        <div className="flex h-[320px] w-full sm:h-[420px] lg:h-[500px]">
                            {/*<img className="object-cover aspect-auto h-[500px]" src={IPHONE_B} alt={""}/>*/}




                            {/*<div className="flex-1/2" ><Button

                                className=" w-[40px] h-[40px] rounded-none ">
                                <img src={leftArrow}/>
                            </Button></div>*/}
                            <div className="flex-[10%] h-full  flex items-center justify-center ">
                                <div className="" ><Button
                                    disabled={atStart}

                                    onClick={()=>{
                                        if(IMAGE_INDEX ===0) return;
                                        setImageShow(IMAGE_INDEX -1);
                                    }}
                                    className=" w-[40px] h-[40px] p-0 m-0 flex rounded-xl bg-primary text-secondary-foreground hover:bg-brand-700 disabled:opacity-50 disabled:bg-destructive ">
                                    <img className="flex h-10 w-10 items-center rounded-xl justify-center p-0" src={Icons.leftArrow} alt={"perv"}/>
                                </Button></div>

                            </div>
                            <div className="h-full aspect-auto flex-[80%] ">
                                {/*<img className="bg-yellow-100 object-contain aspect-auto h-[500px]" src={IMAGES[IMAGE_INDEX]} alt={""}/>*/}
                                {currentImage && (
                                    <img
                                        key={currentImage}
                                        className="h-full w-full animate-fadeIn object-contain"
                                        src={currentImage}
                                        alt={data?.title ?? "Product image"}
                                    />
                                )}

                            </div>
                            <div className="flex-[10%] h-full  flex items-center justify-center ">
                                <div className="" ><Button
                                    disabled={atEnd}
                                    onClick={()=>{
                                        if (IMAGE_INDEX >= imageEntries.length - 1) return;
                                        setImageShow(IMAGE_INDEX +1);
                                    }}
                                    className=" w-[40px] h-[40px] p-0 m-0 flex rounded-xl bg-primary text-secondary-foreground hover:bg-brand-700 disabled:opacity-50 disabled:bg-destructive ">
                                    <img className={"flex h-10 w-10 items-center justify-center rounded-xl p-0"} src={Icons.rightArrow} alt={"next"}/>
                                </Button></div>
                            </div>


                        </div>

                        <div className="w-full   flex gap-1 overflow-x-scroll mt-1 scrollbar-hide ">
                            {imageEntries.map(([v,url], index)=>(
                                (url && <div key={v}
                                             className={`flex h-20 w-24 shrink-0 cursor-pointer items-center justify-center border sm:h-[100px] sm:w-[150px]  ${
                                                 IMAGE_INDEX === index ? "border-primary" : "border-border"
                                             } hover:border-muted-foreground/40 cursor-pointer`}>
                                        <img className="object-contain aspect-auto w-full h-full" src={url} alt={""} onClick={()=>setImageShow(index)}/>
                                    </div>
                                )
                            ))}
                        </div>

                    </div>


                </CardBody>
            </Card>
        </div>

    );
}
