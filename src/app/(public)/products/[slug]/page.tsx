"use client"

//Query

import {useQuery} from "@tanstack/react-query"

//Dynamic URL
import {useParams} from "next/navigation"



//Components
import {
    Card,
    ListItem,
    Typography
} from "@material-tailwind/react";
import {useMemo, useState} from "react";
import {Collapse, List} from "@material-tailwind/react";
import { NavArrowDown } from "iconoir-react";
import {Breadcrumbs,Link} from "@mui/material/"





//Icons

const Icons = {
     share_icon: "/icons/button_icons/share_icon.svg",
     info_Icon:  "/icons/info_icon.svg",
     leftArrow:  "/icons/button_icons/navigation_icon/leftArrow.svg",
     rightArrow:  "/icons/button_icons/navigation_icon/rightArrow.svg",
     finanze_icon:  "/icons/finanze_icon.svg",
     point_system_icon:  "/icons/point_system_icon.svg",
     radiobutton_dot:   "/icons/radio_point.svg",
     point_system_diagramm:  "/icons/point_system_diagram/diagram.svg",
    APPLE_LOGO:  "/icons/brands/Apple_logoo.svg",
}
import HomeIcon from '@mui/icons-material/Home';



//ProductImages TODO Fetch from DB





///////////////////////Structure//////////////////
import {Item_Structure} from "@/types/inventory_meta/product_meta/type";


/////////Cart Item structure




//Variables



import Product_Details from "@/app/(public)/products/[slug]/components/product_details";
import Product_Overview from "@/app/(public)/products/[slug]/components/product_overview";


//[IPHONE_PACK,IPHONE_UB,IPHONE_FR,IPHONE_B,IPHONE_BE],
//get Cache, maybe this one to be moved to nav_bar ? because navbar is shared across the app
//update the shoppingcart on client adding item to shopping cart





//TODO Change on deploying
async function getItemsBySlug ({slug, signal}:{slug:string|undefined, signal?: AbortSignal}): Promise<Item_Structure | null> {

      console.log("came here")

    //TODO change the link on deploying
    //TODO Generate SLUG ON ADMIN PANEL WHEN ADDING PRODUCT (IMPORTANT!!!)
    //TODO now we do fetch without Query, later maybe ?
    const item = await fetch(`/api/products/${slug}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        signal: signal,
        body: JSON.stringify({CName:"products"})
    });




    if(!item.ok)
        throw new Error("Failed to fetch items.");

    const res = await item?.json();
    const data = res.data as Item_Structure;
    //console.log(data);
    return data ?? null;
}



const Collapse_ProductSpecsList = ()=>{
    const [isOpen1, setIsOpen1] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const [isOpen3, setIsOpen3] = useState(false)
    const [isOpen4, setIsOpen4] = useState(false)


    return(

        <div className="mt-10 px-2 py-4 sm:px-4">
            <Card className="bg-card p-4 text-card-foreground shadow-none sm:p-6 lg:px-20 lg:py-10">
                <List className="border-t border-border">
                    <ListItem className="flex justify-between text-base  font-bold text-card-foreground sm:text-xl" onClick={()=>setIsOpen1((current) => !current)}>
                        Produktbeschreibung
                        <NavArrowDown className={`${isOpen1 ? "rotate-180" : "" }`}/>
                    </ListItem>
                    <Collapse open={isOpen1}>
                        <Typography className="text-muted-foreground">
                            Keine Produktbeschreibung vorhanden

                        </Typography>
                    </Collapse>

                </List>
                <List className="border-t border-border ">
                    <ListItem className="flex justify-between text-base  font-bold text-card-foreground sm:text-xl" onClick={()=>setIsOpen2((current) => !current)}>
                        Technische Daten
                        <NavArrowDown className={`${isOpen2 ? "rotate-180" : "" }`}/>
                    </ListItem>
                    <Collapse open={isOpen2}>
                        <Typography className="text-muted-foreground">
                            Keine Technische Daten vorhanden

                        </Typography>
                    </Collapse>

                </List>
                <List className="border-t border-border ">
                    <ListItem className="flex justify-between text-base  font-bold text-card-foreground sm:text-xl" onClick={()=>setIsOpen3((current) => !current)}>
                        Allgemeine Produktsicherheit
                        <NavArrowDown className={`${isOpen3 ? "rotate-180" : "" }`}/>
                    </ListItem>
                    <Collapse open={isOpen3}>
                        <Typography className="text-muted-foreground">
                            Keine Allgemeine Produktsicherheit vorhanden

                        </Typography>
                    </Collapse>

                </List>
                <List className="border-t border-border ">
                    <ListItem className="flex justify-between text-base  font-bold text-card-foreground sm:text-xl"  onClick={()=>setIsOpen4((current) => !current)}>
                        Produktbewertungen
                        <NavArrowDown className={`${isOpen4 ? "rotate-180" : "" }`}/>
                    </ListItem>
                    <Collapse open={isOpen4}>
                        <Typography className="text-muted-foreground">
                            Keine Produktbewertungen vorhanden

                        </Typography>
                    </Collapse>

                </List>
            </Card>
        </div>



    )
}


//Main

export default function SingleProduct() {

//Slug
    const {slug} = useParams<{ slug: string }>();



    const {data: fetched_items, isLoading} = useQuery({
        queryKey: ["product", slug],
        queryFn: async ({signal}) => {
            return await getItemsBySlug({slug: slug, signal})
        },
        //after 10mins data becomes stale, but it will get the data from cache
        //10mins
        staleTime: 60 * 60 * 1000,
        //1h
        gcTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: true,
    });


    //Which collection to show based on ColorSelected
    const [ImageVariantIndex, setImageVariantIndex] = useState<number>(0);

    //Variants we have, Variant A and B
   const variants = useMemo(
       //Check if product has the color option
       ()=>  {
           console.log("checking0: ", fetched_items)
           return fetched_items?.options?.find(o => o.name === "Color")?.values ?? [];
       }
        ,
        [fetched_items?.options]
    );

//    console.log("Images : " + JSON.stringify(fetched_items?.options?.colors[0].imagesURL));


    //Variant A , Variant B --->   Big Image A or B
    //Current images to show on big slide
   const currentImages = useMemo(
        //return the current selected variant among other variants
        () => {
           // console.log("Selected v", variants)
           // console.log("Images are :", fetched_items?.media?.images[variants[ImageVariantIndex]])
            console.log("Checking : " + variants[ImageVariantIndex])
            return fetched_items?.media?.images?.[variants[ImageVariantIndex]] ?? {}
        }
        ,
        [ImageVariantIndex, fetched_items, variants]
    );

    //const variantsd = fetched_items?.variants;
    //const currentImagesd =



    //TODO use skeleton loading on FETCHING
    if (isLoading)
        return (<div className="w-full h-screen"></div>);


    return (

        <div className="mx-auto w-full max-w-[1400px] bg-background px-2 text-foreground sm:px-4 lg:px-0">
            <div className="w-full p-4 mt-5">
                    <Breadcrumbs
                        sx={{
                            color: "hsl(var(--muted-foreground))",
                            "& a": {
                                color: "hsl(var(--muted-foreground))",
                            },
                            "& a:hover": {
                                color: "hsl(var(--primary))",
                            },
                        }}
                        aria-label="breadcrumbs" className="text-muted-foreground">
                        <Link underline="hover" color="inherit" href="/public">
                            <HomeIcon/>
                        </Link>
                        <Link underline="always" color="inherit" href="/public">
                            Products
                        </Link>

                        <Link underline="always" color="inherit" href="/public">
                            {slug}
                        </Link>
                    </Breadcrumbs>
            </div>
            <div className="mx-auto grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start ">
                {/* Left column */}
                <div
                    className="w-full lg:sticky lg:top-4"
                >
                   <Product_Overview data={fetched_items} Images={currentImages} Icons={Icons}/>
                </div>

                {/* Right column */}
                <div
                    className="w-full"
                >

                    <Product_Details inFetched_item={fetched_items} setVariantAction={setImageVariantIndex} Icons={Icons} />

                </div>
            </div>

            <div className="w-full h-auto ">
            </div>

            <Collapse_ProductSpecsList/>
        </div>

    )

}




