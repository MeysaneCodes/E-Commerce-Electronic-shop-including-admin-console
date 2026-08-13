"use client"



import { NavigationMenu } from "radix-ui";
import {CaretDownIcon} from "@radix-ui/react-icons"

//Sidebar

import {
    Button,
    Typography,
    Navbar,
    List,
    ListItem,
} from "@material-tailwind/react"

    ;


import * as Tooltip from '@radix-ui/react-tooltip';

//Icons
import {
    NavArrowDown,
} from "iconoir-react"

import MenuIcon from '@mui/icons-material/Menu';



type Sections = {
    title: string;
    items: string[];
}

const sections: Sections[] = [
    { title: 'Header Title 1', items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'] },
    { title: 'Header Title 2', items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'] },
    { title: 'Header Title 3', items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'] },
    { title: 'Header Title 4', items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'] },
    { title: 'Header Title 5', items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'] },
    { title: 'Header Title 6', items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'] },
]


const Categories = ["Computer & Büro", "TV & Audio", "Smartphone & Tarife", "Haushalt & Wohnen", "Gaming & VR","Computer & Büro", "Haushalt & Wohnen", "Gaming & VR","Gaming & VR","Gaming & VR","Computer & Büro", "Haushalt & Wohnen", "Gaming & VR","Gaming & VR"]







const MenuItem_Custom = ({ label }: { label: string }) => (
    <a
        href="#"
        className="block  text-left m-1 hover:text-green-600 transition-colors"
    >
        {label}
    </a>
);
export default function Nav_bar_layout(){

    return (
        <div className="w-full bg-[#CC291F]">
            <div className="max-w-[1400px] w-full  mx-auto  flex items-center flex-row gap-5 p-2  overflow-x-auto overflow-y-hidden scrollbar-hide  whitespace-nowrap">
                <Button  className="max-h-10 max-w-28 p-1 m-0 bg-white text-black inline-flex flex-row gap-2 items-center shrink-0"> <MenuIcon/> <Typography className="font-bold" variant={"small"}>Menü</Typography></Button>
                {Categories.map((value,index)=>{
                    return (
                        <Typography className="text-white whitespace-nowrap" variant={"h6"} key={index}>
                            {value}
                        </Typography>
                    )
                })}
            </div>
{/*
            <NavigationMenu.Root className="relative z-10 inline-flex  justify-center text-white bg-white rounded-tl-xl rounded-tr-xl">
                <NavigationMenu.List className="center m-0 flex list-none rounded-md  p-2 ">
                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5
                        rounded px-3 py-2 text-[15px]  font-medium leading-none text-red-500 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet">
                            Products
                            <CaretDownIcon
                                className="relative top-px text-violet10 transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                                aria-hidden
                            />
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content className="left-0 top-10 w-full data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft sm:w-auto">
                            <NavigationMenu.Link/>
                            <ul className="w-[900px] m-0 grid list-none gap-x-1.5 p-[22px] sm:w-[800px] sm:grid-flow-col sm:grid-rows-1 bg-gray-50">
                               <div className="w-full grid grid-cols-2 ">
                                   <div>
                                       <ListItem className="h-full text-black">
                                           <li className="mr-5">
                                               <img className="w-[50px] h-[50px]" src={"/icons/brands/Apple_logoo.svg"} alt="Apple" />
                                           </li>
                                           <Typography  className="font-bold">IPhone 17 für nur 99,- pro Monat</Typography>
                                       </ListItem>

                                   </div>
                                   <div className="text-black">
                                       <ListItem className="">
                                           <li>
                                               First list
                                           </li>
                                       </ListItem>
                                       <ListItem className="">
                                           <li>
                                               First list
                                           </li>
                                       </ListItem>
                                       <ListItem className="">
                                           <li>
                                               First list
                                           </li>
                                       </ListItem>
                                   </div>

                               </div>
                           </ul>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>


                        <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5
                        rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet7">
                            Smart Home
                        </NavigationMenu.Trigger>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>


                        <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5
                        rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet7">
                            Camera and Drone
                        </NavigationMenu.Trigger>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>


                        <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5
                        rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet7">
                            Impressum
                        </NavigationMenu.Trigger>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>


                        <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5
                        rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet7">
                            Mein konto
                        </NavigationMenu.Trigger>
                    </NavigationMenu.Item>
                    <NavigationMenu.Indicator className="NavigationMenuIndicator" />
                    <NavigationMenu.Indicator className="top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
                        <div className="relative top-[70%] size-2.5 rotate-45 rounded-tl-sm bg-[#CC291F]" />
                    </NavigationMenu.Indicator>
                </NavigationMenu.List>
                <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
                    <NavigationMenu.Viewport className="shadow-xl border-2 relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md bg-white transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
                </div>

            </NavigationMenu.Root>
*/}
        </div>

    );
}