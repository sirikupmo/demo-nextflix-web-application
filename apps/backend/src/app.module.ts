import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { MoviesModule } from './movies/movies.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    AuthModule,
    ProfileModule,
    MoviesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
