// src/profile/profile.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileRepository } from '../data/profile.repository';
import { AuthModule } from '../auth/auth.module';

/**
 * ProfileModule encapsulates all profile-related features.
 * Registers ProfileController, ProfileService, and ProfileRepository,
 * and imports AuthModule for authentication.
 * It uses forwardRef to resolve circular dependency with AuthModule.
 */
@Module({
  imports: [
    // Use forwardRef to resolve circular dependency:
    // ProfileModule imports AuthModule, and AuthModule imports ProfileModule
    forwardRef(() => AuthModule),
  ],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    ProfileRepository, 
  ],
  exports: [ProfileService, ProfileRepository]
})
export class ProfileModule {}