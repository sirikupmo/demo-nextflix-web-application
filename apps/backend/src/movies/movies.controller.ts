// src/movies/movies.controller.ts
import { Controller, Get, Param, Query, UseGuards, Request } from '@nestjs/common';
import { MoviesService } from './movies.service'; // This is from the Domain Layer
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard) 
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Get('search')
    async searchAll(@Query('query') query: string, @Query('page') page: number = 1, @Request() req: any) {
        if (!query) {
            return [];
        }
        console.log('User searching movies:', req.user);
        const movies = await this.moviesService.searchAll(query, page, req.user);
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
}