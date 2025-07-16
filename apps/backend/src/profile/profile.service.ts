// src/profile/profile.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile, ProfileRepository } from '../data/profile.repository';

/**
 * Service responsible for profile-related business logic.
 * Only read operations are supported.
 */
@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  /**
   * Retrieves all profiles for a given user.
   * @param userId - The ID of the authenticated user.
   * @returns An array of profiles.
   */
  async getProfiles(userId: string): Promise<Profile[]> {
    return this.profileRepository.findAllByUserId(userId);
  }

  /**
   * Retrieves a specific profile by its ID for a given user.
   * @param profileId - The ID of the profile to retrieve.
   * @param userId - The ID of the authenticated user.
   * @returns The profile object.
   * @throws NotFoundException if the profile does not exist or does not belong to the user.
   */
  async getProfileById(profileId: string, userId: string): Promise<Profile> {
    const profile = await this.profileRepository.findById(profileId, userId);
    if (!profile) {
      throw new NotFoundException(`Profile with ID "${profileId}" not found or does not belong to user.`);
    }
    return profile;
  }
}