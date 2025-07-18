// src/auth/auth.module.ts
import { Module, MiddlewareConsumer, RequestMethod, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from '../data/user.repository';
import { ProfileModule } from '../profile/profile.module';
import { RefreshTokenMiddleware } from './refresh-token.middleware';
/**
 * AuthModule encapsulates all authentication features.
 * Configures JwtModule, PassportModule, registers AuthController and AuthService,
 * and provides JwtStrategy for token validation.
 */
@Module({
  imports: [
    PassportModule,
    // Configure JwtModule asynchronously to load secret from ConfigService
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule to use ConfigService
      useFactory: async () => ({
        secret: process.env.JWT_SECRET || 'dev-secret',
      }),
      inject: [ConfigService], // Inject ConfigService into the factory
    }),
    ConfigModule,
    forwardRef(() => ProfileModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserRepository],
  exports: [AuthService, JwtModule, PassportModule], // Export AuthService and JwtModule if other modules need them
})

export class AuthModule {
  // Apply RefreshTokenMiddleware to all authenticated routes
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RefreshTokenMiddleware)
      .forRoutes(
        { path: 'auth/me', method: RequestMethod.GET },
        { path: 'movies/*path', method: RequestMethod.ALL }, // Apply to all movie routes
        { path: 'profile/*path', method: RequestMethod.ALL }, // Apply to all profile routes
        // Add other protected routes here
      );
  }
}