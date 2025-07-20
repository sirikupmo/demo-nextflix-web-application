'use client';

import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Movie } from '@/domain/dtos/movie.dto';

interface NowPlayingCarouselProps {
    movies: Movie[];
}
function useIsLargeScreen(breakpoint = 640) {
    const [isLarge, setIsLarge] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return; // SSR guard

        const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`);
        const updateMatch = () => setIsLarge(mediaQuery.matches);

        updateMatch();
        mediaQuery.addEventListener("change", updateMatch);

        return () => mediaQuery.removeEventListener("change", updateMatch);
    }, [breakpoint]);

    return isLarge;
}
export default function NowPlayingCarousel({ movies }: NowPlayingCarouselProps) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: false,
    };
    const isLargeScreen = useIsLargeScreen(640);

    return (
        <div className="rounded-lg overflow-hidden relative inline-block max-w-[800px] w-full">
            <Slider {...settings}>
                {movies.slice(0, 5).map((movie) => {
                    const imageUrl =
                        isLargeScreen && movie.backdrop_path
                            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                            : movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : null;

                    const fallbackUrl = isLargeScreen
                        ? "https://placehold.co/400x225/CCCCCC/000000?text=No+Image"
                        : "https://placehold.co/200x300/CCCCCC/000000?text=No+Poster";
                    return (
                        <div key={movie.id} className={`relative rounded-md overflow-hidden ${isLargeScreen ? "w-[800px] h-[450px]" : "w-full aspect-[2/3]"}`}>
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={movie.original_title}
                                    fill
                                    sizes={isLargeScreen ? "800px" : "100vw"}
                                    className="object-cover rounded-md"
                                    onError={(e) => {
                                        e.currentTarget.src = fallbackUrl;
                                    }}
                                />
                            ) : (
                                <Image
                                    src={fallbackUrl}
                                    alt="No image available"
                                    fill
                                    sizes={isLargeScreen ? "800px" : "100vw"}
                                    className="object-cover rounded-md"
                                />
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end">
                                <h2 className="text-white text-4xl font-bold mb-2">{movie.title}</h2>
                                <p className="text-white text-sm max-w-xl line-clamp-3">{movie.overview}</p>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}
