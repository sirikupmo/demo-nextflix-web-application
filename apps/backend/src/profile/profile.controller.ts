// src/profile/profile.controller.ts
import { Controller, Get, Param, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import JwtAuthGuard
import { RefreshTokenInterceptor } from '../auth/refresh-token.interceptor';
/**
 * Controller for profile-related API endpoints.
 * Only GET routes are available and are protected by JWT authentication.
 */
@UseGuards(JwtAuthGuard) // Protect all routes in this controller
@UseInterceptors(RefreshTokenInterceptor)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Get all profiles for the authenticated user.
   * @param req - The request object containing user information from JWT.
   * @returns An array of profiles.
   */
  @Get()
  async getProfiles(@Request() req: any) {
    const userId = req.user.userId;
    const profiles = await this.profileService.getProfiles(userId);
    return { data: profiles, message: 'Profiles fetched successfully' };
  }

  /**
   * Get a specific profile by ID for the authenticated user.
   * @param profileId - The ID of the profile.
   * @param req - The request object containing user information from JWT.
   * @returns The profile object.
   */
  @Get(':id')
  async getProfileById(@Param('id') profileId: string, @Request() req: any) {
    const userId = req.user.userId;
    const profile = await this.profileService.getProfileById(profileId, userId);
    return { data: profile, message: 'Profile fetched successfully' };
  }
}