// src/movies/movies.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service'; // This is from the Domain Layer

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Get('popular')
    async getPopularMovies(@Query('page') page: number = 1, @Query('language') language: string = 'en-US') {
        // Basic validation if needed
        const movies = await this.moviesService.getPopularMovies(page, language);
        return movies;
    }

    //   @Get(':id')
    //   async getMovieById(@Param('id') id: string) {
    //     const movie = await this.moviesService.getMovieById(id);
    //     return { data: movie, message: 'Movie details fetched successfully' };
    //   }

    //   @Get('search')
    //   async searchMovies(@Query('query') query: string) {
    //     if (!query) {
    //       // Handle error or return empty
    //       return { data: [], message: 'Please provide a search query.' };
    //     }
    //     const movies = await this.moviesService.searchMovies(query);
    //     return { data: movies, message: 'Movies searched successfully' };
    //   }
}