'use client';

import { useEffect, useState } from 'react';
import { Movie, MovieDetails } from '@/domain/dtos/movie.dto';
import { X, Star } from 'lucide-react';
import Image from 'next/image';
import { movieServiceInstance } from '@/lib/movieServiceInstance';

interface Props {
    movie: Movie;
    onClose: () => void;
}


export default function MovieDetailModal({ movie, onClose }: Props) {
    const [detailsMovie, setDetailsMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const details = await movieServiceInstance.getMovieDetails(movie.id);
                setDetailsMovie(details);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'Failed to load movie details.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [movie.id]);

    const imageUrl =
        detailsMovie?.backdrop_path
            ? `https://image.tmdb.org/t/p/w780${detailsMovie?.backdrop_path}`
            : detailsMovie?.poster_path
                ? `https://image.tmdb.org/t/p/w500${detailsMovie?.poster_path}`
                : 'https://placehold.co/500x281?text=No+Image';

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <button
                onClick={onClose}
                className="absolute top-0 right-0 mt-2 mr-2 z-50 text-white hover:text-red-500"
                title="Close modal"
            >
                <X size={28} />
            </button>
            <div className="relative bg-zinc-900 text-white rounded-lg overflow-hidden w-full max-w-3xl max-h-[90vh] shadow-xl overflow-y-auto custom-scrollbar">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <span className="text-lg">Loading movie details...</span>
                    </div>
                ) : error ? (
                    <div className="p-6 text-red-400">
                        <p>⚠️ {error}</p>
                    </div>
                ) : (
                    <>
                        <Image
                            src={imageUrl}
                            alt={detailsMovie?.title || 'Movie Image'}
                            width={780}
                            height={440}
                            className="w-full h-auto object-cover"
                            priority
                        />

                        <div className="p-6 space-y-3">
                            <h2 className="text-2xl font-bold">{detailsMovie?.title}</h2>
                            <p className="text-sm text-gray-400">{detailsMovie?.release_date}</p>
                            <p className="text-base leading-relaxed mb-4">{detailsMovie?.overview}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                                <div>
                                    <strong className="text-white">ความยาว:</strong> {detailsMovie?.runtime} นาที
                                </div>
                                <div>
                                    <strong className="text-white">ประเภท:</strong>{' '}
                                    {detailsMovie?.genres.map((g) => g.name).join(', ')}
                                </div>
                                <div className="flex items-center gap-1">
                                    <strong className="text-white">คะแนนเฉลี่ย:</strong>
                                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                                    <span>{detailsMovie?.vote_average.toFixed(1)} ({detailsMovie?.vote_count.toLocaleString()} โหวต)</span>
                                </div>
                                <div>
                                    <strong className="text-white">ภาษาต้นฉบับ:</strong> {detailsMovie?.original_language.toUpperCase()}
                                </div>
                            </div>
                        </div>

                    </>
                )}
            </div>
        </div>
    );
}
