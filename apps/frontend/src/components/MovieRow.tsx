import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard'; // ปรับ path ให้ตรงกับโปรเจกต์ของคุณ
import { Movie } from '@/domain/dtos/movie.dto';

interface MovieRowProps {
    title: string;
    movies: Movie[];
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [loopedMovies, setLoopedMovies] = useState([...movies]);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -1000, behavior: 'smooth' });
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            if (scrollLeft + clientWidth >= scrollWidth - 1000) {
                setLoopedMovies((prev) => [...prev, ...movies]);
            }

            scrollRef.current.scrollBy({ left: 1000, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-8 md:mt-12 lg:mt-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold">{title}</h2>
            </div>

            <div className="relative group">
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 inset-y-0 z-10
               w-14 bg-black/70 text-white hover:bg-black
               flex items-center justify-center opacity-0
               group-hover:opacity-100 transition-opacity duration-300"
                    aria-label="Scroll Left"
                >
                    <ChevronLeft size={36} />
                </button>

                <button
                    onClick={scrollRight}
                    className="absolute right-0 inset-y-0 z-10
               w-14 bg-black/70 text-white hover:bg-black
               flex items-center justify-center opacity-0
               group-hover:opacity-100 transition-opacity duration-300"
                    aria-label="Scroll Right"
                >
                    <ChevronRight size={36} />
                </button>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto snap-x snap-mandatory
                space-x-4 sm:space-x-6 lg:space-x-8
                scrollbar-hide custom-scrollbar scroll-smooth"
                >
                    {loopedMovies.map((movie, index) => (
                        <MovieCard key={`${movie.id}-${index}`} movie={movie} />
                    ))}
                </div>
            </div>

        </div>
    );

};

export default MovieRow;
