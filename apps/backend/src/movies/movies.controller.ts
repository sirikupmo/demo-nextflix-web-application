// src/movies/movies.controller.ts
import { Controller, Get, Param, Query, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { MoviesService } from './movies.service'; // This is from the Domain Layer
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RefreshTokenInterceptor } from '../auth/refresh-token.interceptor';

@UseGuards(JwtAuthGuard) 
@UseInterceptors(RefreshTokenInterceptor)
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Get('search')
    async searchAll(@Query('query') query: string, @Query('page') page: number = 1, @Query('language') language: string = 'th-TH', @Request() req: any) {
        if (!query) {
            return [];
        }
        console.log('User searching movies:', req.user);
        const movies = await this.moviesService.searchAll(query, page, language, req.user);
        return movies;
    }

    @Get('popular')
    async getPopularMovies(@Query('page') page: number = 1, @Query('language') language: string = 'th-TH', @Request() req: any) {
        console.log('User accessing popular movies:', req.user);
        const movies = await this.moviesService.getPopularMovies(page, language, req.user);
        return movies;
    }

    @Get('top-rated')
    async getTopRateMovies(@Query('page') page: number = 1, @Query('language') language: string = 'th-TH', @Request() req: any) {
        console.log('User accessing popular movies:', req.user);
        const movies = await this.moviesService.getTopRateMovies(page, language, req.user);
        return movies;
    }

    @Get('upcoming')
    async getUpcomingMovies(@Query('page') page: number = 1, @Query('language') language: string = 'th-TH', @Request() req: any) {
        console.log('User accessing upcoming movies:', req.user);
        const movies = await this.moviesService.getUpcomingMovies(page, language, req.user);
        return movies;
    }

    @Get('now-playing')
    async getNowPlayingMovies(@Query('page') page: number = 1, @Query('language') language: string = 'th-TH', @Request() req: any) {
        console.log('User accessing now playing movies:', req.user);
        const movies = await this.moviesService.getNowPlayingMovies(page, language, req.user);
        return movies;
    }

    @Get(':id')
    async getMovieDetails(@Param('id') id: number, @Query('language') language: string = 'th-TH', @Request() req: any) {
        console.log('User accessing movie details:', req.user);
        const movie = await this.moviesService.getMovieDetails(id, language, req.user);
        return movie;
    }
}