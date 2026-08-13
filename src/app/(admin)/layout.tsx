"use client"


import "../globals.css";
import React, {useEffect, useState} from "react";
import {useRouter,usePathname} from "next/navigation"

//-------------Routes -----------------//
import {ROUTES} from "@/lib/Routes/routes"

//icons
//-------------MUI ICONS -----------------//
import AddIcon from "@mui/icons-material/Add";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { SvgIconComponent } from "@mui/icons-material";
//-------------MUI Components -----------------//
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from "@mui/material/Collapse";
//-------------Material Tailwind Components -----------------//
import {Button, Typography} from "@material-tailwind/react";
//-------------Internal Components -----------------//
import Admin_SearchBar from "@/components/layout/admin_layout/Search_bar";
import App_bar_DropDown_Custom from "@/components/ui/DropDown";
import BadgeAvatars from "@/components/ui/Styled_Badge";
//-------------MUI Theme -----------------//
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

//-------------MUI Icons -----------------//
import InventoryIcon from '@mui/icons-material/Inventory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {NavigateNext} from "@mui/icons-material";
import {Breadcrumbs} from "@mui/material";


//Template_Logo
const Logo = "/icons/company_logo/template_logo.svg";





//-------------Default Variables -----------------//
const drawerWidth = 240;
const side_bar_list_items = [
    {
        title : "SUPER ADMIN",
        children: [
            "Users",
            "Roles & Permissions",
            "Customers",
            "Employees",
            "Transactions",
            "Audit Logs",
            "Notifications",
            "System Settings"
        ],
        icons: [DashboardIcon,DashboardIcon,DashboardIcon,DashboardIcon,DashboardIcon,DashboardIcon,DashboardIcon,DashboardIcon]
    },
    {
        title : "MAIN",
        children: [
            "Dashboard",
           ],
        icons: [DashboardIcon]
    },
    {
        title : "INVENTORY",
        children: [    "All products"
            , "Add product"
            , "Edit product"
            , "Product variants"
            , "Media Manager"
            , "Categories"
            , "Sub-Categories"
            , "Brands"
            , "Attributes"
            , "Collections"
            ,"Bulk import/export"
            , "Inventory Logs"
        ],
        icons: [InventoryIcon, InventoryIcon,InventoryIcon,InventoryIcon,InventoryIcon,InventoryIcon,InventoryIcon,InventoryIcon,InventoryIcon,InventoryIcon,InventoryIcon,InventoryIcon]
    },
    {
        title : "ORDERS",
        children: [
            "Orders",
            "Returns",
            "Refunds",
            "Invoices"
        ],
        icons: [DashboardIcon,DashboardIcon,DashboardIcon,DashboardIcon]
    },  {
        title : "PROMOTIONS",
        children: [
            "Coupons",
            "Discount Rules",
            "Banners"
        ],
        icons: [DashboardIcon,DashboardIcon,DashboardIcon]
    },
    {
        title : "SETTINGS",
        children: [
            "Store Settings",
            "Currencies",
            "Taxes",
            "Shipping",
            "Payment Methods",
            "Users & Roles",
        ],
        icons: [DashboardIcon,DashboardIcon,DashboardIcon,DashboardIcon,DashboardIcon,DashboardIcon]
    },
]

function mui_comp ({MUI_COMPONENT, selected_index, index_value}:{MUI_COMPONENT:SvgIconComponent, selected_index:string, index_value:string}){

    return (<MUI_COMPONENT   sx={{
        width:"15px",
        height:"15px",
        color: selected_index == index_value ? "white" : "red"
    }}    />)

}



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme }) => ({
    backgroundColor: "#FAFAFA",
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,

    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
        {
            props: ({ open }) => open,
            style: {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            },
        },
    ],
}));



interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}



const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex',
}));



function on_side_bar_button_click(button_title:string, navigation:AppRouterInstance){

    switch (button_title) {

        case side_bar_list_items[0].children[0]:
            navigation.push(ROUTES.USERS);
            break;

        case side_bar_list_items[0].children[1]:
            navigation.push(ROUTES.ROLES_AND_PERMISSIONS);
            break;

        case side_bar_list_items[1].children[0]:
            navigation.push(ROUTES.DASHBOARD);
            break;


        case side_bar_list_items[2].children[0]:
            navigation.push(ROUTES.INVENTORY);
            break;

        case side_bar_list_items[2].children[1]:
            navigation.push(ROUTES.INVENTORY_CREATE);
            break;

        case side_bar_list_items[2].children[2]:
            navigation.push(ROUTES.INVENTORY_EDIT_SEARCH);
            break;

        case side_bar_list_items[2].children[5]:
            navigation.push(ROUTES.CATEGORIES);
            break;

        case side_bar_list_items[2].children[6]:
            navigation.push(ROUTES.SUB_CATEGORY);
            break;

        case side_bar_list_items[2].children[7]:
            navigation.push(ROUTES.BRANDS);
            break;

        case side_bar_list_items[2].children[8]:
            navigation.push(ROUTES.ATTRIBUTES);
            break;
    }

}

function setSideBarInitialSelectedIndex(path:string){

    const path_chunks = path.split("/");
    const current_page = path_chunks[path_chunks.length - 1];

    switch (current_page) {

        case "users":
            return "0_0";

        case "roles_and_permissions":
            return "0_1";

        case "admin":
            return "1_0";
        case "inventory":
            return "2_0";
        case "Create":
            return "2_1";
        case "Edit":
            return "2_2";

        case "Categories":
            return "2_5";
        case "Sub-Categories":
            return "2_6";
        case "Brands":
            return "2_7";

        case "Attributes":
            return "2_8";

        default:
            return "0_0"
    }
}


export default function PersistentDrawerLeft({children,}: Readonly<{ children: React.ReactNode;}>) {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    //list selection, Initial Value
    const current_page = usePathname();

    const [pageTitleKey, setPageTitleKey] = useState<string>("")

    const [selectedIndex, setSelectedIndex] = useState<string | undefined>(setSideBarInitialSelectedIndex(current_page));

    const [searchValue, setSearchValue] = useState<string>("")

    //navigation
    const navigate = useRouter();

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        function get_path(){
            const pt =current_page.split("/")

            switch (current_page){
                //Supe_admin
                case ROUTES.ROLES_AND_PERMISSIONS:
                    setPageTitleKey("Roles & Permissions");
                    break;

                case ROUTES.USERS:
                    setPageTitleKey("Users");
                    break;

                case ROUTES.DASHBOARD:
                    setPageTitleKey("Dashboard");
                    break;


                //Inventory
                case ROUTES.INVENTORY:
                    setPageTitleKey("Inventory");
                    break;

                case ROUTES.INVENTORY_CREATE:
                    setPageTitleKey("Inventory");
                    break;



                default :
                    break
            }
        }

        get_path();
    }, [current_page])


    switch (pageTitleKey){
        case "":

    }



    type CollapseConditions = {
        id:string,
        value:boolean
    }

    const [CollapseConditions,  setCollapseConditions] = useState<CollapseConditions[]>(side_bar_list_items.map((i)=> ({id:i.title, value:true})))




    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar elevation={0} position="fixed" open={open}>
                <Toolbar sx={{
                    backgroundColor:"white",
                    boxShadow:"none"
                }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                color:"red",
                                mr: 2,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className="w-full flex items-center justify-between ">
                        <div>


                            <Typography variant={"h4"} className={"font-bold text-black"}>{pageTitleKey}</Typography>

                            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext/>}>
                                {current_page.split("/").slice(1).map((e, i) => (<Typography key={i}>{e.replaceAll("_", " ")}</Typography>))}                            </Breadcrumbs>
                        </div>
                        <div className="flex flex-row gap-3  items-center  ">
                            <Admin_SearchBar value={searchValue} onValueChange={setSearchValue} placeHolder={"Search"}/>
                            <Button
                                onClick={()=> navigate.push("/admin/inventory/Create")}
                                className={`inline-flex shrink-0 gap-2 max-h-[36px] p-2 place-items-center rounded-md bg-black text-center align-middle font-sans text-sm font-medium leading-none text-slate-800 ` +
                                'transition-all duration-300 ease-in  hover:opacity-50'}> <AddIcon sx={{width:"20px", height:"20px"}}/> <Typography className="font-bold" variant={"small"}>
                                Add</Typography></Button>

                            <Button
                                onClick={()=> navigate.push("/admin/inventory/")}
                                className={`inline-flex shrink-0 gap-2 max-h-[36px] p-2 place-items-center rounded-md bg-[#ff0000] text-center align-middle font-sans text-sm font-medium leading-none text-slate-800 ` +
                                'transition-all duration-300 ease-in  hover:opacity-50'}> <Inventory2OutlinedIcon sx={{width:"20px", height:"20px"}}/> <Typography className="font-bold" variant={"small"}>
                                Inventory</Typography></Button>

                            <Divider orientation="vertical" flexItem />


                            <App_bar_DropDown_Custom leading_icon={<ChatBubbleOutlineOutlinedIcon sx={{fill:"black",width:"20px", height:"20px"}}/>} title={""} button_color={"bg-gray-100"}/>
                            <App_bar_DropDown_Custom leading_icon={<NotificationsOutlinedIcon sx={{fill:"black",width:"20px", height:"20px"}}/>} title={""} button_color={"bg-gray-100"}/>
                            <Button className={`flex flex-row gap-2 max-h-[36px] p-2 place-items-center rounded-md bg-gray-100 text-center align-middle font-sans text-sm font-medium leading-none shadow-none text-slate-800 ` +
                                'transition-all duration-300 ease-in  hover:opacity-50'}>
                                <SettingsOutlinedIcon  sx={{fill:"black",width:"20px", height:"20px"}}/>
                            </Button>
                            <BadgeAvatars/>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader className={"bg-[#ff0000] rounded-2xl m-2"}>
                    <div className={"w-full  grid grid-cols-3"}>
                        <div className={"w-full flex items-end justify-center col-span-2"}>
                            <img className="w-12 h-12 flex object-contain" src={Logo} alt="Company Logo"/>
                        </div>

                        <div className={"w-full flex justify-end  col-span-1"}>
                            <IconButton  sx={{
                                color: "white",
                                fill:"white"
                            }} onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </div>
                    </div>
                </DrawerHeader>
                <div>
                    {/*Dashboard children 1 icnos : 0, Inventory children     */}
                    {side_bar_list_items.map((item, i) => {
                        return (
                            <div key={item.title}>
                                <div className={"relative flex items-center justify-between"}>
                                    <Typography className={" ml-4 mt-4 text-gray-500"}>
                                        {item.title}
                                    </Typography>

                                    <div onClick={()=>setCollapseConditions((prev)=>{
                                        return prev.map((i)=> i.id === item.title ? {...i, value:!i.value} : i)
                                    })} style={{}} className={`absolute rounded-xl  mt-1 top-0 right-2 translate-y-1/2 cursor-pointer hover:bg-gray-100 stroke-2 transition-transform duration-200  ${CollapseConditions[CollapseConditions.findIndex((i)=>i.id === item.title)].value ? "" : "rotate-180"}`}>
                                        {<ExpandMoreIcon/>}
                                    </div>

                                </div>

                                <Collapse in={CollapseConditions[CollapseConditions.findIndex((i)=>i.id === item.title)].value}>
                                    <List disablePadding={true}>
                                        {item.children.map((children, index)=>{
                                            return (
                                                <ListItem  disablePadding={true} key={children}>

                                                    <ListItemButton

                                                        key={`${i}_${index}`}
                                                        selected={selectedIndex === `${i}_${index}`}

                                                        onClick={(e)=> {
                                                            setSelectedIndex(`${i}_${index}`)
                                                            on_side_bar_button_click(children, navigate);
                                                        }}
                                                        sx={{
                                                            marginLeft: 1,
                                                            marginRight:1,
                                                            marginBottom: 1,
                                                            borderRadius : 2,
                                                            fontSize: 14,

                                                            ":hover": {
                                                                backgroundColor: "#facfd4",
                                                            },
                                                            "&.Mui-selected:hover":{
                                                                backgroundColor: "black",
                                                            },
                                                            "&.Mui-selected" : {
                                                                backgroundColor: "red",
                                                                color: "white",
                                                            }
                                                            //backgroundColor:  index == selectedIndex? "#facfd4" : ""

                                                            //Dashbord icons,  Inventory Icons
                                                        }}>

                                                        <div className={"flex flex-row gap-3"}>
                                                            <div className={"flex justify-center items-center"}>
                                                                {mui_comp({MUI_COMPONENT:side_bar_list_items[i].icons[index], selected_index: selectedIndex ?? "", index_value:`${i}_${index}`})}

                                                            </div>
                                                            {children}

                                                        </div>
                                                    </ListItemButton>
                                                </ListItem>
                                            )
                                        })}


                                    </List>

                                </Collapse>

                            </div>
                        )



                    })}

                    {/*<List>
                        { side_bar_list_items.map((i)=>{
                            return (
                                <ListItem key={i.title} disablePadding={true}>
                                    {i.children.map((item)=>(
                                        <ListItemButton className={"block"} key={item}>{item}</ListItemButton>
                                    ))}
                                </ListItem>
                            )
                        })}
                    </List>*/}
                </div>
            </Drawer>


            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
    );
}



// /*  //['Dashboard', 'Inventory'].map((text, index) => (
//
//                        /* <ListItem key={text} disablePadding>
//                             <ListItemButton>
//                                 <ListItemIcon>
//                                     {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                                 </ListItemIcon>
//                                 <ListItemText primary={text} />
//                             </ListItemButton>
//                         </ListItem>*/
//                     //))*/