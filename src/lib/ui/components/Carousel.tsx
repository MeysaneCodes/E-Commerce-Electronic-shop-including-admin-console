import {Button, Typography} from "@material-tailwind/react";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import {CaretLeftIcon, CaretRightIcon} from "@radix-ui/react-icons";
import {useState} from "react";





export default function Cards_Carousel() {
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const images = ["/Images/Werbung/products/iphone17_ads.png","/Images/Werbung/products/ps5_ads.png","/Images/Werbung/products/airpods_xmax_ads.png"]



    const slides = [0, 1];


    return (
        <div className="relative w-full">
            <div className={"overflow-hidden"}>
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                    {slides.map((slideIndex) => (
                        <div
                            key={slideIndex}
                            className="flex w-full shrink-0 items-center justify-center gap-5"
                        >
                            {Array.from({ length: 3 }).map((_, i) => (
                                <Card
                                    key={i}
                                    className="z-0 w-[min(90vw,453px)] shrink-0 overflow-hidden border border-border bg-card text-card-foreground transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.02] hover:shadow-lg"
                                    variant="outlined"
                                    sx={{
                                        bgcolor: "hsl(var(--card))",
                                        color: "hsl(var(--card-foreground))",
                                    }}
                                >
                                    <CardOverflow>
                                        <AspectRatio ratio="1" objectFit="cover">
                                            <img
                                                className="h-full w-full object-cover"
                                                src={images[i % images.length]}
                                                loading="lazy"
                                                alt="Promo product"
                                            />
                                        </AspectRatio>
                                    </CardOverflow>

                                    <CardContent
                                        sx={{
                                            bgcolor: "hsl(var(--card))",
                                            color: "hsl(var(--card-foreground))",
                                        }}
                                    >
                                        <div className="font-bold">
                                            <Typography variant="h6" className="font-bold">
                                                Nur bis 02.14
                                            </Typography>
                                            <Typography variant="h4" className="font-bold">
                                                Freude für Fest
                                            </Typography>
                                            <Typography className="mt-5" variant="paragraph">
                                                Schnapp dir unsere Fast Christmas-Deals und profitiere von schnellen Angeboten zu genialen Preisen
                                            </Typography>
                                        </div>
                                    </CardContent>

                                    <CardOverflow
                                        variant="soft"
                                        sx={{
                                            bgcolor: "hsl(var(--card))",
                                            color: "hsl(var(--card-foreground))",
                                        }}
                                    >
                                        <CardContent className="flex justify-end" orientation="horizontal">
                                            <Button className="flex items-center justify-center border border-border bg-secondary text-secondary-foreground hover:bg-accent">
                                                <CaretRightIcon width={25} height={25} />
                                                Zu den Deals
                                            </Button>
                                        </CardContent>
                                    </CardOverflow>
                                </Card>
                            ))}
                        </div>
                    ))}
                </div>
            </div>


            <div className="mt-4 grid grid-cols-3 items-center">
                <div/>
                <div className="flex justify-center gap-2">
                    {slides.map((_, i) => (
                        <span
                            key={i}
                            onClick={() => setActiveSlide(i)}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                                activeSlide === i ? "w-8 bg-primary" : "w-4 bg-muted"
                            }`}
                        />
                    ))}
                </div>

                <div className="hidden justify-end gap-2 sm:flex">
                    <button
                        disabled={activeSlide === 0}
                        onClick={() => setActiveSlide((prev) => Math.max(prev - 1, 0))}
                        className="group flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow disabled:bg-secondary disabled:text-secondary-foreground disabled:opacity-60"
                    >
                        <CaretLeftIcon className="h-6 w-6" />
                    </button>

                    <button
                        disabled={activeSlide === slides.length - 1}
                        onClick={() => setActiveSlide((prev) => Math.min(prev + 1, slides.length - 1))}
                        className="group flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow disabled:bg-secondary disabled:text-secondary-foreground disabled:opacity-60"
                    >
                        <CaretRightIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}
