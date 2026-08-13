"use client"

import { Card, Typography, Button } from "@material-tailwind/react"

const card_images = [
    {image: "/Images/Werbung/cards_image/gift_card_ads.png", title: "Angebote" },
    {image: "/icons/ads/super_spare_sale_ads.png", title: "Super Spar Sale" },
];

export default function Two_cards(){
    return(
        <div className="mt-10 flex w-full max-w-[1400px] flex-col gap-3 sm:mt-14 lg:flex-row">
           <div className="flex h-[220px] w-full lg:h-[250px] lg:w-1/2">
               <Card className="relative flex h-full w-full overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-lg">
                   <div className="w-full h-full bg-background">
                        <img className="w-full h-full object-cover" src={card_images[0].image}/>
                   </div>

                   <div className="absolute left-4 top-1/2 max-w-[80%] -translate-y-1/2 text-brand-800 sm:left-6">
                       <Typography variant={"h4"}>
                           Guthabenkarten &
                       </Typography>

                       <Typography variant={"h4"}>
                           Gift Cards
                       </Typography>
                       <Typography variant={"small"}>
                           Jetzt Streaming-, Shopping-, Freizeit-
                       </Typography>
                       <Typography variant={"small"}>
                           und Gaming-Guthabenjarten sichern
                       </Typography>

                       <Button className="mt-5 bg-primary text-primary-foreground hover:bg-brand-700">Jetzt Entdecken</Button>
                   </div>
               </Card>
           </div>
            <div className="flex h-[220px] w-full lg:h-[250px] lg:w-1/2">
                <Card className="relative flex h-full w-full overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-lg">
                    <div className="w-full h-full">
                        <img className="w-full h-full object-cover" src={card_images[0].image}/>
                    </div>

                    <div className="absolute left-4 top-1/2 max-w-[80%] -translate-y-1/2 text-brand-800 sm:left-6">
                        <Typography variant={"h4"}>
                            Guthabenkarten &
                        </Typography>

                        <Typography variant={"h4"}>
                            Gift Cards
                        </Typography>
                        <Typography variant={"small"}>
                            Jetzt Streaming-, Shopping-, Freizeit-
                        </Typography>
                        <Typography variant={"small"}>
                            und Gaming-Guthabenjarten sichern
                        </Typography>

                        <Button className="mt-5 bg-primary text-primary-foreground hover:bg-brand-700">Jetzt Entdecken</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}