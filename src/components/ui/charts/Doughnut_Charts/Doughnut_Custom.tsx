import {Doughnut} from "react-chartjs-2";
import {Typography} from "@material-tailwind/react";
import * as React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend,ChartOptions} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);


//Default Params
//Colors
const CHART_COLORS = ['#CC291F','#0F0F0F', 'rgba(75, 192, 192, 0.2)']

type DoughnutCustomProps = {
    Data: {
        Data: number[];
        Top_Categories: string[];
    };
};


export  default function Doughnut_Custom({Data}:DoughnutCustomProps){



    const DoughnutData = {
        labels: Data.Top_Categories,
        datasets:[
            {
            data: Data.Data,
            backgroundColor: CHART_COLORS
        },
        ],
    };

    const options: ChartOptions<"doughnut"> = {
        responsive:true,
        layout: {
            padding:25
        },
        elements:{
            arc: {
                borderRadius: 15,
                hoverOffset: 15,
            }
        },

        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    title: (items) => {
                        return `Category: ${items[0]?.label ?? ""}`;
                    },
                    label: (context) => {
                        return `Sales: ${context.raw}`;
                    },
                },
            },
        },

        //onHover: (_, elements)=>{
          //  if(elements.length)
            //    console.log('hover', elements[0].index);
        //}
    }

    return (
        <div className=" relative p-5 w-full h-full  grid grid-cols-2">
            <Doughnut
                className=""
                style={
                    {
                        width: "100%",
                        height: "100%",
                        maxWidth: "250px",
                        maxHeight: "250px",
                    }
                }  data={DoughnutData} options={options}/>


            <div className="w-full h-full flex justify-end items-end ">
                <div className="h-full flex flex-col gap-2 justify-center ">

                    {Data.Top_Categories.map((category,index)=>{
                        return(
                            <div key={index}>
                                <div className="flex flex-row gap-2 items-center">
                                    <span style={{
                                        backgroundColor: CHART_COLORS[index] ?? "#999"
                                    }} className="inline-block w-[10px] h-[5px] rounded-xl"/>
                                    <Typography>{category}</Typography>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Typography className="sm:text-xl  lg:text-xl  md:text-xl  text-black font-bold">
                                        {Data.Data[index]}
                                    </Typography>
                                    <Typography className="sm:text-sm  lg:text-sm  md:text-sm  text-black">
                                        Sales
                                    </Typography>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}