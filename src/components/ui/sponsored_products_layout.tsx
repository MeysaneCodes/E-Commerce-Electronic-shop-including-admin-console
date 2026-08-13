"use client"



import Cards_Carousel from "@/lib/ui/components/Carousel";
import {Typography} from "@material-tailwind/react"
import {carousel_variables_type} from "@/types/layout_types/carousel_type";

export default function GetSponsoredProducts_Cards  () {
    return (
        //Container
        <div className="h-auto flex flex-col gap-5 mt-10 mb-24">
            <Typography className="font-bold" variant="h4">Top-Angebote und Aktionen</Typography>
            <Cards_Carousel/>
        </div>
    )
}