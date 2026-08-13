"use client"


import {Card,Typography} from "@material-tailwind/react";
import {useRouter} from "next/navigation";






type Props = {
    sectionTitle: string;
    top_deals_Category_List?: Array<{image:any;title:string}>;
}



export default function CategoriesCard_NavList_Layout({sectionTitle,top_deals_Category_List}: Props) {

    const router = useRouter();
    //Default Value
    const top_deals_Category = top_deals_Category_List ?? new Array(4).fill({
        image: <div className="w-200 h-200"></div>,
        title: ""
    });

    const title = sectionTitle ?? "";


    return (
        <div className="mt-10 mb-8 flex w-full max-w-[1400px] flex-col gap-4 sm:mt-14 sm:mb-10 sm:gap-5">

            {/*Title of this Section*/}
                <Typography  variant={"h4"} className=" font-bold  text-foreground">{title}</Typography>

            {/*List of the Items*/}

                <div className="flex flex-row gap-3 overflow-x-auto overflow-y-hidden px-1 scrollbar-hide sm:px-0">

                    {top_deals_Category.map((item,index) => {
                        return (

                            <div
                                key={index}
                                className="w-[145px] h-[160px] shrink-0 sm:w-[200px] sm:h-[200px] lg:w-[227.8px] lg:h-[227.8px]">
                                <Card
                                    className="w-full h-full bg-card text-card-foreground border-border hover:border-ring flex flex-col items-center justify-center   hover:z-20  hover:shadow-xl shadow-none  hover:border-2   transition-transform ease-linear duration-300  "
                                    onClick={() => router.push("/")}
                                >
                                    <div className="flex h-[105px] w-[105px] items-center justify-center rounded-2xl bg-white p-2 sm:h-[135px] sm:w-[135px] lg:h-[145px] lg:w-[145px]">
                                        <img
                                            src={item.image}
                                            className="max-h-full max-w-full object-contain p-2"
                                            alt={item.title}/>
                                    </div>
                                    <Typography  variant="h6" className="block  text-center font-bold p-2 ">{item.title}</Typography>
                                </Card>

                            </div>
                        )
                    })}
                </div>
        </div>
    )
}