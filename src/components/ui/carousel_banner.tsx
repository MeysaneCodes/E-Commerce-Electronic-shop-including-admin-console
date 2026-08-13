"use client"

import {useEffect, useState} from "react";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

type BannerSlide = {
    image: string;
    title: string;
    description: string;
    eyebrow?: string;
    buttonText?: string;
    onClick?: () => void;
}

type Props = {
    slides: BannerSlide[];
}

export default function Carousel_Banner({slides}: Props) {
    const [api, setApi] = useState<CarouselApi>();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideCount, setSlideCount] = useState(0);

    useEffect(() => {
        if (!api) return;

        const updateCurrentSlide = () => {
            setCurrentSlide(api.selectedScrollSnap());
            setSlideCount(api.scrollSnapList().length);
        };

        updateCurrentSlide();

        api.on("select", updateCurrentSlide);
        api.on("reInit", updateCurrentSlide);

        return () => {
            api.off("select", updateCurrentSlide);
            api.off("reInit", updateCurrentSlide);
        };
    }, [api]);

    if (!slides.length) return null;

    return (
        <section className="mt-4 sm:mt-6">
            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    loop: slides.length > 1,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {slides.map((slide) => (
                        <CarouselItem key={slide.title}>
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-card text-card-foreground sm:aspect-[16/6] lg:aspect-[16/5]">
                                <img
                                src={slide.image}
                                    alt={slide.title}
                                    className="h-full w-full object-cover"
                            />

                                {/*in case we want gradiant in our banner*/}
                                {/*<div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-background/10" />*/}
                                <div className="absolute inset-0 z-10 flex max-w-2xl flex-col justify-center p-5 sm:p-8 lg:p-12">
                                    {slide.eyebrow && (
                                        <p className="mb-3 w-fit rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-white sm:text-sm">
                                            {slide.eyebrow}
                                        </p>
                                    )}

                                    <h1 className="text-2xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                                        {slide.title}
                                    </h1>

                                    <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base lg:text-lg">
                                        {slide.description}
                                    </p>

                                    {slide.buttonText && (
                                        <button
                                            type="button"
                                            onClick={slide.onClick}
                                            className="mt-6 w-fit rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-brand-700 sm:text-base"
                                        >
                                            {slide.buttonText}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="left-3 hidden border-border bg-card/90 text-card-foreground hover:bg-accent sm:flex" />
                <CarouselNext className="right-3 hidden border-border bg-card/90 text-card-foreground hover:bg-accent sm:flex" />
            </Carousel>

            {slideCount > 1 && (
                <div className="mt-3 flex justify-center gap-2">
                    {Array.from({length: slideCount}).map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            aria-label={`Banner ${index + 1} anzeigen`}
                            onClick={() => api?.scrollTo(index)}
                            className={`h-2.5 rounded-full transition-all ${
                                currentSlide === index
                                    ? "w-8 bg-primary"
                                    : "w-2.5 bg-muted-foreground/40"
                            }`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}