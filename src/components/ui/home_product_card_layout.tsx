"use client"

import {
    Card,
    CardBody,
    Popover,
    PopoverContent, PopoverHandler,
    Rating, Typography,
} from "@material-tailwind/react";
import {useState} from "react";
//Routes
import {ROUTES} from "@/lib/Routes/routes";





import {Item_Structure} from "@/types/inventory_meta/product_meta/type";
import {useRouter} from "next/navigation";




type Props = {
    isSponsored: boolean,
    isDiscounted?: boolean,
    OriginalPrice: string
    item: Item_Structure,
    prefetch_functionAction:(slug: string | undefined) => void,
}



export default function ProductCardLayout({item,prefetch_functionAction,isSponsored, isDiscounted,OriginalPrice} : Props ) {
    const discount = isDiscounted ?? false;

    const router = useRouter();
    const [openPopover, setOpenPopover] = useState(false);


    const optionValue = item.options?.[0]?.values?.[0];
    const productImage = optionValue
        ? item.media?.images?.[optionValue]?.front
        : undefined;
    const productPrice = item.variants?.[0]?.price ?? 12;



    return (
        <div>
            <Card
                onClick={()=>{
                  //  router.push(`/products/${item.slug}`)
                      if(!item.slug)console.warn("No slug found!");
                      router.push(ROUTES.PRODUCT(item.slug ?? ""))
                }


                }

                onMouseEnter={()=> prefetch_functionAction(item.slug)}

                className="h-[420px] w-[220px] shrink-0 border border-ring
                bg-card p-3 text-card-foreground hover:cursor-pointer
                hover:border-brand-700 hover:shadow-lg sm:h-[460px] sm:w-[260px] sm:p-4
                lg:h-[500px] lg-w-[300px] lg:p-5">
                <CardBody className="p-0 m-0 ">
                    <div className="flex overflow-scroll scrollbar-hide">
                        <p className="mx-2 inline-flex whitespace-nowrap rounded border border-primary bg-secondary px-2 py-1 text-xs text-secondary-foreground">Versandkostenfrei</p>
                        <p className="mx-2 inline-flex whitespace-nowrap rounded border border-primary bg-secondary px-2 py-1 text-xs text-secondary-foreground">myTemplate-Rabatt verfügbar</p>
                    </div>

                    {/*Sponosoring products information*/}
                    {isSponsored && (<div className="flex">
                        <p className=" p-2 text-xs">Gesponsert</p>
                        <Popover open={openPopover} handler={setOpenPopover} placement="bottom-start">
                            <PopoverHandler>
                                <img src={"/icons/info_icon.svg"} alt={"Gesponserte Produkte"}/>
                            </PopoverHandler>

                            <PopoverContent className="w-[min(350px, cal(100vw-2rem))] rounded-l-xs border border-border bg-popover text-xs  text-popover-foreground ">
                                <div className="absolute -top-0.5 left-0 w-0.5 h-0.5 border-l-12 border-r-12 border-t-12 border-transparent border-t-popover"></div>

                                <p>
                                    Dies sind Produktanzeigen, die von unseren Partnern finanziert werden.
                                    Wenn Sie auf eine Anzeige klicken, bleiben Sie in unserem Shop und werden
                                    auf eine Produktdetailseite geleitet.
                                </p>

                                {/*TODO change route*/}

                                <p onClick={()=> router.push("/")} className="mt-5 font-bold hover:text-primary cursor-pointer">
                                    Weiter Details
                                </p>

                            </PopoverContent>
                        </Popover>
                    </div>)}

                    <div className="mt-2 flex justify-center items-center w-full h-[180px] rounded-xl  p-2 sm:h[220px] lg:h-[250px]">
                        {/*Product Image*/}
                        {/*//TODO*/}
                        {productImage && (
                            (<img className="max-w-full max-h-full object-contain" src={productImage} alt={item.title ?? "Product image"}/>))}
                    </div>

                    {/*Rates*/}
                    {/*TODO need to be edited to be dynamic, total of reviews and how many stars should be calculated*/}

                    <div className="flex items-center gap-2   text-muted-foreground text-xs">
                        <Rating ratedColor="red" value={4} readonly />
                        <p>1024</p>
                    </div>

                    {/*Product Title*/}
                    <div className="mb-8">
                        <div className="mt-2 w-full line-clamp-3 text-foreground ">
                            <Typography>
                                {item.title}
                            </Typography>
                        </div>
                    </div>

                    {/*If Produkt with discount*/}
                    {discount && (<div className="flex gap-2">
                        <p className="bg-primary text-primary-foreground text-xs p-1">-12%</p>
                        <p className="text-xs p-1 line-through text-muted-foreground"> UVP {OriginalPrice}</p>
                        <div className="flex">

                            {/*//TODO UPDATE POPOVER*/}
                            {/*    <Popover open={openPopover_Discount} handler={setOpenPopover_Discount} placement="top-start">
                                <PopoverHandler {... triggers_discount }>
                                    <img src={info_Icon} alt={"Gesponserte Produkte"}/>
                                </PopoverHandler>

                                <PopoverContent {... triggers_discount } className="rounded-l-xs border-none text-xs bg-black text-white w-[350px]">
                                    <div className="absolute -bottom-0.5 left-0 w-0.5 h-0.5 border-l-12 border-r-12 border-b-12 border-transparent border-b-white"></div>

                                    <p>
                                        Der hier angezeigte Preis ist die unverbindliche Preisempfehlung des Herstellers.
                                    </p>

                                </PopoverContent>
                            </Popover>*/}
                        </div>

                    </div>)
                    }


                    {/*Product Price*/}
                    <div>
                        <p className="text-2xl font-bold">
                            {/*479,- €*/}
                            {productPrice},- €
                        </p>
                    </div>

                    <div>
                        <p className="underline text-sm text-muted-foreground">inkl. MwSt. versandkostenfrei</p>
                    </div>


                </CardBody>
            </Card>
        </div>
    )


}