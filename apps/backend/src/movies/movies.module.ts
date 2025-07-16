import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { FreeMovieApiRepository } from '../data/movies.repository'; // This is from the Data Layer

@Module({
    controllers: [MoviesController],
    providers: [MoviesService, FreeMovieApiRepository],
})
export class MoviesModule { }