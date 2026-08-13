"use client"

//Logo to the left, search button in the middle , market search (dropdown ? ), Login and Basketkorb logo

import {Typography} from "@material-tailwind/react";

//Icons
import {NavArrowDown, Xmark} from "iconoir-react";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import KontoübersichtIcon from '@mui/icons-material/DatasetOutlined';
import WishlistOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AbonnementOutlinedIcon from '@mui/icons-material/CachedOutlined';
import CouponsOutlinedIcon from '@mui/icons-material/SellOutlined';
import ProfileOutlinedIcon from '@mui/icons-material/Person2Outlined';

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';


import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Drawer,Menu, MenuItem, Divider} from '@mui/material';
import router, {useRouter} from "next/navigation";
//Import Functions

//SearchBar
import  SearchBar from "./Search_bar"

//Event
//import {eventBus} from "../../methods/event/eventBus.tsx"
import {cart_count_observer} from "@/providers/patterns/beobachter";


import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";


//Logo
const Logo = "/icons/company_logo/template_logo.svg";
//ButtonIcons
const buttonIcons = {
    Profile_Icon : "/icons/topBar_icons/profile_icon.svg",
    ShoppingCart_Icon : "/icons/topBar_icons/shopping_cart_icon.svg",
     Favourite_Icon : "/icons/topBar_icons/favourite_icon.svg"
}


//ROUTES
import {ROUTES} from "@/lib/Routes/routes";
import {check_session} from "@/lib/api/session_api";


const Search_Placeholder = "Was suchst Du?";


function company_Logo({navigate}: {navigate: AppRouterInstance}) {


    return (
        <div
            onClick={()=>navigate.push("/")}
            className="w-full   ml-10 mr-5 flex flex-wrap p-2  justify-center cursor-pointer">
            <img className="w-12 h-12 flex object-contain " src={Logo} alt="Company Logo"/>
        </div>

    );
}






const Drop_down = ({navigate,inAnchor,setInAnchor}:{navigate:AppRouterInstance, inAnchor: HTMLElement | null ,setInAnchor:React.Dispatch<SetStateAction<HTMLElement| null>>})=>{
    const open = Boolean(inAnchor);
    const onClose = ()=>setInAnchor(null);


    const Menus = [
        {
            name:"Kontoübersicht",
            icon: <KontoübersichtIcon/>,
            link: "/"
        },
        {
            name:"Meine Kaüfe",
            icon: <ShoppingBagOutlinedIcon/>,
            link: "/"
        },
        {
            name:"Meine Wünschliste",
            icon: <WishlistOutlinedIcon/>,
            link: "/"
        },

        {
            name:"Meine Abonnement",
            icon: <AbonnementOutlinedIcon/>,
            link: "/"
        },
        {
            name:"Meine Coupons",
            icon: <CouponsOutlinedIcon/>,
            link: "/"
        },

        {
            name:"Mein Profile",
            icon: <ProfileOutlinedIcon/>,
            link: "/myaccount/profile"
        },

        {
            name:"Ausloggen",
            icon: <LogoutOutlinedIcon/>,
            link: "/myaccount/auth/login"
        },

    ]


    return (
        <div className="">
            <Menu
                className="mt-1 pt-0" open={open} onClose={onClose} anchorEl={inAnchor}>
                <MenuItem className="w-[250px]"  sx={{
                    backgroundColor: "#e0e0e0",
                }}  onClick={()=>navigate.push("/myaccount/profile")}>
                    <div className="block">
                        <Typography className="text-[20px] font-bold">
                            Mein Konto
                        </Typography>

                        <Typography className="text-[10px]">
                            MUSTER MANN
                        </Typography>
                    </div>
                </MenuItem>



                {Menus.map((menuItem, index) => {
                    const isLast = index === Menus.length - 1;

                    return ([
                        isLast && <Divider key={`d-${index}`} className="mx-5 my-2" />,
                            <MenuItem key={`Mn-${index}`}
                                      className="w-[250px]"
                                      onClick={() => {
                                          navigate.push(menuItem.link);
                                          onClose();
                                      }}
                            >
                                {menuItem.icon && <span className="mr-2.5">{menuItem.icon}</span>}
                                {menuItem.name}
                            </MenuItem>

                ]

                    );
                })}

{/*




                <MenuItem className="w-[250px]" onClick={()=>navigate.push("/myaccount/profile")}>
                    <KontoübersichtIcon className="mr-2.5"/> Kontoübersicht
                </MenuItem>

                <MenuItem className="w-[250px]" onClick={()=>navigate.push("/myaccount/profile")}>
                    <ShoppingBagOutlinedIcon className="mr-2.5"/> Meine Käufe
                </MenuItem>






                <div className="ml-5 mr-5 mt-2 mb-2">
                    <Divider/>
                </div>

                <MenuItem onClick={()=>navigate.push("/myaccount/auth/login")}>
                    <LogoutOutlinedIcon className="mr-2.5"/> Ausloggen
                </MenuItem>*/}
            </Menu>
        </div>
    )
}



function TemporaryDrawer({open,setOpen,toggleDrawer}:{open:boolean, setOpen:(value:boolean| ((perv:boolean)=>boolean)) => void, toggleDrawer:(newOpen:boolean)=>()=>void})    {



    const DrawerList = (
        <div className="w-[500px] p-5">
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <Typography variant={"h5"}>
                        Markt auswählen
                    </Typography>
                    <div>
                        <Xmark className="cursor-pointer" onClick={() => setOpen(false)}/>
                    </div>
                </div>

                <Typography className="mt-5" variant={"paragraph"}>
                    Bitte gib deine Postleitzahl oder Stadt ein, um Märkte in deiner Nähe anzuzeigen. Dadurch kannst du die Produktverfügbarkeit im Markt überprüfen.
                </Typography>

                <SearchBar placeHolder={"PLZ/Stadt"}/>


            </div>

        </div>
    );

    return (
        <div>
            <Drawer  anchor={"right"} open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}


function Toggle_Drawer ({open,setOpen}: {open:boolean, setOpen:(value:boolean| ((perv:boolean)=>boolean)) => void}) {
    // const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);


    return (
        <TemporaryDrawer setOpen={setOpen} open={open} toggleDrawer={toggleDrawer}/>
    )
}


/*function searchBar(){
    return (

        //50% width
        <div className=" inline-block w-[calc(100%-50%)] ">
            <div className="relative  flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                     className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                    <path fillRule="evenodd"
                          d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                          clipRule="evenodd"/>
                </svg>

                <input className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border
            border-slate-200 rounded-md pl-10 pr-3 py-2
            transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300
            shadow-sm focus:shadow"
                    //Placeholder text
                       placeholder={Search_Placeholder}
                />

                <button className="rounded.nd bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all
                                shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700
                                active:shoadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                    Suchen
                </button>

            </div>

            <span></span>
        </div>
    );

}*/


function Search_for_Store_location(){

    const [open, setOpen] = useState(false);


    return (

        <div
            onClick={()=>{
                setOpen(!open);
            }}
            className="flex flex-row hover:opacity-75 cursor-pointer">
            <div className="flex flex-col text-white">
                <Typography variant="h6" >Markt Auswählen</Typography>
                <Typography className="text-[10px]">Markt Auswählen</Typography>
                <Toggle_Drawer open={open} setOpen={setOpen}/>
            </div>
            <NavArrowDown/>
        </div>
    )
}

const ICONS = ["/icons/topBar_icons/profile_icon.svg",
    "/icons/topBar_icons/favourite_icon.svg","/icons/topBar_icons/shopping_cart_icon.svg"];



const Icon_button_group = ()=>{
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const [cartCounter, setCartCounter] = useState<number>(0);
    const [anchorEl, setAnchorEl] = useState<HTMLElement|null>(null);


    const on_my_account_click = (event: React.MouseEvent<HTMLButtonElement>)=>{
        setAnchorEl(event.currentTarget);
    }



    const update_counter = ()=>{
        getCheckout_Badge_Counter().then((v)=>{
            setCartCounter(v);
            console.log("Called and updated");
        });
    }





    useEffect(()=>{

        check_session().then(v=>setIsLoggedIn(v));

            getCheckout_Badge_Counter().then((v)=>{
            setCartCounter(v);
            cart_count_observer.subscribe(update_counter);

        });

    },[cartCounter])


    function handle_my_profile_click (e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
        if(isLoggedIn)
            on_my_account_click(e);
        else
            router.push(ROUTES.LOGIN ?? ROUTES.NOT_FOUND ?? "/not-found" );
    }

    return (
        <div className="ml-5 space-x-4 border-0  inline-block  flex-1  mr-2 ">
            {ICONS.map((item,index)=>{
                return (
                    <div
                        key={index}
                        className="relative inline-flex">
                        <div className="">
                            <button
                                onClick={(e)=>{
                                    switch (index) {
                                        case 0:
                                            handle_my_profile_click(e);
                                            //router.push(ROUTES.MY_PROFILE);
                                            break;
                                            case 1:
                                                break;
                                        case 2:
                                            router.push(ROUTES.CHECKOUT_CART)
                                            break;

                                        default:
                                            router.push(ROUTES.HOME);
                                            break;
                                    }


                                 /*   if(index === ICONS.length-1){
                                        router.push(ROUTES.CHECKOUT_CART)
                                    }*/
                                }}

                                className="inline-grid min-h-[36px] min-w-[36px] select-none place-items-center rounded-md  bg-white text-center align-middle font-sans text-sm font-medium leading-none text-slate-800
                          transition-all duration-300 ease-in  hover:bg-slate-100">

                                <img className="bg-white" src={item} alt={""}/>
                            </button>
                        </div>


                        {/*DropdownMenu*/}
                        <Drop_down navigate={router} inAnchor={anchorEl} setInAnchor={setAnchorEl}/>

                        {/*Indicator*/}
                        { index != 0 && cartCounter &&
                            <span
                                className={'absolute right-[6%] top-[6%] grid min-h-[10px] min-w-[10px] -translate-y-1/2 translate-x-1/2 place-items-center rounded-full border-none ' +
                                    `bg-purple-500 px-1 py-0.5 text-xs leading-none text-white ${cartCounter !== 0 ? "block" : "hidden"}`}>{cartCounter}</span>
                        }
                    </div>

                    /*     <button
                             onClick={()=>{
                                 if(index === ICONS.length-1){
                                         navigate("/checkout")
                                 }
                             }}
                             className="bg-white border p-1 rounded-sm hover:opacity-75 cursor-pointer">
                         <img className="bg-white" src={item}/>
                     </button>*/




                )

            })}
        </div>


    )
}


//TODO ADD BADGE ICON
async function getCheckout_Badge_Counter():Promise<number>{
    try {
        const res = await fetch("/api/badges/top_bar_checkout_items_count_badge/GET", {
            method: "POST",
            headers: {

                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const items_count = await res.json();
        return items_count.data;


    }catch(error){
        console.error(error);
        return 0;
    }
}

export default function Top_bar_layout() {
    const router = useRouter();

/*
    useEffect(() => {
        if(cartCounter)
            return;

        console.log("top bar ref");
        getCheckout_Badge_Counter().then((v)=>{
            setCartCounter(v);
            setCartCounterIni(true);
        });
    }, [cartCounter]);*/



    return (
        <div className="w-full bg-[#CC291F] ">
            <div className="max-w-[1400px] mx-auto ml-auto mr-auto grid grid-cols-10 p-2 w-full bg-[#CC291F] h-max-12 gap-2  items-center justify-center">

              {/*  <div className="col-span-2 bg-purple-500">
                    ds
                </div>

                <div className="col-span-1">
                    ds
                </div>

                <div className="col-span-1 ">
                    ds
                </div>
                <div className="col-span-1 ">
                    ds
                </div>*/}
                 <div className="flex col-span-1  ">
                {company_Logo({navigate: router})}
            </div>
            <div className="flex col-span-5 justify-center items-center">
                {SearchBar({placeHolder: Search_Placeholder})}

            </div>

            <div className="flex col-span-2 justify-center items-center ">
                {Search_for_Store_location()}
            </div>

            <div className="flex col-span-2 justify-center items-center">
                {<Icon_button_group/>}
            </div>
            </div>
        </div>
    )

}


