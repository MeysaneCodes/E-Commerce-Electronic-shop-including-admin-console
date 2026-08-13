"use client"


//Layouts
import GetSponsoredProducts_Cards from "@/components/ui/sponsored_products_layout";
import CategoriesCard_NavList_Layout from "@/components/ui/CategryCard_NavList_Layout"
import Home_product_card_layout from "@/components/ui/home_product_card_layout"
import BrandsCard_List_Layout from "@/components/ui/brandcard_list_layout"


//Fetching
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Item_Structure} from "@/types/inventory_meta/product_meta/type";


import {useRouter} from "next/navigation";
import {CaretLeftIcon, CaretRightIcon} from "@radix-ui/react-icons";
import {useEffect, useRef, useState} from "react";
import Two_cards from "@/components/ui/two_cards_layout";
import Carousel_Banner from "@/components/ui/carousel_banner";


//Structure
///////////////////////Structure//////////////////
type AllItems_Structure = Item_Structure[];
///////////////////////Structure//////////////////





//TODO Fetch from database
const Top_deals_Category_List = [
    {image: "/Images/Werbung/Phone_Ads.jpg", title: "Händys" },
    {image: "/Images/Werbung/Laptop_Ads.png", title: "Laptops" },
    {image: "/Images/Werbung/TV_Ads.png", title: "Tvs" },
    {image: "/Images/Werbung/Gaming_Ads.jpeg", title: "Gaming" },
    {image: "/Images/Werbung/Smartwatch.png", title: "Smartwachtes" },
    {image: "/Images/Werbung/Smartwatch.png", title: "Smartwachtes" },

];


const icons_ads = [
    {image: "/icons/ads/angebot_ads_icon.png", title: "Angebote" },
    {image: "/icons/ads/super_spare_sale_ads.png", title: "Super Spar Sale" },
    {image: "/icons/ads/handy_verträge.png", title: "Handysvertäge" },
    {image: "/icons/ads/outlet_ads.png", title: "Wochenend-Knaller" },
    {image: "/icons/ads/wochenende_knaller.png", title: "Wochenend-Knaller" },
    {image: "/icons/ads/angebot_ads_icon.png", title: "myTemplate" },

];

const brands_icon = [
    {image: "/icons/brands/AMD_logo.png", title: "AMD" },
    {image: "/icons/brands/Bosch-logo.svg", title: "Bosch" },
    {image: "/icons/brands/Microsoft_logo.svg", title: "Microsoft" },
    {image: "/icons/brands/Miele_logo.png", title: "Miele" },
    {image: "/icons/brands/Apple_logo.png", title: "Apple" },
    {image: "/icons/brands/Samsung_logo.png", title: "Samsung" },
    {image: "/icons/brands/Xiaomi_logo.png", title: "Xiaomi" },
];



const bannerSlides = [
    {
        image: "/Images/test_images/carousel_banner_test_image_1920x600.png",
        eyebrow: "Top-Angebote",
        title: "Technik-Deals für dein Zuhause",
        description: "Entdecke Smartphones, Laptops, Gaming und mehr.",
        buttonText: "Jetzt entdecken",
        onClick: () => {},
    },

    {
        image: "/Images/test_images/carousel_banner_test_image_1920x600_2.png",
        eyebrow: "Top-Angebote",
        title: "Technik-Deals für dein Zuhause",
        description: "Entdecke Smartphones, Laptops, Gaming und mehr.",
        buttonText: "Jetzt entdecken",
        onClick: () => {},
    },
];


async function getAllItems ({signal}:{ signal?: AbortSignal}): Promise<AllItems_Structure | null> {

    //TODO change the link on deploying
    //TODO Generate SLUG ON ADMIN PANEL WHEN ADDING PRODUCT (IMPORTANT!!!)
    //TODO now we do fetch without Query, later maybe ?
    const item = await fetch(`api/products`, {
        method: "POST",
        credentials: "include",
        signal: signal,
        body: JSON.stringify({CName: "products", Cols_Projection: {options:1,media:1,title:1, slug:1, brand:1,variants:1}}),
    });

    if(!item.ok)
        throw new Error("Failed to fetch items.");

    const res = await item?.json();
    const data = res.item as AllItems_Structure;
    return data ?? null;
}



const ProductCarousel =
    ({title,items,prefetch}:{title:string, items:AllItems_Structure | null |undefined, prefetch: (slug:string | undefined)=>void })=>{

        const divRef = useRef<HTMLDivElement | null>(null);
        //Navigation Button condition
        const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState<boolean>(true);
        const [isRightButtonDisabled, setIsRightButtonDisabled] = useState<boolean>(false);

        const updateScrollButtons = () => {
            const el = divRef.current;
            if (!el) return;

            setIsLeftButtonDisabled(el.scrollLeft <= 0);
            setIsRightButtonDisabled(
                el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
            );
        };


        useEffect(() => {

            const  el = divRef.current;
            if (!el) return;

            updateScrollButtons();
            el.addEventListener("scroll", updateScrollButtons);
            window.addEventListener("resize", updateScrollButtons);

            return () => {
                el.removeEventListener("scroll", updateScrollButtons);
                //values change when window becomes smaller/bigger
                window.removeEventListener("resize", updateScrollButtons);
            };


        }, [items]);


        return (<div className="mt-8 sm:mt-10">
                <div className="flex justify-between items-center px-1 sm:px-0">
                    <p className="py-3 text-lg font-bold text-foreground sm:py-5 sm:text-2xl">{title}</p>
                    <div className="hidden sm:flex flex-row gap-2">
                        <button
                            disabled={isLeftButtonDisabled}
                            onClick={()=>{

                                    divRef.current?.scrollBy({
                                        left:-500,
                                        behavior: "smooth",
                                    })

                            }}
                            className={'group flex w-10 h-10  items-center justify-center rounded-xl bg-primary text-primary-foreground shadow disabled:bg-secondary disabled:text-secondary-foreground disabled:opacity-60'}
                            // onClick={() => setActiveIndex(activeIndex - 1)}
                        >
                            <CaretLeftIcon className={'h-6 w-6'}/>
                        </button>

                        <button
                            disabled={isRightButtonDisabled}
                            onClick={()=>{

                                    divRef.current?.scrollBy({
                                        left:500,
                                        behavior: "smooth",
                                    })

                            }}
                            className="group flex h-10 w-10 items-center justify-center rounded-xl
                            bg-primary text-primary-foreground shadow disabled:bg-secondary disabled:text-secondary-foreground disabled:opacity-60"
                            // onClick={() => setActiveIndex(activeIndex + 1)}
                        >
                            <CaretRightIcon className={`h-6 w-6`}   />
                        </button>
                    </div>
                </div>
            <div ref={divRef} className="relative flex w-full flex-row gap-3 overflow-x-auto overflow-y-hidden px-1 scrollbar-hide sm:px-0">
                    {items?.map((inItem,index)=>{
                        return (<Home_product_card_layout prefetch_functionAction={prefetch} key={inItem.slug}  item={inItem} isDiscounted={false} isSponsored={false} OriginalPrice={"499,- €"}/>
                        )
                    })}

                </div>
            </div>)

}

export default function Home   () {
    const QueryClient = useQueryClient();
    const {data: fetched_items} = useQuery({
        queryKey: ["product"],
        queryFn: async ({signal})=>{
            return await getAllItems({signal})
        },
        //after 10mins data becomes stale, but it will get the data from cache
        //10mins
        staleTime: 60 * 60 * 1000,
        //1h
        gcTime:60 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: true,
    })
    //TODO RECHECK FOR SIGNAL and abortion of FETCH
    //Warming data when user hover on item, for time optimisation
    const prefetch = (slug :string | undefined)=>{
        if (!slug) return;

        const state = QueryClient.getQueryState<Item_Structure>(['product', slug]);
        const isFresh =
            !!state && Date.now() - (state.dataUpdatedAt ?? 0) < 10 * 60 * 1000; // 10 min

        if (isFresh) {
            console.log("cache is still fresh")
            return; // nothing to do
        }

        //if not fresh we fetch and add it to cache
        //TODO MORE FIX, Projections ??
        QueryClient.prefetchQuery({
            queryKey: ['product', slug],
            queryFn: async ({ signal }) => {
                const res = await fetch(`/api/products/${slug}`,
                    { signal });
                if (!res.ok) throw new Error('Failed to fetch product');
                const json = await res.json();
                return (json.item as Item_Structure) ?? null;
            },
            staleTime: 60 * 60 * 1000, // 1h
            gcTime: 60 * 60 * 1000,    // 1h
        });
    }
    const router = useRouter();

    return (
        <div className="relative mx-auto w-full max-w-[1400px] overflow-x-hidden bg-background px-2 text-foreground sm:px-4 lg:px-0">            
            <Carousel_Banner slides={bannerSlides} />
            <GetSponsoredProducts_Cards/>
            <CategoriesCard_NavList_Layout sectionTitle={"Deals, Aktionen und Services"} top_deals_Category_List={icons_ads}/>
            <ProductCarousel title={"Aktuell beliebt"} items={fetched_items} prefetch={prefetch}/>
            <GetSponsoredProducts_Cards/>
            <CategoriesCard_NavList_Layout sectionTitle={"Top-Deals nach Kategorien mit kostenloser Lieferung"} top_deals_Category_List={Top_deals_Category_List}/>
            <BrandsCard_List_Layout sectionTitle={"Top Marken"} IN_Brands={brands_icon}/>
            <CategoriesCard_NavList_Layout sectionTitle={"Top-Deals nach Kategorien mit kostenloser Lieferung"} top_deals_Category_List={Top_deals_Category_List}/>
            <ProductCarousel title={"Aktuell beliebt"} items={fetched_items} prefetch={prefetch}/>
            <CategoriesCard_NavList_Layout sectionTitle={"Deals, Aktionen und Services"} top_deals_Category_List={icons_ads}/>
            <GetSponsoredProducts_Cards/>
            <Two_cards/>
            {/*Hero Section*/}
            <div className="mt-8 w-full rounded-2xl bg-primary p-5 text-primary-foreground sm:mt-10 sm:rounded-3xl sm:p-10">
                <h1 className="font-mono text-xl font-extrabold sm:text-3xl">Cool bleiben bei jeder Temperatur</h1>
                <h2 className="mt-3">Ob Kühlschrank oder Klimagerät - hier findest du alles für die perfekte Abkühlung</h2>
                <p className="mt-5 inline-flex cursor-pointer underline hover:text-primary-foreground/80" onClick={() => router.push("/")}>▶ Zu den Produkten</p>
            </div>
            <Two_cards/>

            {/*Hero Section*/}
            <div className="mt-8 mb-4  w-full rounded-2xl border border-border bg-card p-5 text-card-foreground sm:mt-10 sm:p-10">
                <h1 className="text-xl font-extrabold sm:text-3xl">Mehr als 2 Mio. Menschen lesen unseren Newsletter. Bist du dabei?</h1>
                <h2 className="mt-3">Erfahre als Erstes von den besten Angeboten, Neuheiten & Trends. Direkt in deinem Posteingang.
                </h2>
                <p className="mt-5 inline-flex cursor-pointer underline hover:text-primary" onClick={() => router.push("/")}>▶ Jetzt anmelden</p>
            </div>
        </div>

    );

}
