"use client"

import {Card,Button, Typography} from "@material-tailwind/react";
import {useEffect, useRef, useState} from "react";


//ICONS
import leftArrow from "../../../assets/icons/button_icons/navigation_icon/leftArrow.svg"
import rightArrow from "../../../assets/icons/button_icons/navigation_icon/rightArrow.svg"
import {useRouter} from "next/navigation";
import {CaretLeftIcon, CaretRightIcon} from "@radix-ui/react-icons";


type Props = {
    sectionTitle: string;
    IN_Brands?: Array<{image:any;title:string}>;
}



export default function CategoriesCard_NavList_Layout({sectionTitle,IN_Brands}: Props) {
    const router = useRouter();
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const [atStart, setAtStart] = useState<boolean>(false);
    const [atEnd, setAtEnd] = useState<boolean>(false);


    //Navigation
    const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState<boolean>(true);
    const [isRightButtonDisabled, setIsRightButtonDisabled] = useState<boolean>(false);
    const [current_x_scroll_value, setCurrent_x_scroll_value] = useState<number>(0);
    const divRef = useRef<HTMLDivElement|null>(null);



    const update_scroll_value =  () => {
        setCurrent_x_scroll_value(divRef.current?.scrollLeft ?? 0);

        const el = divRef.current;
        if (!el)return;

        if(el.scrollLeft + el.clientWidth === el.scrollWidth)
            setIsRightButtonDisabled(true);
        else setIsRightButtonDisabled(false);

        if(el.scrollLeft === 0)
            setIsLeftButtonDisabled(true);
        else setIsLeftButtonDisabled(false);
    }


    useEffect(() => {

        const  el = divRef.current;



        if(!el)
            return;

        el.addEventListener("scroll", update_scroll_value)


        return () => {
            el.removeEventListener("scroll", update_scroll_value)
        }

    }, []);






    const scrollLeft = ()=>{
        scrollbarRef.current?.scrollBy({left:-200,behavior:"smooth"});
        setAtEnd(false);

        console.log(scrollbarRef.current?.scrollLeft);
    }

    const scrollRight = ()=>{
        if(!scrollbarRef.current){return}
        const maxscrollLeft = scrollbarRef.current?.scrollWidth - scrollbarRef.current?.clientWidth;
        scrollbarRef.current?.scrollBy({left:+200,behavior:"smooth"});
        setAtStart(false);
    }


    const handleScroll = () => {
        const el = scrollbarRef.current;
        if(!el) return;

        const scrollLeft = el.scrollLeft;
        const maxScrollLeft = el.scrollWidth - el.clientWidth;

        setAtStart(scrollLeft<= 0);
        setAtEnd(scrollLeft >= maxScrollLeft -1);

    }

    //Default Value
    const Brands = IN_Brands ?? new Array(10).fill({
        image: <div className="w-200 h-200"></div>,
        title: ""
    });

    const title = sectionTitle ?? "";

    return (
        <div className="w-max-[1400px] flex flex-col gap-5 mb-10 mt-14 ">

            {/*Title of this Section*/}
            <div className="w-full  flex justify-between">
                <Typography variant={"h4"} className="font-bold text-black">{title}</Typography>

                <div  id="NavigationButton" className="flex flex-row gap-2">
                    <button
                        disabled={isLeftButtonDisabled}
                        onClick={(e)=>{
                            if(divRef.current){



                                divRef.current.scrollBy({
                                    left:-500,
                                    behavior: "smooth",
                                })
                            }
                        }}
                        className={'group flex w-10 h-10  items-center justify-center rounded-xl bg-black shadow disabled:opacity-40 disabled:bg-gray-300/50'}
                        // onClick={() => setActiveIndex(activeIndex - 1)}
                    >
                        <CaretLeftIcon className={`h-6 w-6  group-data-[isButtonDisabled=true]:text-black ${isLeftButtonDisabled ? "text-black" : "text-white"}`} />
                    </button>

                    <button
                        disabled={isRightButtonDisabled}
                        onClick={(e)=>{
                            if(divRef.current){
                                divRef.current.scrollBy({
                                    left:500,
                                    behavior: "smooth",
                                })
                            }
                        }}
                        className="group flex w-10 h-10  items-center justify-center rounded-xl bg-black shadow disabled:opacity-40 disabled:bg-gray-300/50"
                        // onClick={() => setActiveIndex(activeIndex + 1)}
                    >
                        <CaretRightIcon className={`h-6 w-6  group-data-[isButtonDisabled=true]:text-black ${isRightButtonDisabled ? "text-black" : "text-white"}`}   />
                    </button>
                </div>
            </div>



            {/*List of the Items*/}
            <div>

                <div
                    ref={divRef}
                    className="direction-ltr grid grid-flow-col grid-rows-1 gap-4 overflow-y-hidden overflow-x-scroll scrollbar-hide justify-start m-4">

                    {Brands.map((item,index) => {
                        return (

                            <div  key={index} className="w-[160px] h-[170px] shrink-0 sm:w-[200px] sm:h-[200px]   lg:w-[227.8px] lg:h-[227.8px]">
                                <Card
                                    className="w-full h-full flex flex-col items-center justify-center border border-gray-300  hover:z-20  hover:shadow-xl shadow-none  hover:border-2  hover:border-gray-200  transition-transform ease-linear duration-300  "
                                    onClick={() => router.push("/")}>
                                    <img
                                        src={item.image}
                                        className="h-[150px] aspect-auto object-cover rounded-3xl"
                                        alt={item.title}/>

                                </Card>
                                <p className="block bottom-1 text-center p-2 text-black">{item.title}</p>

                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}