// apps/frontend/src/app/(protected)/movies/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { movieServiceInstance } from '@/lib/movieServiceInstance';
// import MovieCard from '@/components/MovieCard';
// import LogoutButton from '@/components/LogoutButton';
import NowPlayingCarousel from '@/components/NowPlayingCarousel';
import MovieRow from '@/components/MovieRow'; 
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { Movie } from '@/domain/dtos/movie.dto';

export default function MovieListPage() {

  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  const movieService = movieServiceInstance;

  useEffect(() => {
    if (isLoggedIn) {
      const fetchMovies = async () => {
        setLoading(true);
        setError(null);
        try {
          const popular = await movieService.getPopularMovies();
          const topRated = await movieService.getTopRatedMovies();
          const upcoming = await movieService.getUpcomingMovies();
          const nowPlaying = await movieService.getNowPlayingMovies();
          setPopularMovies(popular);
          setTopRatedMovies(topRated);
          setUpcomingMovies(upcoming);
          setNowPlayingMovies(nowPlaying);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Failed to load movies.');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    }
  }, [isLoggedIn, router, movieService]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center page-container pb-8">
      <NowPlayingCarousel movies={nowPlayingMovies} />
      <MovieRow title="Popular Movies" movies={popularMovies} />
      <MovieRow title="Top Rated Movies" movies={topRatedMovies} />
      <MovieRow title="Upcoming Movies" movies={upcomingMovies} />
      <MovieRow title="Now Playing Movies" movies={nowPlayingMovies} />
      
      {/* Optional: Logout button */}
    </div>
  );
}