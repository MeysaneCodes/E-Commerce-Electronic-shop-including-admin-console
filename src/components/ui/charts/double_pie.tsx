import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import React, {useState} from "react";
import {Typography} from "@material-tailwind/react";

//TODO Customize for dynamic use
export default function DoublePie() {

    const [hoveredRing, setHoveredRing] = React.useState<
        'inner' | 'outer' | null
    >(null);

    const [MousePos, setMousePos] = useState<{x:number, y:number} | null >(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const distance = Math.sqrt(
            Math.pow(x - cx, 2) + Math.pow(y - cy, 2)
        );

        // 🔧 tune these values to your gauge sizes
        if (distance >= 40 && distance <= 60) {
            console.log("hoveredRing", hoveredRing);
            setHoveredRing('inner');
        } else if (distance >= 70 && distance <= 90) {
            setHoveredRing('outer');
            console.log("hoveredRing", hoveredRing);
        } else {
            setHoveredRing(null);
        }
    };


    const handleMouse = (e: React.MouseEvent) => {
        setMousePos({x: e.clientX, y: e.clientY});

        console.log("mouse", MousePos);
    }

    const settings1 = {
        width: 150,
        height: 150,
        value:30,
    };

    const settings2 = {
        width: 150,
        height: 150,
        value:40,
    };

    return(
        <div

            className="relative ">
            <Gauge
                text={""}
                outerRadius="40%"
                innerRadius="60%"
                {...settings1}
                cornerRadius="50%"
                sx={(theme) => ({
                    valueText: "",
                    [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 40,
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                        fill: "green",
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                        fill: "#FCF8F5",
                    },
                })}
            />

            <Gauge
                text={""}
                onMouseMove={(e)=>handleMouse(e)}
                onMouseLeave={()=>setMousePos(null)}
                outerRadius="70%"
                innerRadius="90%"
                {...settings2}
                cornerRadius="50%"
                sx={(theme) => ({
                    position: 'absolute',
                    top: 0,
                    [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 40,
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                        fill: 'red',
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                        fill: "#FCF8F5",
                    },
                })}
            />

            <div className={`${MousePos == null ? "hidden" : "fixed"} flex flex-col gap-2  p-2 border border-gray-200 rounded-l`} style={{
            backgroundColor: "white",
            top: (MousePos?.y ?? 0) + 12,
            left: (MousePos?.x ?? 0) + 12,
        }}>
                <div className="flex flex-row gap-4 items-center justify-start">
                    <span className={"rounded-xl w-[15px] h-[15px] bg-green-500"}/>
                    <Typography className="font-bold sm:text-sm  lg:text-sm  md:text-sm  text-green-500">First Time</Typography>
                    <Typography className="font-bold sm:text-sm  lg:text-sm  md:text-sm  text-green-500">30%</Typography>
                </div>

                <div className="flex flex-row gap-4 items-center justify-start ">
                    <span className={"rounded-xl w-[15px] h-[15px] bg-red-500"}/>
                    <Typography className="font-bold sm:text-sm  lg:text-sm  md:text-sm  text-red-500">Return</Typography>
                    <Typography className="font-bold sm:text-sm  lg:text-sm  md:text-sm  text-red-500">40%</Typography>
                </div>
        </div>
        </div>
    )
}