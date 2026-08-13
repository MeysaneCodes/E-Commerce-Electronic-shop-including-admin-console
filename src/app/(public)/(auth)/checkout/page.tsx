"use client"

import {
    Button,
    Card,
    CardBody, CardFooter,
    Collapse,
    Typography
} from "@material-tailwind/react";


//CartMethod
import {GetCart, DeleteCartItem, UpdateCart} from "@/lib/api/cart_api"

//CartStructure
import {CartItem, CartPrices} from "@/types/cart_types"

//ICONS
import {Circle, Trash, Plus, Minus, InfoCircle, NavArrowDown} from "iconoir-react";
const Icons = {
     check_icon : "/icons/check.svg",
//Checkout icons
     GoodService_icon : "/icons/Checkout_Icons/Check_shield.svg",
     ReturnProduct_icon : "/icons/Checkout_Icons/Return_Product.svg",
     PickupProduct_icon : "/icons/Checkout_Icons/Market_Symbole.svg",
     FasterDelivery_icon : "/icons/Checkout_Icons/Fast_delivery.svg",
     GratisDelivery_icon : "/icons/Checkout_Icons/Delivery.svg",
    //Empty Checkout Imae
     EmptyCheckoutIcon : "/icons/Checkout_Icons/emptyCheckout.png",
     ApplePayLogo : "/icons/apple_pay_logo/apple_pay.svg",
//Exemplar Product Image
     IPHONE_Black_Back : "../../assets/test_images/IPhone_16_pro_max_back.png",
     info_Icon : "/icons/info_icon.svg",
}






import {Dispatch, SetStateAction, useEffect, useState} from "react";

//Pattern
import {cart_count_observer} from "@/providers/patterns/beobachter";
//import {eventBus} from "../../methods/event/eventBus.tsx";

import ToolTip_ui from "@/components/ui/Tooltip/tooltip";


//ADAPTER
import FetchTimeout from "@/utils/timeout";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {CircularProgress} from "@mui/material";
import {check_session} from "@/lib/api/session_api";






const pad = (n:number)=> {
    return n.toString().padStart(2,"0");
}




const Products_List = ({initialItems, setCartItems, setCartPrices,
                           setCartLoading,isCartLoading ,startLoadingTimer, setIsCartEmpty}:
                       {initialItems:object[], setCartItems:Dispatch<SetStateAction<object[]>>,
                           setCartPrices?:Dispatch<SetStateAction<CartPrices>>,
                           setCartLoading:Dispatch<SetStateAction<boolean>>,
                           isCartLoading:boolean,startLoadingTimer: ()=>void, setIsCartEmpty: Dispatch<SetStateAction<boolean>>})=>{



    //TODO if selector changes, block page then refresh everything


    //If the counter changes, we update the price in DB and Qty

    const CartRow = ({Pr, index}: {Pr:CartItem, index:number})=>{
        const [counter, setCounter] = useState<number>(Pr.qty)
        const [originalPrice, setOriginalPrice] = useState<string>("");
        const [listedPrice, setListedPrice] = useState<string>("");


        const discount = !!(Pr.discounts?.length && Pr.discounts?.length > 0);

        useEffect(()=>{

            const formatePrice = (inPrice:number)=>{
                return Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(inPrice);
            }

            setOriginalPrice(formatePrice(Pr.unitPrice ?? 0));
            setListedPrice(formatePrice(Pr.listPrice ?? 0));








        }, [originalPrice, listedPrice, Pr.unitPrice, Pr.listPrice, counter])



        return (

            <div>
                {isCartLoading && (<div className={`fixed inset-0 w-full h-full z-50 bg-gray-50 opacity-40 flex items-center justify-center`}>
                    <span className="loading loading-ring loading-lg w-25 h-25 bg-red-500 text-black"></span>
                </div>)}
                <div className="mt-5">

                    <Card key={index}  className="h-[400px] border-2 border-gray-400">
                        <CardBody className="">
                            {/*Cols*/}
                            <div className="w-full  grid grid-cols-10 ">
                                {/*Product Image*/}
                                <div className="w-full h-full flex items-center justify-center  col-span-4 ">
                                    <Image  width={150} height={150} src={Pr.imageUrl ?? ""} alt={""}/>
                                </div>
                                {/*Product Title*/}

                                <div className="col-span-5 p-3">
                                    <div className=" font-bold line-clamp-2">
                                        {Pr.title}
                                    </div>
                                    {/*Product Price*/}


                                    {/*Discount section if activated*/}
                                    {discount && Pr.discounts && (<div className="flex gap-2 justify-start">
                                        <p className="bg-red-500 text-white text-xs p-1">{(()=>{
                                            //       console.log("disco" + isDiscount)
                                            if(Pr.discounts[0].type === "PERCENTAGE"){
                                                return `- ${Pr.discounts[0].amount} %`
                                            } else if(Pr.discounts[0].type=== "AMOUNT"){
                                                return `- ${Pr.discounts[0].amount} €`
                                            }
                                        })()}</p>
                                        <p className="text-xs p-1 line-through"> UVP {originalPrice}</p>
                                        <div className="flex  ">

                                            <ToolTip_ui imgIndicator={Icons.info_Icon}
                                                        alt_text={"Gesponserte Produkte"}
                                                        contentText={"  Der hier angezeigte Preis ist die unverbindliche Preisempfehlung des Herstellers."}
                                                        toolTipPos={"tooltip-bottom"}/>
                                        </div>

                                    </div>)
                                    }


                                    {/*Product Price*/}
                                    <div>
                                        <p className="text-4xl font-bold text-black flex justify-start">
                                            {listedPrice}
                                        </p>

                                        {counter > 1 &&

                                            <div>
                                                <Typography className={"text-[12px]"}>
                                                    Stückpreis: ${99.99}
                                                </Typography>
                                            </div>

                                        }
                                    </div>

                                    <div className="w-full grid grid-cols-2 mt-5">
                                        <div className="flex gap-1 w-full justify-center items-center  ">
                                            <Circle  fill="green" className="w-[10px] h-[10px] " />
                                            <Typography className="text-[11px] font-bold">
                                                Lieferung nach Hause
                                            </Typography>
                                        </div>


                                        <div className="flex gap-1 w-full justify-center items-center  ">
                                            <Circle  fill="green" className="w-[10px] h-[10px] " />
                                            <Typography className="text-[11px] font-bold" >
                                                Abholung
                                            </Typography>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="h-auto inline-flex grid-cols-3 gap-4 mt-3 rounded-md  border-2 border-gray-500">
                                            <div className="p-2 hover:opacity-50 hover:bg-gray-300">
                                                <Minus  onClick={()=>{
                                                    if(counter <= 1){
                                                        setCartLoading(true);
                                                        DeleteCartItem({item: Pr}).then((response) => {
                                                            setIsCartEmpty(response.isCartDeleted ?? false);

                                                            GetCart({setCartItems:setCartItems, setCart_prices:setCartPrices}).then(()=>startLoadingTimer());
                                                            cart_count_observer.notify();

                                                        });
                                                        //Remove if more
                                                        return;
                                                    }else{
                                                        setCounter((prev)=>{
                                                            const newValue = prev -1;
                                                            setCartLoading(true);
                                                            UpdateCart({item:Pr, Qty: newValue, directional:"-"}).then(()=>{
                                                                GetCart({setCartItems:setCartItems, setCart_prices:setCartPrices}).then(()=> startLoadingTimer());
                                                                cart_count_observer.notify();
                                                            });
                                                          //  eventBus.emit();

                                                            return newValue;
                                                        })
                                                    }

                                                }}/>
                                            </div>
                                            <Typography className="p-2">
                                                {counter}
                                            </Typography>
                                            <div className="p-2 hover:opacity-50 hover:bg-gray-300">
                                                <Plus onClick={()=> {

                                                    if(counter >= 4){
                                                        return;
                                                    }else{
                                                        setCounter((prev)=>{
                                                            const newValue = prev +1;

                                                            //SET Loading Circle
                                                            setCartLoading(true);
                                                            UpdateCart({item:Pr, Qty: newValue, directional:"+"}).then(()=>{
                                                                //to re render the component and show the actual price
                                                                GetCart({setCartItems:setCartItems, setCart_prices:setCartPrices}).then(()=>startLoadingTimer());
                                                                cart_count_observer.notify();
                                                            });


                                                          //  eventBus.emit();
                                                            return newValue;
                                                        })
                                                    }
                                                }}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/*Delete Icon*/}

                                <div className="w-full col-span-1  p-3 flex justify-center items-start stroke-1">
                                    <Button
                                        onClick={()=>{
                                            //Delete_Items(0)
                                            setCartLoading(true);
                                            DeleteCartItem({item: Pr}).then((response) => {
                                                setIsCartEmpty(response.isCartDeleted ?? false);
                                                GetCart({setCartItems:setCartItems, setCart_prices:setCartPrices}).then(()=>startLoadingTimer());
                                                cart_count_observer.notify();
                                            });
                                        }}
                                        type="button" className="w-auto p-2 hover:opacity-50 bg-white hover:bg-gray-200 border-2"
                                    >
                                        <Trash color={"black"}/>
                                    </Button>
                                </div>
                            </div>
                        </CardBody>

                        <CardFooter>
                            <div className="mt-3">
                                <Typography className=" flex font-bold gap-2" variant={"h6"} >
                                    Schütze dein Gerät
                                    <InfoCircle className="w-[20px]"/>
                                </Typography>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        );

    }



    return (
        <>
            { initialItems.length > 0 &&  (initialItems.map((Pr,index)=>{

                return (
                    <CartRow key={index} Pr={Pr as CartItem} index={index}/>
                )
            }))}
        </>
    );

}


/*
function FetchTimeout({setLoading, delay}: {setLoading:Dispatch<SetStateAction<boolean>>, delay:number}) {
    const timerRef = useRef<number| null>(null);


    const start = useCallback(()=>{
        if(timerRef.current)
            window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(()=>{
            console.log("timeout ended");
            setLoading(false);
            timerRef.current = null;
        }, delay);
    }, [setLoading,delay])

    return {start};
}*/







export default function Checkout_Page  (){

    //Loggin check variables
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


    //Loading variables
    const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
    //const [isItemLoading, setIsItemLoading] = useState<boolean>(false);
    const [isCartItemsLoading, setIsCartItemsLoading] = useState<boolean>(false)
    const [isCheckoutCartEmpty, setIsCheckoutCartEmpty] = useState<boolean>(true);

    //const [isCheckoutCartLoading, setIsCheckoutCartLoading] = useState<boolean>(false);

    const {start:startLoadingPage} = FetchTimeout({setLoading: setIsPageLoading, delay:300});
    const {start:startLoadingCartItems} = FetchTimeout({setLoading: setIsCartItemsLoading, delay:300});




    //Summe changes on : Loading page, changing the amount/Delete of each produckts


    //Cart Items
    const [CartItems, setCartItems] = useState<object[]>([]);
    const [cart_price, setCart_price] = useState<CartPrices>({subtotal:0, discountTotal:0, grandTotal:0, shippingTotal:0, taxTotal:0})


    const [DeliveryOptionSelected, setDeliveryOptionSelected] = useState<number>(0);

    //Details to price dropdown
    const [IsPriceDetailsDropDownOpen, setIsPriceDetailsDropDownOpen] = useState<boolean>(false);

    const now = new Date();
    const timeStr = `${pad(now.getHours()+2)}:00`;


    useEffect(()=>{

        //TODO why if else ???

        //iF we have cart item and it is not empty,
        //First run will be empty (Logic), then it gets from database then it might be empty or not


        //First Load
        setIsPageLoading(true);

        //Get/Check items on Checkout
        GetCart({setCartItems:setCartItems, setCart_prices:setCart_price}).then(()=>{
            startLoadingPage();
        });



        //Session check
        check_session().then((v)=>setIsLoggedIn(v));



    },[]);


    //Event when this variable changes
    useEffect(() => {

        if(CartItems.length === 0 || !CartItems )
            setIsCheckoutCartEmpty(true);
        else setIsCheckoutCartEmpty(false);

    }, [CartItems]);


    //setIsCheckoutCartEmpty(false)

    const  EmptyCheckOutPage = ()=>{
        const navigate = useRouter();
        const onShoppingCartEmpyMessage = [
            "In deinem Warenkorb befinden sich keine Produkte. Befülle den Warenkorb mit einem unserer Angebote.",
            "Es befinden sich keine Produkte in deinem Warenkorb. Log dich ein um Produkte in deinem Warenkorb zu sehen, die du eventuell schon hinzugefügt hast.\n",
        ];


        return(
            <div className="w-full h-screen  flex justify-center items-center">
                <div className="w-[400px] justify-center items-center ">
                    <div className="w-full  flex justify-center items-center " >

                        <img className="w-[150px] h-auto  flex justify-center items-center" src={Icons.EmptyCheckoutIcon}/>
                    </div>
                    <div className="text-center m-2">
                        <Typography  type={"h3"}>
                            Warenkorb
                        </Typography>
                    </div>
                    <div className="text-center">
                        <Typography  type={"p"}>
                            {isLoggedIn ? onShoppingCartEmpyMessage[0] : onShoppingCartEmpyMessage[1]}
                        </Typography>
                    </div>

                    <div className="p-4">
                        <Button
                            onClick={()=> navigate.push("/")}
                            className="w-full p-5 bg-red-500 text-white">
                            <Typography>
                                Weiter einkaufen
                            </Typography>

                        </Button>
                    </div>
                </div>
            </div>
        );
    }


    return(isCheckoutCartEmpty ?

            (<EmptyCheckOutPage/> )

            :


            ( isPageLoading  ? (<div className="w-full h-screen"></div>) : (<div>


                <div className="mt-10 ml-10 mr-10 mb-0">
                    <Typography variant={"h5"}>
                        Warenkorb
                    </Typography>
                    <Typography variant={"small"}>
                        Produkte im Warenkorb werden nicht reserviert
                    </Typography>
                </div>


                <div className="grid grid-cols-10 gap-2 m-10">
                    <div className="col-span-6 flex flex-row">
                        <div className="w-full justify-center items-center  ">
                            <div className="bg-white flex flex-row p-10  rounded-lg">
                                <div className="w-full flex flex-[60%] ">
                                    <div>
                                        <Typography className="font-bold flex gap-2">
                                            <img alt={""}  src={Icons.check_icon}/>
                                            Marktabholung heute ab {timeStr}
                                        </Typography>

                                        <Typography className="mt-3" variant={"small"}>
                                            MyTemplate City
                                        </Typography>
                                        <Typography className="mt-3 font-bold" variant={"small"}>
                                            Markt ändern
                                        </Typography>
                                    </div>

                                    <div>
                                    </div>
                                </div>

                                <div className="w-full flex flex-[40%] bg-yellow-100">
                                    -
                                </div>
                            </div>

                            <Products_List setCartPrices={setCart_price} setCartItems={setCartItems}
                                           initialItems={CartItems}
                                           startLoadingTimer={startLoadingCartItems} isCartLoading={isCartItemsLoading}
                                           setCartLoading={setIsCartItemsLoading} setIsCartEmpty={setIsCheckoutCartEmpty}/>
                            <div className="w-full bg-white flex flex-col p-10 mt-5 ">
                                <Typography className=" mt-5 flex font-bold gap-2" variant={"h6"}>
                                    Wie möchtest du deine Produkte erhalten?
                                    <InfoCircle className="w-[20px]"/>
                                </Typography>


                                {/*Pick up*/}

                                <div
                                    onClick={() => setDeliveryOptionSelected(0)}
                                    className={`mt-5 w-full p-3 border   ${DeliveryOptionSelected === 0 ? "rounded-xl border-gray-800 border-2" : "rounded-lg border-gray-400 border"}`}>
                                    <div className="flex justify-between items-center]: ">
                                        <div className="flex gap-2 justify-center items-center">
                                            {<Circle fill="green" className="  w-[10px] h-[10px] "/>}
                                            <Typography className="flex font-bold">
                                                Marktabholung heute ab xx:xx Uhr
                                            </Typography>
                                        </div>
                                        <Typography>
                                            Gratis
                                        </Typography>
                                    </div>

                                    <Typography className="p-4" variant={"small"}>
                                        Deiene Artikel sind ab dem angegebenen Zeitpunkt bereit zur Abholung
                                    </Typography>
                                </div>


                                {/*Delivery Button*/}

                                <div
                                    onClick={() => setDeliveryOptionSelected(1)}
                                    className={`mt-5 w-full p-3 border   ${DeliveryOptionSelected === 1 ? "rounded-xl border-gray-800 border-2" : "rounded-lg border-gray-400 border"}`}>
                                    <div className="flex justify-between items-center]: ">
                                        <div className="flex gap-2 justify-center items-center">
                                            {<Circle fill="green" className="  w-[10px] h-[10px] "/>}
                                            <Typography className="flex font-bold">
                                                Lieferung bis Samstag, 06.01.2030
                                            </Typography>
                                        </div>
                                        <Typography>
                                            Gratis
                                        </Typography>
                                    </div>

                                    <div className="p-4">
                                        <Typography className="m" variant={"small"}>
                                            Standartdversand
                                        </Typography>
                                        <Typography className="mt-4" variant={"small"}>
                                            Abholstation verfügbar
                                        </Typography>
                                        <Typography className="mt-4" variant={"small"}>
                                            Die genaue Versandmethode kann zu einem späteren Zeitpunkt ausgewählt werden.
                                        </Typography>

                                    </div>
                                </div>

                                {/*Fast Delivery Button*/}

                                <div
                                    onClick={() => setDeliveryOptionSelected(2)}
                                    className={`mt-5 w-full p-3    ${DeliveryOptionSelected === 2 ? "rounded-xl border-gray-800 border-2" : "rounded-lg border-gray-400 border"}`}>
                                    <div className="flex justify-between items-center]: ">
                                        <div className="flex gap-2 justify-center items-center">
                                            {<Circle fill="green" className="  w-[10px] h-[10px] "/>}
                                            <Typography className="flex font-bold">
                                                Sofort-Lieferung
                                            </Typography>
                                        </div>
                                    </div>

                                    <div className="inline-flex p-2 gap-2 items-center justify-center">
                                        <div className="bg-black rounded-2xl inline-flex justify-center items-center">
                                            <Typography className="ml-2 mr-2">
                                                Uber
                                            </Typography>
                                        </div>

                                        <Typography className="" variant={"small"}>
                                            Sofort-Lieferung
                                        </Typography>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>


                    <div className=" col-span-4 bg-white rounded-lg">

                        <div className="grid grid-row-2 gap-2 p-10 ">

                            <Typography className="font-bold">
                                Zusammenfassung
                            </Typography>
                            <Typography variant={"small"} className="">
                                Aktionscodes oder Geschenkkarten können im Bezahlungsschritt hinzugefügt werden
                            </Typography>
                        </div>

                        {/*Seperator*/}

                        <div className="flex justify-center items-center">
                            <div className="w-[90%] h-[1px] divide-y bg-gray-400 ml-2 mr-2 "></div>
                        </div>


                        <div className="cursor-pointer hover:bg-gray-100 hover:rounded-2xl p-1 m-2 ">
                            <div className="m-5">
                                <div
                                    onClick={() => setIsPriceDetailsDropDownOpen(!IsPriceDetailsDropDownOpen)}
                                    className="grid grid-cols-10 gap-2 ">
                                    <div
                                        className="flex  col-span-9 justify-between">
                                        <div className="">
                                            <Typography className="font-bold">Zwischensumme</Typography>
                                        </div>

                                        <Typography className="font-bold">
                                            {Intl.NumberFormat("de-DE", {
                                                currency: "EUR",
                                                style: "currency"
                                            }).format(cart_price.subtotal ?? 0)}
                                        </Typography>
                                    </div>


                                    <div className="col-span-1">
                                        <NavArrowDown/>
                                    </div>
                                </div>
                                <Collapse className="w-full" open={IsPriceDetailsDropDownOpen} >
                                    <div className="w-full  flex justify-between p-5">
                                        <Typography>
                                            Produkte
                                        </Typography>
                                        <Typography>
                                            {Intl.NumberFormat("de-DE", {
                                                currency: "EUR",
                                                style: "currency"
                                            }).format(cart_price.subtotal ?? 0)}
                                        </Typography>
                                    </div>
                                </Collapse>

                            </div>

                        </div>
                        <div className="flex justify-between p-1 m-5">
                            <Typography className="flex gap-2">
                                Lieferkosten
                                <InfoCircle className="w-[20px]"/>
                            </Typography>

                            <Typography>
                                {cart_price.shippingTotal === 0.0 ? "Gratis" : Intl.NumberFormat("de-DE", {
                                    currency: "EUR",
                                    style: "currency"
                                }).format(cart_price.subtotal ?? 0)}
                            </Typography>
                        </div>


                        {/*Seperator*/}

                        <div className="flex justify-center items-center">
                            <div className="w-[90%] h-[1px] divide-y bg-gray-400 ml-2 mr-2 "></div>
                        </div>


                        {/*Total Price*/}
                        <div className="flex justify-between p-1 m-5">
                            <div>
                                <Typography className="font-bold">
                                    Gesamtsumme
                                </Typography>

                                <Typography className="text-[10px]">
                                    inkl. MwSt.
                                </Typography>
                            </div>

                            <Typography className="font-bold">
                                {Intl.NumberFormat("de-DE", {
                                    currency: "EUR",
                                    style: "currency"
                                }).format(cart_price.grandTotal ?? 0)}

                            </Typography>
                        </div>

                        {/*Seperator*/}

                        <div className="flex justify-center items-center">
                            <div className="w-[90%] h-[1px] divide-y bg-gray-400 ml-2 mr-2 "></div>
                        </div>

                        {/*Discount Code*/}
                        <div className="flex justify-between p-1 m-5 items-center">

                            <Typography className="font-bold">
                                Aktionscode
                            </Typography>

                            <Button className="font-bold border-2 rounded-md border-black p-2 ">
                                <Typography>
                                    Hinzufügen
                                </Typography>
                            </Button>
                        </div>

                        {/*Pay Button*/}

                        <div className="p-4">
                            <Button className="w-full p-5 bg-red-500 text-white">

                                {isCartItemsLoading ?
                                    (<CircularProgress thickness={5.6} size={20} sx={{
                                                color: "red",
                                            }}/>)
                                    // (<div><span className="loading loading-dots loading-xl"></span></div>)
                                    :
                                    (<Typography>
                                        Zur Kasse gehen
                                    </Typography>)
                                }
                            </Button>
                        </div>

                        {/*Seperator*/}

                        <div className="flex justify-center items-center">
                            <div className="w-[90%] h-[1px] divide-y bg-gray-400 ml-2 mr-2 "></div>
                        </div>

                        {/*Apple Pay*/}
                        <div>

                            <Typography className="flex justify-center items-center mt-5 ">
                                Jetzt zahlungspflichtig bestellen mit:
                            </Typography>

                            <div className="p-4">
                                <Button className="w-full flex  justify-center items-center p-5 bg-black text-white gap-1">
                                    {isCartItemsLoading ?
                                        // (<div><span className="loading loading-dots loading-xl"></span></div>)
                                       ( <CircularProgress thickness={5.6} size={20} sx={{
                                            color: "red",
                                        }}/>)

                                        :

                                        (<div className="flex justify-center items-center gap-1">
                                            <Typography variant={"h4"}>
                                                Mit
                                            </Typography>
                                            <img className="w-[25px] h-[25px] " src={Icons.ApplePayLogo}/>
                                            <Typography variant={"h4"}>
                                                Pay bezahlen
                                            </Typography></div>)

                                    }

                                </Button>
                            </div>
                        </div>

                        <div>
                            <Typography className="text-[12px] p-5">
                                Mit Klick auf den Bezahlbutton stimme ich den AGB zu. Beim Kauf eines digitalen Produkts
                                oder eines Produkts mit digitalen Elementen bestätige ich, dass Updates vom Hersteller des
                                jeweiligen Produkts bereitgestellt werden und ich mich bei diesem über die Verfügbarkeit
                                neuer Updates
                                informieren kann. Ich habe die Widerrufsbelehrung zur Kenntnis genommen. Bitte beachten Sie
                                die Datenschutzhinweise.
                            </Typography>
                        </div>

                        <div className="grid gap-y-2 p-2">
                            <div className="grid grid-cols-10">
                                <div className="col-span-1 flex justify-center items-center ">
                                    <img src={Icons.ReturnProduct_icon}/>
                                </div>
                                <div className="col-span-9">
                                    <Typography>
                                        Rückgabe in über 250 Märkten
                                    </Typography>
                                </div>
                            </div>

                            <div className="grid grid-cols-10">
                                <div className="col-span-1 flex justify-center items-center ">
                                    <img src={Icons.PickupProduct_icon}/>
                                </div>
                                <div className="col-span-9">
                                    <Typography>
                                        Online bestellen & im Markt abholen
                                    </Typography>
                                </div>
                            </div>

                            <div className="grid grid-cols-10">
                                <div className="col-span-1 flex justify-center items-center ">
                                    <img src={Icons.GoodService_icon}/>
                                </div>
                                <div className="col-span-9">
                                    <Typography>
                                        Service passend zu deinem Gerät
                                    </Typography>
                                </div>
                            </div>

                            <div className="grid grid-cols-10">
                                <div className="col-span-1 flex justify-center items-center ">
                                    <img src={Icons.GratisDelivery_icon}/>
                                </div>
                                <div className="col-span-9">
                                    <Typography>
                                        Kostenlose Lieferung ab 59€ Bestellwert
                                    </Typography>
                                </div>
                            </div>

                            <div className="grid grid-cols-10">
                                <div className="col-span-1 flex justify-center items-center ">
                                    <img src={Icons.FasterDelivery_icon}/>
                                </div>
                                <div className="col-span-9">
                                    <Typography>
                                        Sofort Lieferung in 90 Minuten möglich
                                    </Typography>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>))
    )
}






