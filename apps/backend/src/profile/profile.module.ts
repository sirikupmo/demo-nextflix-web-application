// src/profile/profile.module.ts
import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileRepository } from '../data/profile.repository'; // Import ProfileRepository
import { AuthModule } from '../auth/auth.module'; // Import AuthModule to use JwtAuthGuard

/**
 * ProfileModule encapsulates all profile-related features.
 * Registers ProfileController, ProfileService, and ProfileRepository,
 * and imports AuthModule for authentication.
 */
@Module({
  imports: [AuthModule], // Import AuthModule to make JwtAuthGuard available
  controllers: [ProfileController],
  providers: [
    ProfileService,
    ProfileRepository, // Add ProfileRepository to providers
  ],
})
export class ProfileModule {}