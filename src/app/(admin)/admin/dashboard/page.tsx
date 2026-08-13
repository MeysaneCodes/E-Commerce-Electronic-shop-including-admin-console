"use client"

import {Button, Card, Typography} from "@material-tailwind/react";
import {AlertDismissible} from "@/components/ui/Alert";
import LoyaltyOutlinedIcon from "@mui/icons-material/LoyaltyOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import Divider from "@mui/material/Divider";
import IncompleteCircleOutlinedIcon from "@mui/icons-material/IncompleteCircleOutlined";
import PixOutlinedIcon from "@mui/icons-material/PixOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CustomLabels from "@/components/ui/charts/Bars/bars";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import Groups3Icon from "@mui/icons-material/Groups3";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CustomLabels_WithNegativeValues from "@/components/ui/charts/Bars/bars_with_minimum_values";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Tab_Custom from "@/components/ui/tabs";
import TableGenerator from "@/components/ui/Table_Generator";

//-------------Charts -----------------//
import Doughnut_Custom from "@/components/ui/charts/Doughnut_Charts/Doughnut_Custom";
import DoublePie from "@/components/ui/charts/double_pie";
//-------------Types -----------------//
type props = {
    rows: number;
    columns: number;
    col_titles: string[];
    row_titles: string[];
    row_contents: Array<JSX.Element[]>,
}



const Date_Section = () => (
    <div className="h-full flex items-center">
        <Typography>
            00/00/0000
        </Typography>
    </div>
)
const Customer_Section = ()=> (
    <div className="flex flex-row gap-2 items-center ">
        <span className="w-[40px] h-[40px] rounded-xl bg-gray-100" />
        <div className="flex flex-col gap-0">
            <Typography>Alex dssds</Typography>
            <Typography>#000000</Typography>
        </div>
    </div>
)
const Status_Section = () => (
    <div className="h-full flex items-center">
        <Typography className={"rounded-xl bg-green-400  text-white px-2 sm:text-sm lg:text-sm md:text-sm "}>
            Paid
        </Typography>
    </div>
)
const Total_Section = () => (
    <div className="h-full flex items-center">
        <Typography className="font-bold text-base">
            99.999.00€
        </Typography>
    </div>
)
const SALE = {
    Date: <Date_Section/>,
    Customer: <Customer_Section/>,
    Status: <Status_Section/>,
    Total: <Total_Section/>,
}


const Tabs_Header = ["Sale", "Purchase", "Quotation", "Expenses", "Invoices"]
const params : props = {
    rows: 4,
    columns:4,
    col_titles:["Date", "Customer", "Status", "Total"],
    row_titles: Tabs_Header,
    row_contents: [[SALE.Date, SALE.Customer, SALE.Status, SALE.Total], [SALE.Date, SALE.Customer, SALE.Status, SALE.Total],[SALE.Date, SALE.Customer, SALE.Status, SALE.Total],[SALE.Date, SALE.Customer, SALE.Status, SALE.Total],]
}
const Tabs_Content = [(<TableGenerator key={0} params={params}/>),(<TableGenerator key={1} params={params}/>),(<TableGenerator key={2} params={params}/>),(<TableGenerator key={3} params={params}/>),(<TableGenerator key={4} params={params}/>)];






export default function dashboard (){
    return(
        <div className="w-full flex flex-col gap-5 ">

            {/*Greeting & Order notifications*/}
            <div>
                <Typography variant="h4">
                    Willkommen, Admin
                </Typography>

                <Typography className="inline" variant="paragraph">
                    Heute liegen über
                    <span className="text-green-400">
                        {"\u00A0200"}
                    </span>
                    {"\u00A0Bestellungen vor."}
                </Typography>

            </div>

            {/*TODO new function/Event of adding alerts => lack of stocks, Warning, Success, Failure*/}
            <div className="w-full">
                <AlertDismissible AlertMessage={"Your Product Apple Iphone 15 is running Low, already below 5 Pcs. Please consider adding Stock!"} isOpen={true}/>
            </div>

            <div className="w-full  grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2  gap-4 m-0 p-0">
                <Card className="min-h-[100px] max-h-[130px] bg-[#0E21A0] p-3">
                    {/*<div className="w-full  h-full grid lg:grid-cols-3 sm:grid-cols-3  gap-0 m-0 p-0 ">*/}

                    <div className="w-full  h-full flex flex-row  items-center gap-2 m-0 p-0 ">
                        <div className="inline-flex h-full  items-center justify-center  ">
                            <div className=" max-h-[60px]  p-2  w-full h-full rounded-lg bg-white flex items-center justify-center object-cover ">
                                <LoyaltyOutlinedIcon sx={{fill: "#0E21A0" ,maxWidth: "50px", maxHeight: "50px", width: "100%", height:"100%"}}/>
                            </div>
                        </div>


                        <div className="w-full h-full flex  grow  items-center justify-start ">
                            <div>
                                <Typography className="sm:flex-1 sm:text-sm  lg:text-sm  md:text-sm  text-white">
                                    Total Sales
                                </Typography>
                                <div className="flex-wrap  sm-flex-1 sm:flex flex-row gap-2">
                                    <Typography className="inline-flex text-white  sm:text-sm md:text-sm lg:text-lg font-bold">
                                        $10.000.000.00
                                    </Typography>

                                    <div className="max-w-[90px] max-h-[80px] px-2 h-full rounded-lg bg-white inline-flex flex-row  gap-1 items-center justify-center object-cover ">
                                        <TrendingUpOutlinedIcon sx={{fill: "green" ,maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%"}}/>
                                        <Typography className="text-green-500 sm:text-sm md:text-sm  lg:text-sm">+50%</Typography>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>


                </Card>
                <Card className="min-h-[100px] max-h-[130px] bg-gradient-to-bl from-[#FCA90D] via-[#F0CC84] to-[#FCA90D] p-3">
                    {/*<div className="w-full  h-full grid lg:grid-cols-3 sm:grid-cols-3  gap-0 m-0 p-0 ">*/}

                    <div className="w-full  h-full flex flex-row  items-center gap-2 m-0 p-0 ">
                        <div className="inline-flex h-full  items-center justify-center  ">
                            <div className=" max-h-[60px]  p-2  w-full h-full rounded-lg bg-white flex items-center justify-center object-cover ">
                                <LoyaltyOutlinedIcon sx={{fill: "#0E21A0" ,maxWidth: "50px", maxHeight: "50px", width: "100%", height:"100%"}}/>
                            </div>
                        </div>


                        <div className="w-full h-full flex  grow  items-center justify-start ">
                            <div>
                                <Typography className="sm:flex-1 sm:text-sm  lg:text-sm  md:text-sm  text-white">
                                    Total Sales Return
                                </Typography>
                                <div className="flex-wrap  sm-flex-1 sm:flex flex-row gap-2">
                                    <Typography className="inline-flex text-white  sm:text-sm md:text-sm lg:text-lg font-bold">
                                        $10.000.000.00
                                    </Typography>

                                    <div className="max-w-[90px] max-h-[80px] px-2 h-full rounded-lg bg-white inline-flex flex-row  gap-1 items-center justify-center object-cover ">
                                        <TrendingDownOutlinedIcon sx={{fill: "red" ,maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%"}}/>
                                        <Typography className="text-red-500 sm:text-sm md:text-sm  lg:text-sm">-25%</Typography>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>


                </Card>
                <Card className="min-h-[100px] max-h-[130px] bg-[#FD8A6B] p-3">
                    {/*<div className="w-full  h-full grid lg:grid-cols-3 sm:grid-cols-3  gap-0 m-0 p-0 ">*/}

                    <div className="w-full  h-full flex flex-row  items-center gap-2 m-0 p-0 ">
                        <div className="inline-flex h-full  items-center justify-center  ">
                            <div className=" max-h-[60px]  p-2  w-full h-full rounded-lg bg-white flex items-center justify-center object-cover ">
                                <LoyaltyOutlinedIcon sx={{fill: "#0E21A0" ,maxWidth: "50px", maxHeight: "50px", width: "100%", height:"100%"}}/>
                            </div>
                        </div>


                        <div className="w-full h-full flex  grow  items-center justify-start ">
                            <div>
                                <Typography className="sm:flex-1 sm:text-sm  lg:text-sm  md:text-sm  text-white">
                                    Total Purchase
                                </Typography>
                                <div className="flex-wrap  sm-flex-1 sm:flex flex-row gap-2">
                                    <Typography className="inline-flex text-white  sm:text-sm md:text-sm lg:text-lg font-bold">
                                        $10.000.000.00
                                    </Typography>

                                    <div className="max-w-[90px] max-h-[80px] px-2 h-full rounded-lg bg-white inline-flex flex-row  gap-1 items-center justify-center object-cover ">
                                        <TrendingDownOutlinedIcon sx={{fill: "red" ,maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%"}}/>
                                        <Typography className="text-red-500 sm:text-sm md:text-sm  lg:text-sm">-25%</Typography>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>


                </Card>
                <Card className="min-h-[100px] max-h-[130px] bg-[#4E71FF] p-3">
                    {/*<div className="w-full  h-full grid lg:grid-cols-3 sm:grid-cols-3  gap-0 m-0 p-0 ">*/}

                    <div className="w-full  h-full flex flex-row  items-center gap-2 m-0 p-0 ">
                        <div className="inline-flex h-full  items-center justify-center  ">
                            <div className=" max-h-[60px]  p-2  w-full h-full rounded-lg bg-white flex items-center justify-center object-cover ">
                                <LoyaltyOutlinedIcon sx={{fill: "#0E21A0" ,maxWidth: "50px", maxHeight: "50px", width: "100%", height:"100%"}}/>
                            </div>
                        </div>


                        <div className="w-full h-full flex  grow  items-center justify-start ">
                            <div>
                                <Typography className="sm:flex-1 sm:text-sm  lg:text-sm  md:text-sm  text-white">
                                    Total Purchase Return
                                </Typography>
                                <div className="flex-wrap  sm-flex-1 sm:flex flex-row gap-2">
                                    <Typography className="inline-flex text-white  sm:text-sm md:text-sm lg:text-lg font-bold">
                                        $10.000.000.00
                                    </Typography>

                                    <div className="max-w-[90px] max-h-[80px] px-2 h-full rounded-lg bg-white inline-flex flex-row  gap-1 items-center justify-center object-cover ">
                                        <TrendingDownOutlinedIcon sx={{fill: "red" ,maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%"}}/>
                                        <Typography className="text-red-500 sm:text-sm md:text-sm  lg:text-sm">-45%</Typography>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>


                </Card>
            </div>
            <div className="w-full mt-2 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2  gap-4 m-0 p-0">
                <Card className="min-h-[100px] max-h-[170px] bg-white shadow-none border border-gray-300 p-5">
                    {/*<div className="w-full  h-full grid lg:grid-cols-3 sm:grid-cols-3  gap-0 m-0 p-0 ">*/}

                    <div className="w-full  h-full flex flex-row  items-center justify-between gap-2 m-0  ">
                        <div>
                            <Typography className="font-bold sm:text-sm  lg:text-lg  md:text-lg  text-black">
                                $5,352,128
                            </Typography>
                            <Typography className=" text-black" variant="small">
                                Profit
                            </Typography>

                        </div>

                        <div className={"flex items-center justify-center rounded-2xl min-w-[50px] min-h-[50px] sm:max-w-[25px] sm:max-h-[25px] bg-cyan-50 p-3 object-cover"}>
                            <PaymentsOutlinedIcon sx={{
                                maxWidth: "50px", maxHeight: "50px", width: "100%", height:"100%",
                                fill: "lightskyblue",
                            }}/>
                        </div>
                    </div>

                    <Divider sx={{
                        marginY: "10px"
                    }}/>

                    <div className="w-full h-full flex justify-between">
                        <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black">
                            <span className="text-green-500 font-bold">35%</span>
                            {"\u00A0vs Last Month"}
                        </Typography>

                        <Typography className="font-bold  cursor-pointer underline sm:text-sm  lg:text-sm  md:text-sm  text-gray-600">
                            View All
                        </Typography>


                    </div>



                </Card>
                <Card className="min-h-[100px] max-h-[170px] bg-white shadow-none border border-gray-300 p-5">
                    {/*<div className="w-full  h-full grid lg:grid-cols-3 sm:grid-cols-3  gap-0 m-0 p-0 ">*/}

                    <div className="w-full  h-full flex flex-row  items-center justify-between gap-2 m-0  ">
                        <div>
                            <Typography className="font-bold sm:text-sm  lg:text-lg  md:text-lg  text-black">
                                $15,352,128
                            </Typography>
                            <Typography className=" text-black" variant="small">
                                Invoice Due
                            </Typography>

                        </div>

                        <div className={"flex items-center justify-center rounded-2xl min-w-[50px] min-h-[50px] sm:max-w-[25px] sm:max-h-[25px] bg-cyan-50 p-3 object-cover"}>
                            <IncompleteCircleOutlinedIcon sx={{
                                maxWidth: "50px", maxHeight: "50px", width: "100%", height:"100%",
                                fill: "lightskyblue",
                            }}/>
                        </div>
                    </div>

                    <Divider sx={{
                        marginY: "10px"
                    }}/>

                    <div className="w-full h-full flex justify-between">
                        <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black">
                            <span className="text-green-500 font-bold">35%</span>
                            {"\u00A0vs Last Month"}
                        </Typography>

                        <Typography className="font-bold  cursor-pointer underline sm:text-sm  lg:text-sm  md:text-sm  text-gray-600">
                            View All
                        </Typography>


                    </div>



                </Card>
                <Card className="min-h-[100px] max-h-[170px] bg-white shadow-none border border-gray-300 p-5">
                    {/*<div className="w-full  h-full grid lg:grid-cols-3 sm:grid-cols-3  gap-0 m-0 p-0 ">*/}

                    <div className="w-full  h-full flex flex-row  items-center justify-between gap-2 m-0  ">
                        <div>
                            <Typography className="font-bold sm:text-sm  lg:text-lg  md:text-lg  text-black">
                                $2,352,128
                            </Typography>
                            <Typography className=" text-black" variant="small">
                                Total Expenses
                            </Typography>

                        </div>

                        <div className={"flex items-center justify-center rounded-2xl min-w-[50px] min-h-[50px] sm:max-w-[25px] sm:max-h-[25px] bg-cyan-50 p-3 object-cover"}>
                            <PixOutlinedIcon sx={{
                                maxWidth: "50px", maxHeight: "50px", width: "100%", height:"100%",
                                fill: "lightskyblue",
                            }}/>
                        </div>
                    </div>

                    <Divider sx={{
                        marginY: "10px"
                    }}/>

                    <div className="w-full h-full flex justify-between">
                        <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black">
                            <span className="text-green-500 font-bold">35%</span>
                            {"\u00A0vs Last Month"}
                        </Typography>

                        <Typography className="font-bold  cursor-pointer underline sm:text-sm  lg:text-sm  md:text-sm  text-gray-600">
                            View All
                        </Typography>


                    </div>



                </Card>
                <Card className="min-h-[100px] max-h-[170px] bg-white shadow-none border border-gray-300 p-5">
                    {/*<div className="w-full  h-full grid lg:grid-cols-3 sm:grid-cols-3  gap-0 m-0 p-0 ">*/}

                    <div className="w-full  h-full flex flex-row  items-center justify-between gap-2 m-0  ">
                        <div>
                            <Typography className="font-bold sm:text-sm  lg:text-lg  md:text-lg  text-black">
                                $352,128
                            </Typography>
                            <Typography className=" text-black" variant="small">
                                Total Payments return
                            </Typography>

                        </div>

                        <div className={"flex items-center justify-center rounded-2xl min-w-[50px] min-h-[50px] sm:max-w-[25px] sm:max-h-[25px] bg-cyan-50 p-3 object-cover"}>
                            <KeyboardReturnOutlinedIcon sx={{
                                maxWidth: "50px", maxHeight: "50px", width: "100%", height:"100%",
                                fill: "lightskyblue",
                            }}/>
                        </div>
                    </div>

                    <Divider sx={{
                        marginY: "10px"
                    }}/>

                    <div className="w-full h-full flex justify-between">
                        <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black">
                            <span className="text-red-500 font-bold">15%</span>
                            {"\u00A0vs Last Month"}
                        </Typography>

                        <Typography className="font-bold  cursor-pointer underline sm:text-sm  lg:text-sm  md:text-sm  text-gray-600">
                            View All
                        </Typography>


                    </div>



                </Card>

            </div>

            <div className="flex flex-row gap-5">
                <Card className="w-[70%] bg-white shadow-none border border-gray-300 p-5 flex flex-col gap-3 ">
                    {/*<div className="w-full  h-full grid lg:grid-cols-3 sm:grid-cols-3  gap-0 m-0 p-0 ">*/}
                    <div className="flex flex-row items-center gap-2">
                        <div className={""}>
                            <div className={"flex items-center justify-center rounded-xl max-w-[90px] max-h-[80px] p-2 bg-cyan-50  object-cover"}>
                                <ShoppingCartIcon sx={{
                                    maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%",
                                    fill: "red",
                                }}/>
                            </div>
                        </div>
                        <Typography className="font-bold sm:text-sm  lg:text-lg  md:text-lg  text-black">
                            Sales & Purchase
                        </Typography>
                    </div>
                    <Divider/>
                    <CustomLabels/>
                </Card>


                <Card className="w-[30%] bg-white shadow-none border border-gray-300 p-5 flex flex-col gap-3 ">
                    {/*<div className="w-full  h-full grid lg:grid-cols-3 sm:grid-cols-3  gap-0 m-0 p-0 ">*/}
                    <div className="flex flex-row items-center gap-2">
                        <div className={""}>
                            <div className={"flex items-center justify-center rounded-xl max-w-[90px] max-h-[80px] p-2 bg-cyan-50  object-cover"}>
                                <InfoOutlineIcon sx={{
                                    maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%",
                                    fill: "red",
                                }}/>
                            </div>
                        </div>
                        <Typography className="font-bold sm:text-sm  lg:text-lg  md:text-lg  text-black">
                            Overall Information
                        </Typography>
                    </div>
                    <Divider/>

                    <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-3 ">
                        <Card className="bg-gray-50 shadow-none border border-gray-300 flex flex-col gap-3 items-center justify-center py-5">
                            <PeopleOutlineIcon  sx={{
                                maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%",
                                fill: "blue",
                            }} />

                            <div className="flex flex-col gap-1  items-center justify-center">

                                <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-gray-500">
                                    Supplier
                                </Typography>
                                <Typography className="font-bold sm:text-sm  lg:text-sm  md:text-sm  text-black">
                                    6500
                                </Typography>
                            </div>
                        </Card>
                        <Card className="bg-gray-50 shadow-none border border-gray-300 flex flex-col gap-3 items-center justify-center py-5">
                            <Groups3Icon  sx={{
                                maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%",
                                fill: "red",
                            }} />

                            <div className="flex flex-col gap-1  items-center justify-center">

                                <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-gray-500">
                                    Supplier
                                </Typography>
                                <Typography className="font-bold sm:text-sm  lg:text-sm  md:text-sm  text-black">
                                    1500
                                </Typography>
                            </div>
                        </Card>
                        <Card className="bg-gray-50 shadow-none border border-gray-300 flex flex-col gap-3 items-center justify-center py-5">
                            <ShoppingCartIcon  sx={{
                                maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%",
                                fill: "green",
                            }} />

                            <div className="flex flex-col gap-1  items-center justify-center">

                                <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-gray-500">
                                    Supplier
                                </Typography>
                                <Typography className="font-bold sm:text-sm  lg:text-sm  md:text-sm  text-black">
                                    6500
                                </Typography>
                            </div>
                        </Card>
                    </div>

                    <Divider/>

                    <div className="flex flex-row items-center mt-5 gap-2">
                        <Typography className="font-bold sm:text-sm  lg:text-sm  md:text-sm  text-black">
                            Customer Overview
                        </Typography>
                    </div>

                    <div className="grid grid-cols-2 gap-1 ">
                        <DoublePie/>
                        <div className="inline-flex flex-row gap-2  items-center justify-center  ">
                            <div className="inline-flex flex-col gap-2 items-center justify-center">
                                <Typography className="font-bold sm:text-sm  lg:text-lg  md:text-lg  text-black">
                                    5.5K
                                </Typography>
                                <Typography className=" sm:text-sm  lg:text-sm  md:text-sm  text-red-600">
                                    First Time
                                </Typography>
                                <div className="max-w-[90px] max-h-[80px] px-2 h-full rounded-lg bg-green-500 inline-flex flex-row  gap-2 items-center justify-center object-cover ">
                                    <TrendingUpOutlinedIcon sx={{fill: "white" ,maxWidth: "20px", maxHeight: "20px", width: "100%", height:"100%"}}/>
                                    <Typography className="text-white" variant={"small"}>25%</Typography>
                                </div>
                            </div>
                            <div className="inline-flex h-full  py-5">
                                <Divider orientation={"vertical"}/>
                            </div>
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <Typography className="font-bold sm:text-sm  lg:text-lg  md:text-lg  text-black">
                                    5.5K
                                </Typography>
                                <Typography className=" sm:text-sm  lg:text-sm  md:text-sm  text-green-800">
                                    Return
                                </Typography>
                                <div className="max-w-[90px] max-h-[80px] px-2 h-full rounded-lg bg-green-500 inline-flex flex-row  gap-2 items-center justify-center object-cover ">
                                    <TrendingUpOutlinedIcon sx={{fill: "white" ,maxWidth: "20px", maxHeight: "20px", width: "100%", height:"100%"}}/>
                                    <Typography className="text-white" variant={"small"}>25%</Typography>
                                </div>
                            </div>
                        </div>
                    </div>






                </Card>
            </div>

            {/*Section : */}

            <div className="grid grid-cols-3 gap-2 ">
                {/*Top Selling Products : */}
                <Card className="min-h-[100px] bg-white shadow-none border border-gray-300 p-5 flex flex-col gap-4">
                    <div className="flex gap-2 items-center justify-between">
                        <div className="flex flex-row gap-2 items-center justify-start">
                            <div className={"bg-red-200 rounded-xl p-1"}>
                                <AutoGraphIcon sx={{fill: "red" ,maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%"}}/>
                            </div>
                            <Typography className="sm:text-sm  lg:text-lg  md:text-lg  text-black font-bold">
                                Top Selling Products
                            </Typography>
                        </div>

                        <Button className={"bg-white shadow-none text-black"}>
                            Today
                        </Button>
                    </div>

                    {Array.from({length:5}).map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Divider/>
                                <div className="flex flex-row justify-between  gap-3">
                                    <div className="w-full h-full flex flex-row gap-2 ">
                                        <img className="w-[64px] aspect-auto object-cover" src={"/Images/test_images/IPhone_16_pro_max_back.png"}/>
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black font-bold">
                                                IPhone 16 Pro max - 256GB - Black
                                            </Typography>
                                            <div className={"flex flex-row gap-2 items-center justify-center"}>
                                                <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black">
                                                    999€
                                                </Typography>
                                                <Divider orientation={"vertical"}/>
                                                <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black">
                                                    256+ Sales
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="max-w-[90px] max-h-[80px] px-2 h-full rounded-lg bg-white inline-flex flex-row  gap-1 items-center justify-center object-cover ">
                                        <TrendingUpOutlinedIcon sx={{fill: "green" ,maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%"}}/>
                                        <Typography className="text-green-500 sm:text-sm md:text-sm  lg:text-sm">+45%</Typography>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </Card>
                {/*Low Stock Products : */}

                <Card className="min-h-[100px] bg-white shadow-none border border-gray-300 p-5 flex flex-col gap-4">
                    <div className="flex gap-2 items-center justify-between">
                        <div className="flex flex-row gap-2 items-center justify-start">
                            <div className={"bg-orange-200 rounded-xl p-1"}>
                                <WarningAmberIcon sx={{fill: "red" ,maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%"}}/>
                            </div>
                            <Typography className="sm:text-sm  lg:text-lg  md:text-lg  text-black font-bold">
                                Low Stock Products
                            </Typography>
                        </div>

                        <Button className={"bg-white shadow-none text-black underline"}>
                            View All
                        </Button>
                    </div>
                    {Array.from({length:5}).map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Divider/>
                                <div className="flex flex-row justify-between  gap-3">
                                    <div className="w-full h-full flex flex-row gap-2 ">
                                        <img className="w-[64px] aspect-auto object-cover" src={"/Images/test_images/IPhone_16_pro_max_back.png"}/>
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black font-bold">
                                                IPhone 16 Pro max - 256GB - Black
                                            </Typography>
                                            <div className={"flex flex-row gap-2 items-center justify-center"}>
                                                <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black">
                                                    ID :
                                                </Typography>
                                                <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black">
                                                    #0932912
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="max-w-[90px] max-h-[80px] px-2 h-full  inline-flex flex-col  gap-1 items-center justify-center object-cover ">
                                        <Typography className="text-black sm:text-sm md:text-sm  lg:text-sm">Instock</Typography>
                                        <Typography className="text-red-500 sm:text-sm md:text-sm  lg:text-sm font-bold">02</Typography>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </Card>


                {/*Recent Sales : */}
                <Card className="min-h-[100px] bg-white shadow-none border border-gray-300 p-5 flex flex-col gap-4">
                    <div className="flex gap-2 items-center justify-between">
                        <div className="flex flex-row gap-2 items-center justify-start">
                            <div className={"bg-green-200 rounded-xl p-1"}>
                                <ReceiptIcon sx={{fill: "red" ,maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%"}}/>
                            </div>
                            <Typography className="sm:text-sm  lg:text-lg  md:text-lg  text-black font-bold">
                                Recent Sales
                            </Typography>
                        </div>

                        <Button className={"bg-white shadow-none text-black"}>
                            Today
                        </Button>
                    </div>
                    {Array.from({length:5}).map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Divider/>
                                <div className="flex flex-row justify-between  gap-3">
                                    <div className="w-full h-full flex flex-row gap-2 ">
                                        <img className="w-[64px] aspect-auto object-cover" src={"/Images/test_images/IPhone_16_pro_max_back.png"}/>
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black font-bold">
                                                IPhone 16 Pro max - 256GB - Black
                                            </Typography>
                                            <div className={"flex flex-row gap-2 items-center justify-center"}>
                                                <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black">
                                                    Handys
                                                </Typography>
                                                <Divider orientation={"vertical"}/>
                                                <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black font-bold">
                                                    1099€
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center justify-center ">
                                        <Typography className="rounded-lg bg-green-500 py-1 px-2  text-white sm:text-sm md:text-sm  lg:text-sm font-bold ">Completed</Typography>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </Card>
            </div>

            {/*Section : */}

            <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white shadow-none border border-gray-300 p-5 flex flex-col gap-4">
                    {/*<div className="w-full  h-full grid lg:grid-cols-3 sm:grid-cols-3  gap-0 m-0 p-0 ">*/}
                    <div className="flex flex-row items-center gap-2">
                        <div className={""}>
                            <div className={"flex items-center justify-center rounded-xl max-w-[90px] max-h-[80px] p-2 bg-cyan-50  object-cover"}>
                                <ShoppingCartIcon sx={{
                                    maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%",
                                    fill: "red",
                                }}/>
                            </div>
                        </div>
                        <Typography className="font-bold sm:text-sm  lg:text-lg  md:text-lg  text-black">
                            Sales & Purchase
                        </Typography>
                    </div>
                    <Divider/>
                    <div className={"flex flex-row gap-2"}>
                        <div className={"flex flex-col gap-2 border border-gray-200 p-2  text-black rounded-xl "}>
                            <div className="flex flex-row gap-4">
                                <Typography className="text-green-500 sm:text-sm md:text-lg  lg:text-lg font-bold ">12.220.00 €</Typography>
                                <div className="flex flex-row gap-1 rounded-xl bg-green-500 p-1 items-center justify-center ">
                                    <TrendingUpOutlinedIcon sx={{fill: "white" ,maxWidth: "15px", maxHeight: "15px", width: "100%", height:"100%"}}/>
                                    <Typography className="sm:text-sm md:text-sm lg:text-sm text-white">+30%</Typography>
                                </div>
                            </div>
                            <Typography className="sm:text-sm md:text-sm  lg:text-sm  ">Revenue</Typography>
                        </div>

                        <div className={"flex flex-col gap-2 border border-gray-200 p-2  text-black rounded-xl "}>
                            <div className="flex flex-row gap-4">
                                <Typography className="text-red-500 sm:text-sm md:text-lg  lg:text-lg font-bold ">12.220.00 €</Typography>
                                <div className="flex flex-row gap-1 rounded-xl bg-red-500 p-1 items-center justify-center ">
                                    <TrendingDownOutlinedIcon sx={{fill: "white" ,maxWidth: "15px", maxHeight: "15px", width: "100%", height:"100%"}}/>
                                    <Typography className="sm:text-sm md:text-sm lg:text-sm text-white">+30%</Typography>
                                </div>
                            </div>
                            <Typography className="sm:text-sm md:text-sm  lg:text-sm  ">Expenses</Typography>
                        </div>
                    </div>
                    <CustomLabels_WithNegativeValues/>
                </Card>
                <Card className="bg-white shadow-none border border-gray-300 p-5 flex flex-col gap-4">
                    {/*<div className="w-full  h-full grid lg:grid-cols-3 sm:grid-cols-3  gap-0 m-0 p-0 ">*/}
                    <div className="flex flex-row items-center gap-2">
                        <div className={""}>
                            <div className={"flex items-center justify-center rounded-xl max-w-[90px] max-h-[80px] p-2 bg-cyan-50  object-cover"}>
                                <ReceiptLongIcon sx={{
                                    maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%",
                                    fill: "red",
                                }}/>
                            </div>
                        </div>
                        <Typography className="font-bold sm:text-sm  lg:text-lg  md:text-lg  text-black">
                            Recent Transaction
                        </Typography>
                    </div>
                    <Divider/>
                    <div className={"flex flex-row gap-2"}>
                        <div className={"flex flex-col gap-2 border border-gray-200 p-2  text-black rounded-xl "}>
                            <div className="flex flex-row gap-4">
                                <Typography className="text-green-500 sm:text-sm md:text-lg  lg:text-lg font-bold ">12.220.00 €</Typography>
                                <div className="flex flex-row gap-1 rounded-xl bg-green-500 p-1 items-center justify-center ">
                                    <TrendingUpOutlinedIcon sx={{fill: "white" ,maxWidth: "15px", maxHeight: "15px", width: "100%", height:"100%"}}/>
                                    <Typography className="sm:text-sm md:text-sm lg:text-sm text-white">+30%</Typography>
                                </div>
                            </div>
                            <Typography className="sm:text-sm md:text-sm  lg:text-sm  ">Revenue</Typography>
                        </div>

                        <div className={"flex flex-col gap-2 border border-gray-200 p-2  text-black rounded-xl "}>
                            <div className="flex flex-row gap-4">
                                <Typography className="text-red-500 sm:text-sm md:text-lg  lg:text-lg font-bold ">12.220.00 €</Typography>
                                <div className="flex flex-row gap-1 rounded-xl bg-red-500 p-1 items-center justify-center ">
                                    <TrendingDownOutlinedIcon sx={{fill: "white" ,maxWidth: "15px", maxHeight: "15px", width: "100%", height:"100%"}}/>
                                    <Typography className="sm:text-sm md:text-sm lg:text-sm text-white">+30%</Typography>
                                </div>
                            </div>
                            <Typography className="sm:text-sm md:text-sm  lg:text-sm  ">Expenses</Typography>
                        </div>
                    </div>
                    <Tab_Custom Headers={[...Tabs_Header]} Content={[...Tabs_Content]}/>
                </Card>
            </div>


            {/*Section : */}
            <div className="grid grid-cols-3 gap-2 ">
                {/*TopCustomer*/}
                <Card className="min-h-[100px] bg-white shadow-none border border-gray-300 p-5 flex flex-col gap-4">
                    <div className="flex gap-2 items-center justify-between">
                        <div className="flex flex-row gap-2 items-center justify-start">
                            <div className={"bg-red-200 rounded-xl p-1"}>
                                <AutoGraphIcon sx={{fill: "red" ,maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%"}}/>
                            </div>
                            <Typography className="sm:text-sm  lg:text-lg  md:text-lg  text-black font-bold">
                                Top Customer
                            </Typography>
                        </div>

                        <Button className={"bg-white shadow-none text-black"}>
                            Today
                        </Button>
                    </div>
                    {Array.from({length:5}).map((item, i) =>{
                        return (
                            <React.Fragment key={i}>
                                <Divider/>
                                <div className="flex flex-row justify-between  gap-3">
                                    <div className="w-full h-full flex flex-row gap-2 ">
                                        <img className="w-[64px] aspect-auto object-cover" src={"/Images/test_images/IPhone_16_pro_max_back.png"}/>
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black font-bold">
                                                Mustermann Alex
                                            </Typography>
                                            <div className={"flex flex-row gap-2 items-center justify-center"}>
                                                <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black">
                                                    USA
                                                </Typography>
                                                <Divider orientation={"vertical"}/>
                                                <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black">
                                                    24 Orders
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex  items-center justify-center ">
                                        <Typography className="text-black font-bold sm:text-sm md:text-lg  lg:text-lg">3.450€</Typography>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </Card>
                {/*TopCategories: DoughnutChart*/}
                <Card className="min-h-[100px] bg-white shadow-none border border-gray-300 p-5 flex flex-col gap-4">
                    <div className="flex gap-2 items-center justify-between">
                        <div className="flex flex-row gap-2 items-center justify-start">
                            <div className={"bg-orange-200 rounded-xl p-1"}>
                                <WarningAmberIcon sx={{fill: "red" ,maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%"}}/>
                            </div>
                            <Typography className="sm:text-sm  lg:text-lg  md:text-lg  text-black font-bold">
                                Top Categories
                            </Typography>
                        </div>

                        <Button className={"bg-white shadow-none text-black underline"}>
                            View All
                        </Button>
                    </div>
                    <Divider/>

                    <div className="relative">
                        <Doughnut_Custom Data={{Data:[938,500,300], Top_Categories:["IPHONE","SAMSUNG","XIAOMI"]}}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black font-bold">
                            Category Statistics
                        </Typography>

                        <div className="w-full rounded-xl border border-gray-300 p-4 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black ">
                                    Total Number of Categories
                                </Typography>

                                <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black font-bold">1230</Typography>
                            </div>

                            <Divider/>

                            <div className="flex items-center justify-between">
                                <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black ">
                                    Total Number of Products
                                </Typography>

                                <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black font-bold">999</Typography>
                            </div>
                        </div>
                    </div>
                </Card>
                {/*Order Stats*/}
                <Card className="min-h-[100px] bg-white shadow-none border border-gray-300 p-5 flex flex-col gap-4">
                    <div className="flex gap-2 items-center justify-between">
                        <div className="flex flex-row gap-2 items-center justify-start">
                            <div className={"bg-green-200 rounded-xl p-1"}>
                                <ReceiptIcon sx={{fill: "red" ,maxWidth: "25px", maxHeight: "25px", width: "100%", height:"100%"}}/>
                            </div>
                            <Typography className="sm:text-sm  lg:text-lg  md:text-lg  text-black font-bold">
                                Order Statistics
                            </Typography>
                        </div>

                        <Button className={"bg-white shadow-none text-black"}>
                            Today
                        </Button>
                    </div>
                    {Array.from({length:5}).map((item,i)=>{
                        return (
                            <React.Fragment key={i}>
                                <Divider/>
                                <div className="flex flex-row justify-between  gap-3">
                                    <div className="w-full h-full flex flex-row gap-2 ">
                                        <img className="w-[64px] aspect-auto object-cover" src={"/Images/test_images/IPhone_16_pro_max_back.png"}/>
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black font-bold">
                                                IPhone 16 Pro max - 256GB - Black
                                            </Typography>
                                            <div className={"flex flex-row gap-2 items-center justify-center"}>
                                                <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black">
                                                    Handys
                                                </Typography>
                                                <Divider orientation={"vertical"}/>
                                                <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black font-bold">
                                                    1099€
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center justify-center ">
                                        <Typography className="rounded-lg bg-green-500 py-1 px-2  text-white sm:text-sm md:text-sm  lg:text-sm font-bold ">Completed</Typography>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </Card>
            </div>



        </div>
    )
}