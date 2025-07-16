import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieApiRepository } from '../data/movies.repository'; // This is from the Data Layer
import { HttpModule } from '@nestjs/axios';
@Module({
    imports: [HttpModule],
    controllers: [MoviesController],
    providers: [MoviesService, MovieApiRepository],
})
export class MoviesModule { }