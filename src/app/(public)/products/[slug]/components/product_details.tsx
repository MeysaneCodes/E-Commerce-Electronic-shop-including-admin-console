"use client"

import {Dispatch, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import FetchTimeout from "@/utils/timeout";
import {Radio, CircularProgress} from '@mui/material';
import {DiscountOption, Item_Structure, Variant} from "@/types/inventory_meta/product_meta/type";
import {Button, Card, CardBody, Typography} from "@material-tailwind/react";
import ToolTip_ui from "@/components/ui/Tooltip/tooltip";
import {CartItem} from "@/types/cart_types";
import {UpdateCart} from "@/lib/api/cart_api";

import {cart_count_observer} from "@/providers/patterns/beobachter";


type Props = {
    inFetched_item : Item_Structure | undefined | null
    setVariantAction : (value: number | ((prev: number) => number)) => void
    Icons: Record<string, string>
}

export default function Product_Details ({inFetched_item,setVariantAction, Icons }:Props){

    // UI state for selectors, modal visibility, cart loading, and displayed price.
    const [openPointSystem_modal, setOpenPointSystemModal] = useState(false);
    const [IMAGE_INDEX, set_IMAGE_TOSHOW] = useState<number>(0);
    const [StorageSelected_INDEX, setSelectedStorage] = useState<number>(0);
    const [isNewProductClicked, setNewProductClicked] = useState<boolean>(true);
    const [devicecondition, setDevicecondition] = useState<number>(0);
    const [isTimeOutOn, setIsTimeOutOn] = useState<boolean>(false);
    const [finalPrice, setFinalPrice] = useState<string | undefined>("0");

    const enum deviceConditionList  {
        Excellent = "Exzellent",
        Very_Good = "Sehr Gut",
        Good = "Gut",
    }


    // Available option values from the fetched product.
    const AVAILABLE_COLORS = useMemo(()=>{
        return inFetched_item?.options?.find(options => options.name === "Color")?.values ?? []
    },  [inFetched_item])


    const AVAILABLE_STORAGE = useMemo(()=>{

        return inFetched_item?.options?.find(options => options.name === "Storage")?.values ?? []


    },  [inFetched_item])


    // Group variants by color so color changes can choose a valid storage fallback.
    const ITEM_AVAILABILITY = useMemo(()=>{
        const availability:Record<string, Variant[]> = {}

        AVAILABLE_COLORS.forEach((item_color,)=>{
            const v = inFetched_item?.variants?.filter((variant => variant.options["Color"] === item_color))
            if(v && v.length){
                availability[item_color] = v
            }
        })
        return availability
    },  [AVAILABLE_COLORS, inFetched_item])

    // Current purchasable variant derived from selected color and storage.
    const selectedColor = AVAILABLE_COLORS[IMAGE_INDEX];
    const selectedStorage = AVAILABLE_STORAGE[StorageSelected_INDEX];
    const selectedVariant = inFetched_item?.variants?.find(
        (variant) =>
            variant.options["Color"] === selectedColor &&
            variant.options["Storage"] === selectedStorage
    ) ?? (selectedColor ? ITEM_AVAILABILITY[selectedColor]?.[0] : undefined);
    const selectedPrice = selectedVariant?.price ?? 0;

    // Discount belongs to the selected variant, not to the product globally.
    const DISCOUNT_VARIABLE = useMemo(()=>{
        return selectedVariant?.discount ?? false;
    },  [selectedVariant])

    // Points-info modal with outside-click and Escape close handling.
    const Modal = ({setOpen}: {setOpen:Dispatch<SetStateAction<boolean>>})=>{
        const modalRef = useRef<HTMLDivElement>(null);


        useEffect(()=>{
            function handleClickOutside(event: MouseEvent){
                if(modalRef.current && !modalRef.current.contains(event.target as Node)){
                    setOpen(false);
                }
            }

            function handleEscKey(event:KeyboardEvent){
                if (event.key ==="Escape"){
                    setOpen(false);
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", (handleEscKey));
            document.body.style.overflow = "hidden";


            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                document.removeEventListener("keydown", handleEscKey);
                document.body.style.overflow = "auto";
            }
        },[])


        return (


            <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-background/70 p-4  ">
                <div ref={modalRef} className="w-[calc(100%-2rem)] max-w-2xl scale-95 overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-2xl" >
                    <div className=" max-h-[90vh] p-7 pb-2 flex flex-col ">

                        <div className="flex">
                            <Typography variant="h4">
                                Über myTemplate-Punkte
                            </Typography>
                        </div>

                        <div className="overflow-y-auto flex-1 ">

                            <div className=" flex content-center items-center justify-center ">
                                <img src={Icons.point_system_diagramm} alt={""}/>
                            </div>
                            <div className="">

                                <div className=" font-semibold">
                                    <Typography variant="paragraph">
                                        Als myTemplate-Kunde punktest du bei jedem Einkauf. So funktioniert es:
                                    </Typography>
                                </div>

                                <div className="space-y-2 text-card-foreground p-5" >
                                    <Typography variant="paragraph">• Beim Kauf im Markt deine (digitale) myTemplate-Karte vorzeigen,</Typography>
                                    <Typography variant="paragraph">• In der App oder online shoppen</Typography>
                                    <Typography variant="paragraph">• Automatisch mindestens 5 Punkte pro ausgegebenem Euro erhalten</Typography>
                                    <Typography variant="paragraph">
                                        • Die gesammelten Punkte 30 Tage nach dem Kauf in einen Coupon umwandeln und beim nächsten Einkauf sparen.
                                        Dabei kannst du deine Punkte wie folgt eintauschen:
                                    </Typography>
                                    <div className="pl-4 space-y-1">
                                        <Typography variant="paragraph">• 10.000 Punkte in einen 10.- Euro Coupon (50.- Mindestbestellwert)</Typography>
                                        <Typography variant="paragraph">• 25.000 Punkte in einen 25.- Euro Coupon (125.- Mindestbestellwert)</Typography>
                                        <Typography variant="paragraph">• 50.000 Punkte in einen 50.- Euro Coupon (250.- Mindestbestellwert)</Typography>
                                        <Typography variant="paragraph">• 100.000 Punkte in einen 100.- Euro Coupon (500.- Mindestbestellwert)</Typography>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className="p-5 flex justify-end ">
                            <Button  className="p-2 rounded-none bg-primary text-primary-foreground hover:bg-brand-700 cursor-pointer underline" onClick={()=>setOpen(false)}>
                                Mehr über myTemplate-Punkte erfahren
                            </Button>
                        </div>

                    </div>
                </div>

            </div>
        )
    }


    // Keeps the cart button spinner visible briefly after the request finishes.
    const {start:startTimeOut} = FetchTimeout({setLoading: setIsTimeOutOn, delay:300});


    // Recalculate the visible price whenever the selected variant or discount changes.
    useEffect(() => {
        if(!DISCOUNT_VARIABLE){
            setFinalPrice(Intl.NumberFormat("de-DE", {
                style:"currency",
                currency: "EUR"
            }).format(selectedPrice));
            return;
        }

        function  calculateDiscountPrice ({price,discountValue,valid_until,discountType}: {price: number | undefined,valid_until:DiscountOption["valid_until"] , discountValue:DiscountOption["value"], discountType: DiscountOption["type"] }) {



            const now = new Date();
            const isValid = !valid_until || new Date(valid_until) >= now;
            if(!discountValue || !price) return "0";
            if (!isValid){
                return price?.toString();
            }

            if(discountType === "PERCENTAGE"){
                const calculatedPrice = (price ?? 0 ) * ( 1 - (discountValue ?? 0)/100);
                return  Intl.NumberFormat('de-DE',{
                    style: "currency",
                    currency: "EUR"
                }).format(calculatedPrice);


            }else if(discountType === "AMOUNT"){
                const calculatedPrice =  (price ?? 0) - (discountValue ?? 0);
                return  Intl.NumberFormat('de-DE',{
                    style: "currency",
                    currency: "EUR"
                }).format(calculatedPrice);
            }else return price?.toString();
        }

        setFinalPrice(calculateDiscountPrice({price: selectedPrice,
            discountValue: (DISCOUNT_VARIABLE as DiscountOption).value,
            discountType: (DISCOUNT_VARIABLE as DiscountOption).type,
            valid_until: (DISCOUNT_VARIABLE as DiscountOption).valid_until})
        );
    }, [DISCOUNT_VARIABLE, selectedPrice]);
    // Add the selected variant to the cart and notify the top-bar badge.
    const handleAddToCart = async () => {
        if (isTimeOutOn || !inFetched_item || !selectedVariant || !selectedColor) return;

        setIsTimeOutOn(true);

        const item: CartItem = {
            productId: inFetched_item._id ?? "",
            skuId: selectedVariant.sku ?? "-",
            qty: 1,
            imageUrl: inFetched_item.media?.images?.[selectedColor]?.front ?? "-",
            addedAt: new Date(),
            updatedAt: new Date()
        }

        try {
            const result = await UpdateCart({item: item, Qty: undefined, directional: "+"});
            if (result?.success) {
                cart_count_observer.notify();
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.error("[CLIENT] [PRODUCT_DETAILS] [ADD_TO_CART] " + message);
        } finally {
            startTimeOut();
        }
    }

    const Content = ()=> (<div className="p-4">
        <Card className="h-auto   bg-card p-4 text-card-foreground shadow-none sm:p-5">
            <CardBody>
                <div>

                    {/* Active discount and base price */}
                    {(DISCOUNT_VARIABLE) &&
                        (<div className="flex gap-2 justify-end">
                            <p className="bg-primary text-primary-foreground text-xs p-1">{(()=>{
                                if(DISCOUNT_VARIABLE.type === "PERCENTAGE"){
                                    return `- ${DISCOUNT_VARIABLE.value} %`
                                } else if(DISCOUNT_VARIABLE.type === "AMOUNT"){
                                    return `- ${DISCOUNT_VARIABLE.value} €`
                                }
                            })()}</p>
                            <p className="text-xs p-1 line-through"> UVP {Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR"
                            }).format(selectedPrice)}</p>
                            <div className="flex ">
                                <ToolTip_ui imgIndicator={Icons.info_Icon} alt_text={""}
                                            contentText={" Der hier angezeigte Preis ist die unverbindliche Preisempfehlung des Herstellers."} toolTipPos={"tooltip-left"}/>
                            </div>

                        </div>)
                    }


                    {/* Selected variant price and stock state */}
                    <div>
                        <p className={`flex justify-end text-4xl font-bold ${DISCOUNT_VARIABLE ? "text-primary" : "text-foreground"}`}>
                            {
                                (()=>{
                                    if((selectedVariant?.stock ?? 0) > 0)
                                          return finalPrice;
                                    else return "Out of Stock";
                                })()

                            }
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <p className="underline text-sm">inkl. MwSt. versandkostenfrei</p>
                    </div>


                    {/* Financing summary */}
                    <div className="bg-secondary text-secondary-foreground flex flex-col mt-5 p-3 rounded-xl gap-2">
                        <div className="flex justify-between">
                            <div className="flex grid-cols-2 gap-0  m-0 p-0">
                                <div className="w-[50px]">
                                    <img className="" src={Icons.finanze_icon} alt={""}/>
                                </div>
                                <div className="ml-2">
                                    <Typography className={"text-secondary-foreground"} variant="h5">
                                        Finanzierung
                                    </Typography>
                                    <Typography className={"text-secondary-foreground"} variant="small">
                                        10 mtl. Raten
                                    </Typography>
                                    <Typography className={"text-secondary-foreground"} variant="small">
                                        Gesamtbetrag: 261,– €
                                    </Typography>
                                </div>

                            </div>
                            <div>
                                <Typography className="font-bold text-secondary-foreground" variant="small">
                                    eff. Zins p.a. 10.9%**
                                </Typography>
                                <Typography className="font-bold text-secondary-foreground" variant="small">
                                    26,10 € monatlich
                                </Typography>
                            </div>
                        </div>
                        <Typography className="mt-3 cursor-pointer font-bold">
                            ***Zum Ratenrechner & rechtl. Hinweise
                        </Typography>
                    </div>


                    {/* Loyalty points summary and modal trigger */}
                    <div className="mt-3 flex items-center gap-1">
                        <img src={Icons.point_system_icon} alt={""}/>
                        <Typography className="font-bold">myTemplate-Punkte</Typography>
                        <div className="border-none"  onClick={() => setOpenPointSystemModal(true)}>
                            <img src={Icons.info_Icon} alt={"Gesponserte Produkte"}/>
                        </div>
                        {openPointSystem_modal && (<Modal setOpen={setOpenPointSystemModal}/>
                        )}

                    </div>


                    <div className=" mt-4 border-t border-border"></div>

                    {/* Color selector updates image gallery and storage fallback */}
                    <div className="mt-4">
                        <div>
                            <Typography className="font-bold" variant="h5">
                                Farbe (laut Hersteler): {(() => {
                                return selectedColor;
                            })()}
                            </Typography>
                        </div>

                        <div className="w-full   flex gap-1 overflow-x-scroll mt-1 scrollbar-hide">

                            {inFetched_item && AVAILABLE_COLORS.map((_image, index) => (
                                <div key={index}
                                     onClick={() => {
                                         const nextColor = AVAILABLE_COLORS[index];
                                         const firstAvailableStorageIndex = AVAILABLE_STORAGE.findIndex((storage) =>
                                             inFetched_item?.variants?.some(
                                                 (variant) =>
                                                     variant.options["Color"] === nextColor &&
                                                     variant.options["Storage"] === storage
                                             )
                                         );

                                         set_IMAGE_TOSHOW(index);
                                         setVariantAction(index);
                                         setSelectedStorage(firstAvailableStorageIndex >= 0 ? firstAvailableStorageIndex : 0)
                                     }}
                                     className={`min-w-[150px] flex h-[150px] items-center justify-center border mt-2 ${
                                         IMAGE_INDEX === index ? "border-primary border-2" : "border-border"
                                     } hover:border-muted-foreground/40 cursor-pointer`}>

                                    {<img className="object-fill aspect-auto h-[100px]" src={inFetched_item.media?.images?.[AVAILABLE_COLORS[index]]?.front ?? ""} alt={""}/>}
                                </div>
                            ))}

                        </div>
                    </div>


                    {/* Storage selector hides unavailable combinations for the selected color */}
                    <div className="mt-4">
                        <div>
                            <Typography className="font-bold" variant="h5">
                                Speicherkapazität
                            </Typography>
                        </div>

                        <div className="w-full   flex gap-1 overflow-x-scroll mt-1 scrollbar-hide ">
                            {AVAILABLE_STORAGE.length > 0 && AVAILABLE_STORAGE.map((Storage_capacity, index) => {
                                const isValid = inFetched_item?.variants?.find((v=> v.options["Storage"] === Storage_capacity && selectedColor === v.options["Color"]))
                                return (
                                    <div key={index}
                                         onClick={() => setSelectedStorage(index)}
                                         className={`min-w-[100px]  h-[50px] mt-2 mr-2 flex justify-center items-center border ${
                                             StorageSelected_INDEX === index ? "border-primary border-2" : "border-border"
                                         } hover:border-muted-foreground/40 cursor-pointer  ${isValid ? "" : "hidden"}`}>
                                        <Typography>
                                            {Storage_capacity}
                                        </Typography>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className=" mt-4 mb-4 border-t border-border"></div>

                    {/* Purchase option: new product */}
                    <div className="">
                        <div className={`w-full h-auto border rounded-xl ${isNewProductClicked ? "border-primary border-2" : "border-border" } mb-2 hover:border-muted-foreground/40 `}>

                            <div className="p-5 block ">

                                <div className="flex mb-5  " onClick={()=>setNewProductClicked(true)}>
                                    <div className="flex items-center justify-between ">



                                        <div className="w-full flex justify-center items-center">
                                            <div>

                                                <Radio sx={{
                                                    color: "hsl(var(--foreground))",
                                                    "&.Mui-checked": {
                                                        color: "hsl(var(--primary))",
                                                    }

                                                }} checked={isNewProductClicked}/>
                                            </div>

                                            <label
                                                htmlFor="radio-description-html1" className="shrink-0 relative cursor-pointer w-full">
                                                <Typography variant="h6">
                                                    Neues Produkt
                                                </Typography>
                                            </label>


                                        </div>



                                    </div>

                                </div>

                                <div>
                                    <div className="mb-2">
                                        <div>
                                            <Typography className="font-bold">
                                                {finalPrice}
                                            </Typography>
                                        </div>
                                        <div className="flex ">
                                            <p className="underline text-sm">inkl. MwSt. versandkostenfrei</p>
                                        </div>
                                    </div>

                                    <div className="block">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="block w-2 h-2 bg-green-700"/>
                                                <Typography variant="small" className="text-green-600 font-semibold">Lieferung nach Hause</Typography>
                                            </div>

                                            <div>
                                                <Typography variant="small" className="text-foreground font-semibold">
                                                    + 0,– €
                                                </Typography>
                                            </div>

                                        </div>
                                        <Typography variant="small" className="text-muted-foreground ">Lieferung 31.07.2025 - 02.08.2025</Typography>


                                        <div className="flex items-center ">
                                            <div className="flex items-center gap-2">
                                                <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0" y="0" width="8" height="4" fill="white" stroke="#8B4513" strokeWidth="1"/>

                                                    <rect x="0" y="4" width="8" height="4" fill="#8B4513" stroke="#8B4513" strokeWidth="1"/>
                                                </svg>
                                                <Typography variant="small" className="text-[#8B4513] font-semibold">Abholung</Typography>
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <Typography variant="small" className="text-muted-foreground ">Bitte wähle einen Markt aus&nbsp;</Typography>
                                            <Typography variant="small" className="text-muted-foreground cursor-pointer font-semibold ">Markt auswählen</Typography>
                                        </div>

                                        <div className=" mt-4 border-t border-border"></div>


                                    </div>
                                </div>
                            </div>


                        </div>



                        {/* Refurbished purchase option with collapsed and expanded states */}

                        <div className={`w-full h-auto border rounded-xl ${!isNewProductClicked  ? "border-primary border-2" : "border-border" } mb-2 hover:border-muted-foreground/40 `}>

                            <div className={`p-5 ${isNewProductClicked ? "block" : "hidden" }`} >

                                <div className="flex mb-5 "
                                     onClick={()=>setNewProductClicked(false)}
                                >
                                    <div className="flex items-center justify-between">
                                        <label
                                            className=" group block mr-2  cursor-pointer shadow-sm shadow-slate-950/5 relative h-5 w-5 shrink-0 rounded-full
                                 border border-slate-200 transition-all duration-200 ease-in
                                 hover:shadow-md data-[checked=true]:bg-slate-800 data-[checked=true]:border-slate-800
                                text-slate-950"
                                            data-value=":R5H1:"
                                            data-checked={!isNewProductClicked}
                                            htmlFor="radio-description-html">
                                            <input
                                                id="radio-description-html"
                                                type="radio"
                                                className="hidden"
                                                value=":R5H1:"/>
                                            <span
                                                className="pointer-events-none absolute left-2/4 top-2/4 text-current -translate-x-2/4 -translate-y-2/4
                                scale-75 opacity-0 transition-all duration-200 ease-in group-data-[checked=true]:scale-100 group-data-[checked=true]:opacity-100">
                                       <img src={Icons.radiobutton_dot} alt={""}/>
                                    </span>
                                        </label>
                                    </div>


                                    <label  htmlFor="radio-description-html" className="shrink-0 relative w-full cursor-pointer">
                                        <Typography variant="h6" className="text-green-500">
                                            Refurbisched Produkte
                                        </Typography>
                                    </label>
                                </div>

                                <div className="">
                                    <div className="flex justify-between">
                                        <div className="mb-2">
                                            <div>
                                                <Typography variant="h5" className="font-bold">
                                                    von Unternehmen X
                                                </Typography>
                                            </div>
                                            <div className="flex ">
                                                <p className="underline text-sm">Zum Impressum</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div>
                                                <Typography className="font-bold flex justify-end">
                                                    576,89 €
                                                </Typography>
                                            </div>
                                            <div className="flex justify-end ">
                                                <p className="underline text-sm justify-end">inkl. MwSt. versandkostenfrei</p>
                                            </div>
                                        </div>


                                    </div>




                                    <div className="block">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="block w-2 h-2 bg-green-700"/>
                                                <Typography variant="small" className="text-green-600 font-semibold">Lieferung nach Hause</Typography>
                                            </div>

                                            <div>
                                                <Typography variant="small" className="text-foreground font-semibold">
                                                    + 0,– €
                                                </Typography>
                                            </div>

                                        </div>
                                        <Typography variant="small" className="text-muted-foreground ">Lieferung 31.07.2025 - 02.08.2025</Typography>
                                    </div>
                                </div>

                            </div>
                            <div className={`p-5 ${isNewProductClicked ? "hidden" : "block" }`}>

                                <div className="flex mb-5 "
                                     onClick={()=>setNewProductClicked(false)}
                                >


                                    <div className="flex items-center justify-between">

                                        <Radio  sx={{
                                            color: "hsl(var(--foreground))",
                                            "&.Mui-checked": {
                                                color: "hsl(var(--primary))",
                                            }

                                        }} checked={!isNewProductClicked}/>

                                        <label  htmlFor="radio-description-html" className="shrink-0 relative w-full cursor-pointer">
                                            <Typography className="font-bold">
                                                Wähle ein refurbished Zustand aus:
                                            </Typography>
                                        </label>
                                    </div>


                                </div>

                                <div className="">

                                    {/* Condition selector */}
                                    <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-3">

                                        <div
                                            onClick={()=>setDevicecondition(0)}
                                            className={`w-full p-5 grid-flow-col grid-row-2 border hover:border-muted-foreground/40  ${devicecondition === 0 ? "border-primary border-2" : "border-border" } items-center text-center 
                                                cursor-pointer  transition ease-out duration-700
                                                
                                                `}>
                                            <div className="">
                                                {deviceConditionList.Excellent}
                                            </div>

                                            <Typography className="font-bold">
                                                999 €
                                            </Typography>

                                        </div>

                                        <div
                                            onClick={()=>setDevicecondition(1)}

                                            className={`w-full p-5 grid-flow-col grid-row-2 border hover:border-muted-foreground/40  ${devicecondition === 1 ? "border-primary border-2" : "border-border" } items-center text-center 
                                                cursor-pointer  transition ease-out duration-700
                                                
                                                `}>
                                            <div className="">
                                                {deviceConditionList.Very_Good}
                                            </div>

                                            <Typography className="font-bold">
                                                750 €
                                            </Typography>

                                        </div>

                                        <div
                                            onClick={()=>setDevicecondition(2)}
                                            className={`w-full p-5 grid-flow-col grid-row-2 border hover:border-muted-foreground/40  ${devicecondition === 2 ? "border-primary border-2" : "border-border" } items-center text-center 
                                                cursor-pointer  transition ease-out duration-700
                                                
                                                `}>
                                            <div className="">
                                                {deviceConditionList.Good}
                                            </div>

                                            <Typography className="font-bold">
                                                550 €
                                            </Typography>

                                        </div>


                                    </div>
                                    <div>
                                        <Typography variant="small">
                                            Verkauf und Versand durch von
                                        </Typography>
                                    </div>


                                    <div className="flex justify-between">
                                        <div className="mb-2">
                                            <div>
                                                <Typography variant="h5" className="font-bold">
                                                    Unternehmen X geprüft
                                                </Typography>
                                            </div>
                                            <div className="flex ">
                                                <p className="underline text-sm">Zum Impressum</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div>
                                                <Typography className="font-bold flex justify-end">
                                                    576,89 €
                                                </Typography>
                                            </div>
                                            <div className="flex justify-end ">
                                                <p className="underline text-sm justify-end">inkl. MwSt. versandkostenfrei</p>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="flex gap-2">
                                        <div>
                                            <Typography  className="text-green-600 font-bold">
                                                Refurbished:
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography className="text-green-600 font-bold">
                                                {devicecondition === 0 ? deviceConditionList.Excellent
                                                    : devicecondition === 1 ? deviceConditionList.Very_Good
                                                        : devicecondition === 2 ? deviceConditionList.Good : " "
                                                }
                                            </Typography>
                                        </div>
                                    </div>



                                    {/* Condition details */}
                                    <div className="w-full h-auto rounded-xl bg-secondary p-4 text-secondary-foreground">

                                        <Typography className="font-bold" variant="h6" >
                                            Zustand : {
                                            devicecondition === 0 ? deviceConditionList.Excellent
                                                : devicecondition === 1 ? deviceConditionList.Very_Good
                                                    : devicecondition === 2 ? deviceConditionList.Good : " "
                                        }
                                        </Typography>


                                        <div className="mt-5 ">
                                            <div className="flex">
                                                <Typography className="inline" variant="paragraph">
                                                    Gebrauchtes Gerät in {" "}
                                                    <span className="font-bold">
                                                             {
                                                                 devicecondition === 0 ?  "\u00A0ausgezeichnetem Zustand."
                                                                     : devicecondition === 1 ? "\u00A0sehr gutem Zustand mit minimalen Gebrauchsspuren."
                                                                         : devicecondition === 2 ? "\u00A0gutem Zustand." : " "
                                                             }
                                                       </span>
                                                </Typography>

                                            </div>




                                            <div className="flex">

                                                <Typography className="inline font-bold" variant="paragraph">
                                                    Funktionsfähigkeit: {" "}
                                                    <span className="font-normal">
                                                           voll funktionsfähig.
                                                       </span>
                                                </Typography>

                                            </div>


                                            <div className="flex">
                                                <Typography className="inline font-bold " variant="paragraph">
                                                    Gehäuse:

                                                    <span className="font-normal">

                                                         {
                                                             devicecondition === 0 ?  "\u00A0 Keine Kratzer oder Abnutzung auf Armlänge sichtbar."
                                                                 : devicecondition === 1 ? "\u00A0Minimale Kratzer oder Gebrauchsspuren, die bei Armlänge sichtbar sein können."
                                                                     : devicecondition === 2 ? "\u00A0Gerät kann sichtbare Kratzer und Dellen aufweisen." : " "
                                                         }
                                                       </span>
                                                </Typography>

                                            </div>

                                            <div className="flex">
                                                <Typography className="inline font-bold " variant="paragraph">
                                                    Display:

                                                    <span className="font-normal">

                                                         {
                                                             devicecondition === 0 ?  "\u00A0 Keine Kratzer."
                                                                 : devicecondition === 1 ? "\u00A0 Feinste Mikrokratzer, bei eingeschaltetem Display nicht sichtbar."
                                                                     : devicecondition === 2 ? "\u00A0 Feine Mikrokratzer, nicht sichtbar, wenn das Display eingeschaltet ist." : " "
                                                         }
                                                       </span>
                                                </Typography>

                                            </div>

                                            <div className="flex">
                                                <Typography className="inline font-bold " variant="paragraph">
                                                    Batteriestatus:

                                                    <span className="font-normal">

                                                         {
                                                             devicecondition === 0 ?  "\u00A0  Mind. 90% der ursprünglichen Batterielebensdauer."
                                                                 : "\u00A0Mind. 85% der ursprünglichen Batterielebensdauer.\n"
                                                         }
                                                       </span>
                                                </Typography>

                                            </div>

                                            <div className="flex mt-2">
                                                <Typography className="inline font-bold " variant="paragraph">
                                                    Lieferumfang:

                                                    <span className="font-normal">
                                                        Gerät und Ladekabel.
                                                       </span>
                                                </Typography>

                                            </div>

                                            <div className="flex">
                                                <Typography className="inline font-bold " variant="paragraph">
                                                    Verpackung:

                                                    <span className="font-normal">
                                                        Originale Verpackung oder neutral umverpackt.
                                                       </span>
                                                </Typography>

                                            </div>

                                            <div className="flex mt-2">
                                                <Typography className="inline font-bold " variant="paragraph">
                                                    Hinweis:

                                                    <span className="font-normal">
                                                        Technische Herstellerdaten können im Einzelfall abweichen und
                                                           hängen von den durch unsere Verkäufer verwendeten (Original-)Ersatzteilen
                                                           im Refurbishing-Prozess ab. Es gelten die gesetzlichen Gewährleistungsrechte.
                                                       </span>
                                                </Typography>

                                            </div>

                                        </div>


                                    </div>

                                    <div className="block mt-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="block w-2 h-2 bg-green-700"/>
                                                <Typography variant="small" className="text-green-600 font-semibold">Lieferung nach Hause</Typography>
                                            </div>

                                            <div>
                                                <Typography variant="small" className="text-foreground font-semibold">
                                                    + 0,– €
                                                </Typography>
                                            </div>

                                        </div>
                                        <Typography variant="small" className="text-muted-foreground ">Lieferung 31.07.2025 - 02.08.2025</Typography>
                                    </div>
                                </div>

                            </div>




                        </div>

                        <div className=" mt-4 mb-4 border-t border-border "></div>

                        <div className="w-full bg-secondary text-secondary-foreground h-auto p-4 rounded-2xl">

                            <Typography variant="paragraph">
                                MyTemplate wählt für Dich das beste Angebot aus, indem Erscheinungsbild, Preis, technischer
                                Zustand, Zubehör und Verkäuferbewertung berücksichtigt werden. Von MyTemplate
                                angebotene Produkte können bei anderen Verkäufern zu einem günstigeren Preis erhältlich sein.
                            </Typography>

                            <Typography className="font-bold mt-4 cursor-pointer">
                                Weitere neue und Refurbished-Produkte
                            </Typography>

                        </div>

                        <div className="m-5 flex flex-col gap-2 sm:flex-row">
                            <Button
                                disabled={isTimeOutOn}

                                onClick={handleAddToCart}
                                className="flex-[70%] rounded-none bg-primary p-2 text-primary-foreground hover:bg-brand-700 disabled:opacity-60">

                                {isTimeOutOn ?
                                    (   <div className="">
                                        <CircularProgress thickness={5.6} size={20} sx={{
                                            color: "hsl(var(--primary-foreground))"
                                        }}/>
                                    </div>)
                                    :
                                    <div className="flex items-center justify-center gap-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 6h2l1.2 6h9.6l1.2-4H9" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                                            <circle cx="10" cy="20" r="1.5" fill="#fff"/>
                                            <circle cx="18" cy="20" r="1.5" fill="#fff"/>
                                            <line x1="15" y1="3" x2="15" y2="9" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                                            <line x1="12" y1="6" x2="18" y2="6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>

                                        <div className="text-white">
                                            <Typography>
                                                in den Warenkorb
                                            </Typography>
                                        </div>
                                    </div>
                                }
                            </Button>

                            <Button className="flex items-center justify-center rounded-none border-2 border-border bg-card p-2 text-card-foreground hover:bg-accent">
                                <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 21s-6-4.35-9-8.36C.9 9.4 2.7 5.5 6.3 5.5c1.98 0 3.3 1.44 3.7 2.14.4-.7 1.72-2.14 3.7-2.14 3.6 0 5.4 3.9 3.3 7.14-3 4.01-9 8.36-9 8.36z"
                                          stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Button>

                        </div>


                    </div>


                </div>
            </CardBody>
        </Card>
    </div>)
    return (
        <Content/>
    );
}
