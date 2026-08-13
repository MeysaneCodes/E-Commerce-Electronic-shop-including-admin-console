import {ROUTES} from "@/lib/Routes/routes";
import React, {SetStateAction, useCallback, useEffect, useState} from "react";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import KontoübersichtIcon from "@mui/icons-material/DatasetOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import WishlistOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AbonnementOutlinedIcon from "@mui/icons-material/CachedOutlined";
import CouponsOutlinedIcon from "@mui/icons-material/SellOutlined";
import ProfileOutlinedIcon from "@mui/icons-material/Person2Outlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {Divider, Menu, MenuItem, TextField, TextFieldVariants} from "@mui/material";
import {Typography} from "@material-tailwind/react";
import {useRouter} from "next/navigation";


//Icons
import AddIcon from '@mui/icons-material/Add';

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

                    return (

                        [isLast && <Divider key={`divider-${index}`} className="mx-5 my-2" />,
                        <MenuItem
                            key={index}
                            className="w-[250px]"
                            onClick={() => {
                                navigate.push(menuItem.link);
                                onClose();
                            }}>
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





export default function  App_bar_DropDown_Custom({button_color, leading_icon ,title}:{button_color?:string,leading_icon?:React.ReactNode, title:string}){
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const [cartCounter, setCartCounter] = useState<number>(0);
    const [anchorEl, setAnchorEl] = useState<HTMLElement|null>(null);

    const on_my_account_click = (event: React.MouseEvent<HTMLButtonElement>)=>{
        setAnchorEl(event.currentTarget);
    }


    return(
        <div className="">
            <div
                className="relative">
                <div className="">
                    <button

                        onClick={(e)=>{
                            on_my_account_click(e);
                            /*   if(index === ICONS.length-1){
                                   router.push(ROUTES.CHECKOUT_CART)
                               }*/
                        }}

                        className={`flex  max-h-[36px] p-2 place-items-center rounded-md ${button_color ? `${button_color}` : "bg-[#CC291F]" } text-center align-middle font-sans text-sm font-medium leading-none text-slate-800 ` +
                            'transition-all duration-300 ease-in  hover:opacity-50'}>
                         {leading_icon && leading_icon}  <Typography className="font-bold" variant={"small"}>{title}</Typography>
                    </button>
                </div>
                {/*DropdownMenu*/}
                <Drop_down navigate={router} inAnchor={anchorEl} setInAnchor={setAnchorEl}/>
            </div>
        </div>)
}


const Drop_down_component = ({OnClick,SelectedItem, MenuItems=["Select Category"],inAnchor,setInAnchor, VariantStyle,input_label}:{OnClick:()=>void,SelectedItem:string, MenuItems: string[], inAnchor: HTMLElement | null ,setInAnchor:React.Dispatch<SetStateAction<HTMLElement| null>>, VariantStyle:TextFieldVariants|null, input_label:string|null})=>{
    const open = Boolean(inAnchor);
    const onClose = ()=>setInAnchor(null);

    const [selectedCategory, setSelectedCategory] = useState<string>(SelectedItem);



    return (
        <TextField variant={`${VariantStyle ? VariantStyle  : "standard"}`} select label={input_label} value={selectedCategory}

                   onChange={(e)=>setSelectedCategory(e.target.value)}

                   slotProps={{
            select: {
                displayEmpty:true,
                onOpen: ()=>OnClick(),

                MenuProps: {
                    sx: {
                        zIndex: 10000,
                    },
                    PaperProps: {
                        sx: {
                            zIndex: 10001,
                        },
                    },
                },
            }
        }} className="w-full border-2">

            {MenuItems.map((menuItem, index)=>{

                return (
                    <MenuItem key={index} value={menuItem}>
                        {menuItem}
                    </MenuItem>
                )
            })}
        </TextField>
    )
}

export function  DropDown_Custom({onClick,SelectedItem, MenuItems, VariantStyle, input_label}:{onClick:()=>void,SelectedItem:string,MenuItems: string[],input_label:string|null, VariantStyle:TextFieldVariants|null}){
    const [anchorEl, setAnchorEl] = useState<HTMLElement|null>(null);

    const on_my_account_click = (event: React.MouseEvent<HTMLButtonElement>)=>{
        setAnchorEl(event.currentTarget);
    }





    return(
        <div className="">
            <div
                className="relative">
                {/*DropdownMenu*/}
                <Drop_down_component  OnClick={onClick} SelectedItem={SelectedItem} MenuItems={MenuItems} inAnchor={anchorEl} setInAnchor={setAnchorEl} VariantStyle={VariantStyle} input_label={input_label}/>
            </div>
        </div>)
}