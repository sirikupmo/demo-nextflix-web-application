'use client';

import { useEffect, useState } from "react";
import Image from 'next/image';
import { Movie } from '@/domain/dtos/movie.dto';
interface MovieCardProps {
  movie: Movie; // Updated type to Movie
  onClick?: (movie: Movie) => void;
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

export default function MovieCard({ movie, onClick }: MovieCardProps) {
    const isLargeScreen = useIsLargeScreen(640);

    const imageUrl =
        isLargeScreen && movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
            : movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : null;

    const fallbackUrl = isLargeScreen
        ? "https://placehold.co/400x225/CCCCCC/000000?text=No+Image"
        : "https://placehold.co/200x300/CCCCCC/000000?text=No+Poster";


    return (
        <div
            onClick={() => onClick?.(movie)}
            className="relative group cursor-pointer rounded-md overflow-hidden shadow-md
               transform transition-all duration-300 ease-in-out hover:scale-105
               flex-shrink-0 w-28 sm:w-32 md:w-40 lg:w-48"
        >
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt={movie.title}
                    width={isLargeScreen ? 600 : 200}
                    height={isLargeScreen ? 338 : 300}
                    className="w-full h-auto object-cover rounded-md group-hover:opacity-80 transition-opacity duration-300"
                    onError={(e) => {
                        e.currentTarget.src = fallbackUrl;
                    }}
                />
            ) : (
                <Image
                    src={fallbackUrl}
                    alt="No image available"
                    width={isLargeScreen ? 600 : 200}
                    height={isLargeScreen ? 338 : 300}
                    className="w-full h-auto object-cover rounded-md"
                />
            )}
            <div
                className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 
                 bg-gradient-to-t from-black/80 to-transparent text-white
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <h3 className="text-sm sm:text-base font-semibold truncate">
                    {movie.title}
                </h3>
                <p className="text-xs">
                    {movie.release_date}
                </p>
            </div>
        </div>
    )

}