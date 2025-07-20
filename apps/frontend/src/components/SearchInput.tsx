// apps/frontend/src/components/SearchInput.tsx 
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi'; // Import FiX for close button
import { movieServiceInstance } from '@/lib/movieServiceInstance';
import { Movie } from '@/domain/dtos/movie.dto';
import Image from 'next/image';
import MovieDetailModal from './MovieDetailModal';
/**
 * SearchInput component.
 * Displays a search icon that opens a modal popup with a search input field.
 */
export default function SearchInput() {
    const movieService = movieServiceInstance;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [loadingResults, setLoadingResults] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            inputRef.current?.focus(); // Focus input when modal opens
        } else {
            document.body.style.overflow = 'unset'; // Re-enable scrolling
            setSearchTerm(''); // Clear search term when closing
            setSearchResults([]); // Clear search results when closing
            setSearchError(null); // Clear search error
        }
        return () => {
            document.body.style.overflow = 'unset'; // Cleanup on unmount
        };
    }, [isModalOpen]);

    // Effect to close modal on Escape key press
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsModalOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm.length > 2) { // Only search if term is at least 3 characters
                setLoadingResults(true);
                setSearchError(null);
                try {
                    const results = await movieService.searchMovies(searchTerm.trim());
                    setSearchResults(results);
                } catch (err: unknown) {
                    setSearchError(err instanceof Error ? err.message : 'Failed to search movies.');
                    setSearchResults([]); // Clear results on error
                } finally {
                    setLoadingResults(false);
                }
            } else {
                setSearchResults([]); // Clear results if search term is too short
                setSearchError(null);
            }
        }, 500); // 500ms debounce delay

        return () => clearTimeout(delayDebounceFn); // Cleanup on unmount or searchTerm change
    }, [searchTerm, movieService]); // Depend on searchTerm and movieService

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Search icon button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 rounded-md
                   bg-netflix-light-border text-netflix-light-secondary hover:bg-netflix-light-secondary hover:text-white
                   dark:bg-netflix-dark-border dark:text-netflix-dark-secondary dark:hover:bg-netflix-dark-secondary dark:hover:text-white
                   transition-colors duration-200 ease-in-out"
                aria-label="Open search"
            >
                <FiSearch size={20} />
            </button>

            {/* Search Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-scale">
                    {/* Close button */}
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 z-50 text-white hover:text-netflix-red"
                        title="Close modal"
                    >
                        <FiX size={28} />
                    </button>

                    <div className="relative bg-netflix-dark-light rounded-lg overflow-hidden w-full max-w-3xl max-h-[90vh] shadow-xl flex flex-col"> {/* Added flex-col */}
                        {/* Search Input Field at the top of the modal content */}
                        <div className="p-4 sm:p-6 bg-netflix-dark shadow-md flex-shrink-0"> {/* flex-shrink-0 to prevent shrinking */}
                            <input
                                id="search-modal-input"
                                type="text"
                                placeholder="Search for movies, series..."
                                value={searchTerm}
                                onChange={handleInputChange} // Changed to handleInputChange
                                ref={inputRef}
                                className="w-full px-4 py-2 rounded-md border
                           bg-netflix-dark-input-bg text-netflix-dark-input-text
                           border-netflix-dark-border
                           focus:outline-none focus:ring-2 focus:ring-netflix-red
                           placeholder:text-netflix-dark-placeholder text-lg sm:text-xl"
                                aria-label="Search input"
                            />
                        </div>

                        {/* Search Results Area */}
                        <div className="flex-grow p-6 space-y-3 overflow-y-auto custom-scrollbar"> {/* flex-grow to take remaining space, overflow-y-auto for scrolling */}
                            {loadingResults ? (
                                <p className="text-netflix-dark-secondary text-center">Searching for...</p>
                            ) : searchError ? (
                                <p className="text-red-500 text-center">⚠️ {searchError}</p>
                            ) : searchTerm.length === 0 ? (
                                <p className="text-netflix-dark-secondary text-center">Start typing to find movies and TV shows.</p>
                            ) : searchResults.length === 0 ? (
                                <p className="text-netflix-dark-secondary text-center">No movies found for &quot;{searchTerm}&quot;</p>
                            ) : (
                                <div className="space-y-2"> {/* Container for search results list */}
                                    {searchResults.map((movie) => {
                                        const imageUrl =
                                            movie?.backdrop_path
                                                ? `https://image.tmdb.org/t/p/w92${movie?.backdrop_path}`
                                                : movie?.poster_path
                                                    ? `https://image.tmdb.org/t/p/w92${movie?.poster_path}`
                                                    : 'https://placehold.co/500x281?text=No+Image';
                                        return (
                                            <div key={movie.id} className="flex items-center p-2 rounded-md hover:bg-netflix-dark-border cursor-pointer transition-colors duration-150"
                                             onClick={() => setSelectedMovie(movie)}>
                                                <Image
                                                    src={imageUrl}
                                                    alt={movie.title}
                                                    width={92} // Adjusted size for list item (half of w92)
                                                    height={61} // Adjusted size for list item
                                                    className="rounded-sm object-cover flex-shrink-0" // flex-shrink-0 to prevent image from shrinkin
                                                />
                                                <div className="ml-4 flex-grow"> {/* ml-4 for spacing, flex-grow for title to take remaining space */}
                                                    <h3 className="text-base font-semibold text-white truncate text-wrap">{movie.title}</h3>
                                                    <p className="text-xs text-netflix-dark-secondary">{movie.release_date}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {selectedMovie && (
                <MovieDetailModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}
        </>
    );
}